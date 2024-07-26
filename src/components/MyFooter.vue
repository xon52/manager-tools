<template>
	<Toolbar style="border-radius: 0; border: 0; padding: 0 10px">
		<template #start>
			<span class="text-md">&copy;{{ year }}</span>
		</template>
		<template #end>
			<Button
				as="a"
				href="https://github.com/xon52/manager-tools"
				target="_blank"
				rel="noopener"
				severity="secondary"
				text
				icon="pi pi-github"
				aria-label="Github" />
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
