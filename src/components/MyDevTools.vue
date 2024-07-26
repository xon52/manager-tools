<template>
	<Toolbar style="border-radius: 0; border: 0; padding: 0 10px">
		<template #start>
			<span class="text-md">Dev Tools</span>
		</template>
		<template #end>
			<Button
				@click="refresh"
				text
				icon="pi pi-replay" />
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
const refresh = () => {
	chrome.runtime.reload();
};
</script>
