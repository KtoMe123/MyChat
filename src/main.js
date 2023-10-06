import { createApp } from 'vue'
import './reset.css'
import components from "./components/UI";
import App from './App.vue'
import directives from './directives';
import router from './router/router.js'
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)


const app = createApp(App);

app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)

components.forEach(component => {

    app.component(component.name, component);
});

directives.forEach(directive => {
    app.directive(directive.name, directive)
});


app.mount('#app')
