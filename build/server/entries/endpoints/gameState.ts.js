const EMPTY_SESSION = {
  user: "null_user",
  step: null,
  other: ""
};
const get = ({ locals }) => {
  if (!locals.session?.data?.user) {
    locals.session.data = EMPTY_SESSION;
  }
  return { body: { ...locals.session.data } };
};
const post = async function(params) {
  const newGameState = await params.request.json();
  params.locals.session.data = newGameState;
  return { body: { ...params.locals.session.data } };
};
const put = async function({ locals, request }) {
  const current = locals.session.data;
  const update = await request.json();
  locals.session.data = Object.assign(current, update);
  return { body: { ...locals.session.data } };
};
const del = ({ locals }) => {
  locals.session.destroy();
  return { body: { ...locals.session.data } };
};
export { del, get, post, put };
