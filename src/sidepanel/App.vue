<template>
	<div class="wrapper">
		<MyToolbar />
		<ScrollPanel style="flex: 1">
			<RouterView />
		</ScrollPanel>
		<MyDevTools v-if="devTools" />
		<MyFooter />
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStore } from './store';
import { onBeforeMount } from 'vue';
import MyToolbar from '@/components/MyToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyDevTools from '@/components/MyDevTools.vue';

const devTools = import.meta.env.MODE === 'development';

onBeforeMount(() => {
	const store = useStore();
	store.initializeStore();
});
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
}
</style>
