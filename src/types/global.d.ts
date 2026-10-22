export {}

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface ApiError<T> extends AxiosError {
    data: T
    status?: number
    statusText?: string
    statusCode?: number
    statusMessage?: string
  }

  interface Window {
    shopify?: unknown
  }

  interface Window {
    $crisp?: any[]
  }

  interface Window {
    shopify?: unknown
    CRISP_READY_TRIGGER?: () => void
    $crisp?: any[]
  }

}
