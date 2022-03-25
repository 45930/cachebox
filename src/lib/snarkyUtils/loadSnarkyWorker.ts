import { loadSnarky } from '$lib/stores/minaStore';

onmessage = function () {
  loadSnarky();
}

export default {};
