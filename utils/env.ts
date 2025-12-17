/**
 * Environment variables with type safety
 * Vite automatically loads .env files and exposes variables prefixed with VITE_
 */

interface ImportMetaEnv {
  readonly VITE_API_KEY?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Type-safe environment variable access
 */
export const env = {
  apiKey: import.meta.env.VITE_API_KEY,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

/**
 * Validate required environment variables
 */
export function validateEnv() {
  const required: (keyof ImportMetaEnv)[] = [
    // Add required env vars here
    // 'VITE_API_KEY',
  ];

  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }
}
