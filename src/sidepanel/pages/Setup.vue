<template>
	<div>
		<h1>Setup</h1>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(() => {
	if (store.getAiModel === '') router.push('/settings');
	else router.push('/chat');
});
</script>
