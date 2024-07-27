<template>
	<Toolbar style="border-radius: 0; border: 0; padding: 0 0.75rem">
		<template #start>
			<h2>{{ title }}</h2>
		</template>
		<template #end>
			<Button
				v-for="{ title, to, icon } in items"
				:title="title"
				:aria-label="title"
				:to="to"
				:icon="icon"
				:severity="active === to ? 'primary' : 'secondary'"
				as="router-link"
				text />
			<MyLikeButton />
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import MyLikeButton from './MyLikeButton.vue';

const title = ref('');
const active = ref('');
const route = useRoute();

const items = [
	{ title: 'Summary', to: '/', icon: 'pi pi-list' },
	{ title: 'Settings', to: '/settings', icon: 'pi pi-cog' },
];

watch(route, (to, from) => {
	title.value = `${to.meta.title}`;
	active.value = to.path;
});
</script>
