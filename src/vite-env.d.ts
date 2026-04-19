/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_REVIEWS_WIDGET_SRC?: string;
  readonly VITE_REVIEWS_WIDGET_SRI?: string;
  readonly VITE_WHATSAPP_PHONE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
