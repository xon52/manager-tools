<template>
	<Toolbar style="border-radius: 0; border: 0; padding: 0 0.75rem">
		<template #start>
			<span class="text-md">Dev Tools</span>
		</template>
		<template #end>
			<Button
				@click="resync"
				title="Refresh the extension"
				text
				severity="secondary"
				icon="pi pi-sync" />
			<Button
				@click="sleepTabs"
				title="Put all other tabs to sleep"
				text
				severity="secondary"
				icon="pi pi-pause-circle" />
			<Button
				@click="trash"
				title="Clear the sync data"
				text
				severity="secondary"
				icon="pi pi-trash" />
		</template>
	</Toolbar>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores';

const store = useSettingsStore();

const resync = () => {
	try {
		chrome.runtime.reload();
	} catch (error) {
		console.error('Error refreshing extension:', error);
	}
};
const trash = () => {
	try {
		store.resetSyncData();
	} catch (error) {
		console.error('Error resetting sync data:', error);
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
