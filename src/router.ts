import { createMemoryHistory, createRouter } from 'vue-router';

import SummaryView from '@/pages/Summary.vue';
import SettingsView from '@/pages/Settings.vue';

const routes = [
	{ path: '/', alias: '/summary', component: SummaryView, meta: { title: 'Summary' } },
	{ path: '/settings', component: SettingsView, meta: { title: 'Settings' } },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
