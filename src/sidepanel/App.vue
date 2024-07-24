<template>
	<div>
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStore } from './store';
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
	const store = useStore();
	store.initializeStore();
});
</script>
