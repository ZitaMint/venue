import { createRouter, createWebHashHistory } from 'vue-router';

// ҳ�����
import HomeView from '../views/HomeView.vue';
import BookingView from '../views/BookingView.vue';
import ProfileView from '../views/ProfileView.vue';
import LoginView from '../views/LoginView.vue';
import CourtDetailView from '../views/CourtDetailView.vue';

// ·������
const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/booking', name: 'Booking', component: BookingView, meta: { requiresAuth: true } },
    { path: '/profile', name: 'Profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/court-detail/:id', name: 'CourtDetail', component: CourtDetailView },
    { path: '/:pathMatch(.*)*', redirect: '/' } // 404·��
];

// ����·��ʵ��
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }; // ҳ���л�ʱ����������
    }
});

// ·������ - ��֤��¼״̬
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('token');

    // ��Ҫ��¼��ҳ��
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
