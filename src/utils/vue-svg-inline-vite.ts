import type { App } from 'vue'

interface SvgCache {
  [key: string]: string
}

const svgCache: SvgCache = {}

/**
 * Loads the SVG content from a given source URL, with caching and data URI support.
 * @param src The URL or data URI of the SVG file.
 * @returns A promise that resolves to the SVG content as a string.
 */
async function loadSvgContent(src: string): Promise<string> {
  // Handle data URIs first - decode and return the SVG content
  if (src.startsWith('data:image/svg+xml')) {
    try {
      const base64Match = src.match(/data:image\/svg\+xml;base64,(.+)/)
      if (base64Match && base64Match[1]) {
        return atob(base64Match[1])
      }

      const urlEncodedMatch = src.match(/data:image\/svg\+xml,(.+)/)
      if (urlEncodedMatch && urlEncodedMatch[1]) {
        return decodeURIComponent(urlEncodedMatch[1])
      }

      const utf8Match = src.match(/data:image\/svg+xml;utf8,(.+)/)
      if (utf8Match && utf8Match[1]) {
        return decodeURIComponent(utf8Match[1])
      }
    } catch (error) {
      console.error('[vue-svg-inline] Failed to decode data URI:', src, error)
      return ''
    }
  }

  // Check cache for regular files
  if (svgCache[src]) {
    return svgCache[src]
  }

  try {
    let svgContent = ''

    // Handle @/ alias, relative paths, and external URLs
    const resolvedPath = src.startsWith('@/') ? src.replace('@/', '/src/') : src

    // Attempt dynamic import for local files (preferred for Vite)
    if (resolvedPath.startsWith('/src/')) {
      try {
        const module = await import(/* @vite-ignore */ `${resolvedPath}?raw`)
        svgContent = module.default
      } catch (importError) {
        console.warn('[vue-svg-inline] Dynamic import failed, falling back to fetch for:', resolvedPath, importError)
        const response = await fetch(resolvedPath)
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        svgContent = await response.text()
      }
    } else {
      // Fallback to fetch for external URLs or paths not handled by import
      const response = await fetch(resolvedPath)
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      svgContent = await response.text()
    }

    // Basic SVG validation
    if (!svgContent || !svgContent.includes('<svg')) {
      console.error('[vue-svg-inline] Content does not appear to be valid SVG for:', src)
      return ''
    }

    // Cache the result (don't cache data URIs)
    if (!src.startsWith('data:')) {
      svgCache[src] = svgContent
    }

    return svgContent
  } catch (error) {
    console.error(`[vue-svg-inline] Unexpected error loading SVG from ${src}:`, error)
    return ''
  }
}

/**
 * Gathers and returns all attributes from an element, excluding the src and directive attributes.
 * @param element The HTMLElement to process.
 * @returns An object containing the preserved attributes.
 */
function processAttributes(element: HTMLElement): { [key: string]: string } {
  const attributes = element.getAttributeNames()
  const preservedAttrs: { [key: string]: string } = {}

  // FIX: Changed the logic to preserve all attributes, including data-v- attributes.
  attributes.forEach(attr => {
    if (attr !== 'src' && !attr.startsWith('v-svg-inline')) {
      const value = element.getAttribute(attr)
      if (value !== null) {
        preservedAttrs[attr] = value
      }
    }
  })

  return preservedAttrs
}

/**
 * Creates a new SVG element from SVG content and applies attributes.
 * @param svgContent The SVG content as a string.
 * @param preservedAttrs The attributes to apply to the new SVG.
 * @returns The new SVG Element or null if an error occurred.
 */
function createSvgElement(svgContent: string, preservedAttrs: { [key: string]: string }): Element | null {
  try {
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
    const svgElement = svgDoc.querySelector('svg')

    if (!svgElement) {
      console.warn('[vue-svg-inline] No SVG element found in content')
      return null
    }

    const scopeAttrs: { [key: string]: string } = {}
    const standardAttrs: { [key: string]: string } = {}

    Object.entries(preservedAttrs).forEach(([attr, value]) => {
      if (attr.startsWith('data-v-')) {
        scopeAttrs[attr] = value
      } else {
        standardAttrs[attr] = value
      }
    })

    // Apply standard attributes to the root SVG element
    Object.entries(standardAttrs).forEach(([attr, value]) => {
      if (attr === 'class') {
        const existingClasses = svgElement.getAttribute('class') || ''
        const newClasses = existingClasses ? `${existingClasses} ${value}` : value
        if (newClasses) svgElement.setAttribute('class', newClasses)
      } else if (attr === 'style') {
        const existingStyle = svgElement.getAttribute('style') || ''
        const newStyle = existingStyle ? `${existingStyle}; ${value}` : value
        if (newStyle) svgElement.setAttribute('style', newStyle)
      } else if (value) {
        svgElement.setAttribute(attr, value)
      }
    })

    // Apply scoped attributes to all elements within the SVG, including the root
    const allElements = svgElement.querySelectorAll('*')
    Object.entries(scopeAttrs).forEach(([attr, value]) => {
      svgElement.setAttribute(attr, value)
      allElements.forEach(child => {
        child.setAttribute(attr, value)
      })
    })

    return svgElement
  } catch (error) {
    console.error('[vue-svg-inline] Error creating SVG element:', error)
    return null
  }
}

/**
 * Processes a single element, loading and inlining the SVG.
 * @param el The HTMLElement to process.
 */
async function processElement(el: HTMLElement) {
  const src = el.getAttribute('src')
  if (!src) return

  if (!el.parentNode || el.tagName !== 'IMG' || el.getAttribute('data-svg-processing')) {
    // console.warn('[vue-svg-inline] Element invalid or already processed, skipping:', src)
    return
  }

  el.setAttribute('data-svg-processing', 'true')
  const preservedAttrs = processAttributes(el)

  try {
    const svgContent = await loadSvgContent(src)
    if (!svgContent) return

    const svgElement = createSvgElement(svgContent, preservedAttrs)
    if (!svgElement) return

    if (el.parentNode) {
      el.parentNode.replaceChild(svgElement, el)
    }
  } catch (error) {
    console.error('[vue-svg-inline] Error processing SVG:', src, error)
  } finally {
    el.removeAttribute?.('data-svg-processing')
  }
}

const vSvgInline = {
  mounted(el: HTMLElement) {
    processElement(el)
  },

  updated(el: HTMLElement) {
    el.getAttribute('src')
    if (el.tagName === 'IMG' && !el.getAttribute('data-svg-processing')) {
      processElement(el)
    }
  },

  beforeUnmount(el: HTMLElement) {
    el.removeAttribute?.('data-svg-processing')
  }
}

export default {
  install(app: App, options: any = {}) {
    app.directive('svg-inline', vSvgInline)
    if (app.config.globalProperties) {
      app.config.globalProperties.$svgInlineOptions = {
        cache: { persistent: false },
        ...options
      }
    }
  }
}

export { vSvgInline }
