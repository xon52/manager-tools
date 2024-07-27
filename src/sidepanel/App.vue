<template>
	<div class="flex flex-col h-screen overflow-hidden">
		<MyToolbar />
		<ScrollPanel class="flex-1">
			<RouterView />
		</ScrollPanel>
		<MyDevTools v-if="devTools" />
		<MyFooter />
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStore } from '@/store';
import { onBeforeMount } from 'vue';
import MyToolbar from '@/components/MyToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyDevTools from '@/components/MyDevTools.vue';

const devTools = import.meta.env.MODE === 'development';

onBeforeMount(async () => {
	const store = useStore();
	await store.initializeStore();
});
</script>
