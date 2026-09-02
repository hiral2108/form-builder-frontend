import { createApp } from '@shopify/app-bridge';

export function getAppBridge(forceRedirect: boolean = false) {
    const params = new URLSearchParams(window.location.search);
    const host = params.get('host');

    if (!host) {
        throw new Error('Shopify host parameter is missing');
    }

    return createApp({
        apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
        host,
        forceRedirect,
    });
}
