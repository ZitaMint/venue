<template>
    <div class="court-detail">
        <!-- 顶部图片 -->
        <div class="detail-header">
            <img :src="court.image" alt="场地图片" class="detail-img">
            <button class="back-btn" @click="$router.go(-1)">
                <i class="fa fa-arrow-left"></i>
            </button>
        </div>

        <!-- 场地信息 -->
        <div class="court-info">
            <h1>{{ court.name }}</h1>
            <div class="info-row">
                <span class="price">?{{ court.price }}/小时</span>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <span>4.8 (120条评价)</span>
                </div>
            </div>
            <p class="description">{{ court.description }}</p>

            <div class="tag-container">
                <span class="tag" v-for="tag in court.tags" :key="tag">{{ tag }}</span>
            </div>
        </div>

        <!-- 时段选择 -->
        <div class="time-selection">
            <h2>选择预约时段</h2>

            <div class="time-slots">
                <div class="time-slot"
                     v-for="slot in timeSlots"
                     :key="slot.id"
                     :class="{
            available: slot.available,
            selected: selectedSlot === slot.id,
            unavailable: !slot.available
          }"
                     @click="selectTimeSlot(slot.id)">
                    <div class="time">{{ slot.time }}</div>
                    <div class="status" v-if="!slot.available">已预约</div>
                </div>
            </div>
        </div>

        <!-- 预约按钮 -->
        <div class="booking-footer">
            <button class="confirm-btn"
                    @click="confirmBooking"
                    :disabled="!selectedSlot">
                确认预约 - ?{{ selectedSlot ? court.price : 0 }}
            </button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const courtId = route.params.id;

    // 状态管理
    const court = ref({});
    const timeSlots = ref([]);
    const selectedSlot = ref(null);

    // 初始化数据
    onMounted(() => {
      // 模拟获取场地详情
      const mockCourts = [
        {
          id: 1,
          name: '羽毛球场A区',
          image: 'https://picsum.photos/seed/court1/800/400',
          price: 60,
          description: '标准双打场地，专业地胶，灯光充足，配备休息区和独立储物柜，适合专业训练和比赛使用。',
          tags: ['双打', '专业地胶', '空调', '休息区']
        },
        {
          id: 2,
          name: '羽毛球场B区',
          image: 'https://picsum.photos/seed/court2/800/400',
          price: 50,
          description: '标准单打场地，适合初学者，配备基础训练设备，教练可预约指导。',
          tags: ['单打', '训练', '教练']
        },
        {
          id: 3,
          name: 'VIP羽毛球场',
          image: 'https://picsum.photos/seed/court3/800/400',
          price: 80,
          description: '豪华VIP场地，独立休息区，提供饮品服务，适合商务接待和高端休闲。',
          tags: ['双打', 'VIP', '独立休息区', '饮品']
        }
      ];

      // 找到当前场地
      court.value = mockCourts.find(c => c.id === parseInt(courtId)) || mockCourts[0];

      // 生成时段数据
      const slots = [];
      const startHours = [9, 10, 11, 14, 15, 16, 17, 18, 19, 20];

      startHours.forEach((hour, index) => {
        slots.push({
          id: index + 1,
          time: `${hour}:00-${hour + 1}:00`,
          available: Math.random() > 0.3 // 70% 概率可预约
        });
      });

      timeSlots.value = slots;
    });

    // 方法
    const selectTimeSlot = (slotId) => {
      const slot = timeSlots.value.find(s => s.id === slotId);
      if (slot.available) {
        selectedSlot.value = slotId;
      }
    };

    const confirmBooking = () => {
      if (!selectedSlot.value) return;

      // 检查登录状态
      if (!localStorage.getItem('token')) {
        router.push('/login');
        return;
      }

      // 获取选中的时段
      const slot = timeSlots.value.find(s => s.id === selectedSlot.value);

      // 模拟预约成功
      alert(`预约成功！\n场地：${court.value.name}\n时段：${slot.time}\n价格：?${court.value.price}`);

      // 跳转到我的预约
      router.push('/booking');
    };

    return {
      court,
      timeSlots,
      selectedSlot,
      selectTimeSlot,
      confirmBooking
    };
  }
};
</script>

<style scoped>
    .detail-header {
        position: relative;
    }

    .detail-img {
        width: 100%;
        height: 220px;
        object-fit: cover;
    }

    .back-btn {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .court-info {
        padding: 15px;
        background-color: #fff;
        margin-bottom: 15px;
    }

        .court-info h1 {
            font-size: 20px;
            margin-bottom: 10px;
        }

    .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .price {
        color: #ff4d4f;
        font-size: 18px;
        font-weight: bold;
    }

    .rating {
        color: #faad14;
        font-size: 14px;
    }

    .description {
        font-size: 14px;
        color: #666;
        line-height: 1.5;
        margin-bottom: 15px;
    }

    .tag-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tag {
        font-size: 12px;
        padding: 3px 8px;
        background-color: #f0f9f0;
        color: #42b983;
        border-radius: 4px;
    }

    .time-selection {
        padding: 15px;
        background-color: #fff;
        margin-bottom: 15px;
    }

        .time-selection h2 {
            font-size: 18px;
            margin-bottom: 15px;
        }

    .time-slots {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .time-slot {
        width: calc(33.333% - 7px);
        padding: 12px 0;
        text-align: center;
        border-radius: 8px;
        border: 1px solid #eee;
        font-size: 14px;
    }

        .time-slot.available {
            border-color: #42b983;
            color: #42b983;
            cursor: pointer;
        }

        .time-slot.selected {
            background-color: #42b983;
            color: white;
        }

        .time-slot.unavailable {
            color: #999;
            background-color: #f5f5f5;
        }

    .status {
        font-size: 12px;
        margin-top: 3px;
    }

    .booking-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px;
        background-color: white;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    }

    .confirm-btn {
        width: 100%;
        padding: 15px;
        background-color: #42b983;
        color: white;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
    }

        .confirm-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
</style>
