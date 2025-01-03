import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import Confetti from "./components/Confetti.vue";

export default {
    extends: DefaultTheme,
    enhanceApp({app, router}) {
        app.component("Confetti", Confetti); //注册全局组件
    },
    // ...DefaultTheme, //或者这样写也可
}