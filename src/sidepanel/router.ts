import { createMemoryHistory, createRouter } from 'vue-router';

import SetupView from './pages/Setup.vue';
import ChatView from './pages/Chat.vue';
import SettingsView from './pages/Settings.vue';

const routes = [
	{ path: '/', component: SetupView, meta: { title: 'Setup' } },
	{ path: '/chat', component: ChatView, meta: { title: 'Chat' } },
	{ path: '/settings', component: SettingsView, meta: { title: 'Settings' } },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
