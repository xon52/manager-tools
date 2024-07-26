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
			<Button
				@click="sleepTabs"
				text
				icon="pi pi-pause-circle" />
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
const refresh = () => {
	try {
		chrome.runtime.reload();
	} catch (error) {
		console.error('Error refreshing extension:', error);
	}
};
const sleepTabs = async () => {
	try {
		const tabs = await chrome.tabs.query({ active: false });
		tabs.forEach((tab) => {
			if (tab.id) {
				chrome.tabs.discard(tab.id);
			}
		});
	} catch (error) {
		console.error('Error putting tabs to sleep:', error);
	}
};
</script>
