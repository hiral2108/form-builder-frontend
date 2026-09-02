import type { Directive, DirectiveBinding } from "vue";

interface ClickOutsideElement extends HTMLElement {
  __clickOutsideHandler__?: (event: MouseEvent) => void;
}

export const clickOutside: Directive = {
  mounted(el: ClickOutsideElement, binding: DirectiveBinding) {
    el.__clickOutsideHandler__ = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value?.(event);
      }
    };
    document.addEventListener("click", el.__clickOutsideHandler__, true);
  },
  unmounted(el: ClickOutsideElement) {
    if (el.__clickOutsideHandler__) {
      document.removeEventListener("click", el.__clickOutsideHandler__, true);
      delete el.__clickOutsideHandler__;
    }
  },
};
