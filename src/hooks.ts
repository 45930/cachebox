import type { GetSession } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { handleSession } from "svelte-kit-cookie-session";
import type { BinaryLike } from "svelte-kit-cookie-session/dist/esm/types";


console.log(import.meta.env.VITE_SESSION_KEY);
const _handleSession = handleSession(
  {
    secret: import.meta.env.VITE_SESSION_KEY as BinaryLike,
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
