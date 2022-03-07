import type { GetSession } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { handleSession } from "svelte-kit-cookie-session";


const _handleSession = handleSession(
  {
    secret: "A_VERY_SECRET_SECRET_32_CHARS_LONG",
  }
)

const handleRequest = async function ({ event, resolve }) {
  const response = await resolve(event, {
    ssr: false
  });
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  return response;
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = sequence(
  _handleSession,
  handleRequest
);

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: GetSession = function ({ locals }) {
  return locals.session.data;
};
