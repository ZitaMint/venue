import { createRouter, createWebHashHistory } from 'vue-router';

// 页面组件
import HomeView from '../views/HomeView.vue';
import BookingView from '../views/BookingView.vue';
import ProfileView from '../views/ProfileView.vue';
import LoginView from '../views/LoginView.vue';
import CourtDetailView from '../views/CourtDetailView.vue';

// 路由配置
const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/booking', name: 'Booking', component: BookingView, meta: { requiresAuth: true } },
    { path: '/profile', name: 'Profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/court-detail/:id', name: 'CourtDetail', component: CourtDetailView },
    { path: '/:pathMatch(.*)*', redirect: '/' } // 404路由
];

// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }; // 页面切换时滚动到顶部
    }
});

// 路由守卫 - 验证登录状态
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('token');

    // 需要登录的页面
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
