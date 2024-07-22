<template>
	<div class="app">
		<h1>Chrome Summarizer</h1>
		<Suspense>
			<Summarizer />
		</Suspense>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Summarizer from '@/components/Summarizer.vue';

export default defineComponent({
	name: 'App',
	components: {
		Summarizer,
	},
});
</script>

<style scoped>
.app {
	width: 300px;
	padding: 16px;
}
</style>
