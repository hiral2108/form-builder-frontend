import { ref } from "vue";
import { useUserStore } from "@/stores/user.ts";

interface ShopifyConfig {
  apiKey: string;
  shop: string;
}

export const useAppBridge = () => {
  const isInitializing = ref(false);

  const initializeAppBridge = async (): Promise<boolean> => {
    if (isInitializing.value) return false;
    if (window.shopify) {
      console.log("App-bridge already loaded");
      return true;
    }

    try {
      isInitializing.value = true;

      const config = getShopifyConfig();
      if (!config) return false;

      setupMetaTags(config);
      const scriptLoaded = await loadAppBridgeScript();

      console.log(scriptLoaded ? "App-bridge loaded successfully" : "Failed to load app-bridge");
      return scriptLoaded;
    } catch (error) {
      console.error("Error initializing app-bridge:", error);
      return false;
    } finally {
      isInitializing.value = false;
    }
  };

  const getShopifyConfig = (): ShopifyConfig | null => {
    // 1. Silently exit if we are on Wix
    const platform = sessionStorage.getItem("platform");
    const isWix =
      platform === "wix" ||
      window.location.pathname.includes("/wix/") ||
      new URLSearchParams(window.location.search).has("instance");

    if (isWix) {
      return null; // Exit silently, Shopify App Bridge is not needed
    }

    // 2. Try to retrieve the shop URL (from session, store, or URL query parameters)
    let shop = sessionStorage.getItem("shop_url");

    if (!shop) {
      shop = useUserStore().shop_url;
    }

    if (!shop) {
      const params = new URLSearchParams(window.location.search);
      shop = params.get("shop");
    }

    // 3. If NO shop is found, we are in standalone mode (Wix or Email login on go.whatschat.in)
    // Exit silently instead of throwing errors in the console.
    if (!shop) {
      return null;
    }

    // 4. If we DO have a shop, verify we also have the API key
    const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY;

    if (!apiKey) {
      console.error("VITE_SHOPIFY_API_KEY not found in environment variables");
      return null;
    }

    sessionStorage.setItem("shop_url", shop);
    return { apiKey, shop };
  };
  const setupMetaTags = (config: ShopifyConfig): void => {
    const metaTags = [
      { name: "shopify-api-key", content: config.apiKey },
      { name: "shopify-shop", content: config.shop },
    ];

    // Remove existing Shopify meta tags
    document.querySelectorAll('meta[name^="shopify-"]').forEach((tag) => tag.remove());

    // Add new meta tags at the beginning of head
    metaTags.forEach((meta, index) => {
      const metaTag = document.createElement("meta");
      metaTag.name = meta.name;
      metaTag.content = meta.content;

      if (index === 0 && document.head.firstChild) {
        document.head.insertBefore(metaTag, document.head.firstChild);
      } else {
        document.head.appendChild(metaTag);
      }
    });
  };

  const loadAppBridgeScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://cdn.shopify.com/shopifycloud/app-bridge.js?v=1.0.0";
      script.async = false; // Critical: App Bridge rejects async scripts

      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Failed to load app-bridge script from CDN");
        resolve(false);
      };

      // Insert script after meta tags
      insertScriptInHead(script);
    });
  };

  const insertScriptInHead = (script: HTMLScriptElement): void => {
    const refNode = document.head.children.item(1);

    if (refNode) {
      document.head.insertBefore(script, refNode);
    } else {
      document.head.appendChild(script);
    }
  };

  return {
    initializeAppBridge,
    isInitializing,
  };
};
