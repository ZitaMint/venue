import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 创建应用实例
const app = createApp(App);

// 使用路由
app.use(router);

// 全局注册工具函数
app.config.globalProperties.$formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' });
};

// 挂载应用
app.mount('#app');
