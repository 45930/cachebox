import type { RequestHandler } from "@sveltejs/kit";

const EMPTY_SESSION: GameSession = {
  user: 'null_user',
  other: ''
}

// return current state of the game
export const get: RequestHandler = ({ locals }) => {
  if (!locals.session?.data?.user) {
    locals.session.data = EMPTY_SESSION;
  }
  return { body: { ...locals.session.data } };
};

// set the state to incoming object
export const post: RequestHandler = async function (params) {
  const newGameState: GameSession = await params.request.json();
  params.locals.session.data = newGameState;

  return { body: { ...params.locals.session.data } };
};

// update the state with incoming key-value
export const put: RequestHandler = async function ({ locals, request }) {
  const current = locals.session.data;
  const update = await request.json();

  locals.session.data = Object.assign(current, update);

  return { body: { ...locals.session.data } };
};

export const del: RequestHandler = ({ locals }) => {
  // Destroy the session and cookie
  locals.session.destroy();

  return { body: { ...locals.session.data } };
};
