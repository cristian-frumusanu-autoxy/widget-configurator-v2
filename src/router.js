import { createWebHistory, createRouter } from 'vue-router'

import WidgetConfiguratorApp from './WidgetConfiguratorApp.vue'
import WidgetApp from './WidgetApp.vue'
import ModalApp from './ModalApp.vue';

const basePath = import.meta.env.DEV ? '/' : '/widget-v2';

const routes = [
    { path: basePath, component: WidgetConfiguratorApp },
    { path: '/widget-demo', component: WidgetApp },
    { path: '/modal-demo', component: ModalApp },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
