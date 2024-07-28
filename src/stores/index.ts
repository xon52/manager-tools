import { useSettingsStore } from './settingsStore';
import { useChatStore } from './chatStore';

const initializeStores = async () => {
	await Promise.all([useSettingsStore().initialize(), useChatStore().initialize()]);
};

export { useSettingsStore, useChatStore, initializeStores };
