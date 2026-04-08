/**
 * Supabase Edge Functions run on Deno; the Vite TS project does not load Deno globals.
 * This file gives the IDE a minimal global `Deno` and maps specifiers resolved only at deploy/runtime.
 */
declare const Deno: {
  env: { get(key: string): string | undefined }
  serve(handler: (req: Request) => Response | Promise<Response>): void
}

declare module 'jsr:@supabase/functions-js/edge-runtime.d.ts' {}

declare module 'npm:@supabase/supabase-js@2' {
  export * from '@supabase/supabase-js'
}
