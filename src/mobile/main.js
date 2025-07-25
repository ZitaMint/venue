import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// ����Ӧ��ʵ��
const app = createApp(App);

// ʹ��·��
app.use(router);

// ȫ��ע�Ṥ�ߺ���
app.config.globalProperties.$formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' });
};

// ����Ӧ��
app.mount('#app');
