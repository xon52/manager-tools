<template>
	<div class="flex flex-col h-screen overflow-hidden">
		<MyToolbar />
		<div class="flex-1 h-full overflow-auto">
			<RouterView />
		</div>
		<MyDevTools v-if="devTools" />
		<MyFooter />
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { initializeStores } from '@/stores';
import { onBeforeMount } from 'vue';
import MyToolbar from '@/components/MyToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyDevTools from '@/components/MyDevTools.vue';

const devTools = import.meta.env.MODE === 'development';

onBeforeMount(async () => {
	await initializeStores();
});
</script>
