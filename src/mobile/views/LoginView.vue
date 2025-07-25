<template>
    <div class="login-page">
        <div class="login-container">
            <div class="logo">
                <i class="fa fa-table-tennis"></i>
                <h1>羽毛球馆预约</h1>
            </div>

            <form class="login-form">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text"
                           id="username"
                           v-model="username"
                           placeholder="请输入用户名">
                </div>

                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password"
                           id="password"
                           v-model="password"
                           placeholder="请输入密码">
                </div>

                <button type="button"
                        class="login-btn"
                        @click="handleLogin">
                    登录
                </button>

                <div class="form-footer">
                    <a href="#" class="forgot-password">忘记密码？</a>
                    <a href="#" class="register">注册账号</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const handleLogin = () => {
      // 简单验证
      if (!username.value || !password.value) {
        alert('请输入用户名和密码');
        return;
      }

      // 模拟登录成功
      // 实际项目中这里应该调用后端API验证
      localStorage.setItem('token', 'mock-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify({
        username: username.value,
        role: username.value === 'admin' ? 'admin' : 'user'
      }));

      // 登录成功后跳转
      router.push('/');
    };

    return {
      username,
      password,
      handleLogin
    };
  }
};
</script>

<style scoped>
    .login-page {
        background-color: #f5f5f5;
        min-height: 100vh;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-container {
        width: 100%;
        max-width: 400px;
        background-color: white;
        border-radius: 12px;
        padding: 30px 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    .logo {
        text-align: center;
        margin-bottom: 30px;
    }

        .logo i {
            font-size: 48px;
            color: #42b983;
            margin-bottom: 15px;
        }

        .logo h1 {
            font-size: 24px;
            color: #333;
        }

    .login-form {
        margin-top: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #666;
        }

        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
        }

    .login-btn {
        width: 100%;
        padding: 14px;
        background-color: #42b983;
        color: white;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        margin-top: 10px;
    }

    .form-footer {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        font-size: 14px;
    }

        .form-footer a {
            color: #42b983;
        }
</style>
