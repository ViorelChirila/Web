import { createApp } from "vue";
import mitt from "mitt";
import App from "./App.vue";

// Custom CSS
import "./assets/main.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Plugins
import { registerPlugins } from "@/plugins";

const emitter = mitt();
const vuetify = createVuetify({
  components,
  directives,
});

// Register plugins

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;
registerPlugins(app);

createApp(App).use(vuetify).mount("#app");
