<script context="module">
	export const load = async function ({ url, params, fetch, session, context }) {
		return {
			props: {
				snappAddress: params.puzzle_id
			}
		};
	};
</script>

<script lang="ts">
	import type { DeployedSnappInterface } from 'src/global';

	export let snappAddress;

	const snappConfigs: DeployedSnappInterface[] = $snappConfigsStore;
	const snappConfig = snappConfigs.find((sc) => sc.address == snappAddress);
</script>

<div>
	{snappConfig.title}
</div>
<div>
	Snapp deployed at: {snappAddress}
</div>
