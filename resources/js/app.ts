import './bootstrap.ts'
import '../css/app.css'

import {createApp, h} from 'vue'
import {createInertiaApp, Head, Link} from '@inertiajs/vue3'
import {createPinia} from 'pinia'
import Layout from './Layout/Layout.vue'

createInertiaApp({
    title: (title) => `Task App ${title}`,
    resolve: name => {
        const pages = import.meta.glob<{ default: any }>('./Pages/**/*.vue', {eager: true})
        const page = pages[`./Pages/${name}.vue`]
        page.default.layout = page.default.layout || Layout
        return page
    },
    setup({el, App, props, plugin}) {
        const pinia = createPinia()

        createApp({render: () => h(App, props)})
            .use(pinia)
            .use(plugin)
            .component('Head', Head)
            .component('Link', Link)
            .mount(el)
    },
})
