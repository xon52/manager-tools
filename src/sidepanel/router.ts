import { createMemoryHistory, createRouter } from 'vue-router';

import SetupView from './pages/Setup.vue';
import ChatView from './pages/Chat.vue';
import OptionsView from './pages/Options.vue';

const routes = [
	{ path: '/', component: SetupView },
	{ path: '/chat', component: ChatView },
	{ path: '/options', component: OptionsView },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
