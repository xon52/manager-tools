<template>
	<Toolbar style="border-radius: 0; border: 0; padding: 0 10px">
		<template #start>
			<h2>{{ title }}</h2>
		</template>
		<template #end>
			<Button
				as="router-link"
				to="/chat"
				icon="pi pi-comment"
				text
				aria-label="Chat" />
			<Button
				as="router-link"
				to="/settings"
				icon="pi pi-cog"
				text
				aria-label="Settings" />
			<Button
				as="router-link"
				to="/account"
				icon="pi pi-user"
				text
				aria-label="Account" />
			<MyLikeButton />
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import MyLikeButton from './MyLikeButton.vue';

const title = ref('');
const route = useRoute();

watch(route, (to, from) => {
	title.value = `${to.meta.title}`;
});
</script>
