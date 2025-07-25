<template>
    <div>
        <!-- 页面内容区域 -->
        <router-view />

        <!-- 底部导航 -->
        <nav class="bottom-nav" v-if="showNav">
            <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
                <i class="fa fa-home"></i>
                <span>首页</span>
            </router-link>
            <router-link to="/booking" class="nav-item" :class="{ active: $route.path === '/booking' }">
                <i class="fa fa-calendar"></i>
                <span>我的预约</span>
            </router-link>
            <router-link to="/profile" class="nav-item" :class="{ active: $route.path === '/profile' }">
                <i class="fa fa-user"></i>
                <span>我的</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const showNav = ref(true);

    // 某些页面（如登录页）隐藏底部导航
    watch(() => route.path, (newPath) => {
      showNav.value = !['/login', '/court-detail'].includes(newPath);
    });

    return { showNav };
  }
};
</script>

<style scoped>
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        padding: 8px 0;
        z-index: 100;
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: #666;
        width: 33.333%;
    }

        .nav-item i {
            font-size: 20px;
            margin-bottom: 4px;
        }

        .nav-item.active {
            color: #42b983; /* 主题色 */
        }
</style>
