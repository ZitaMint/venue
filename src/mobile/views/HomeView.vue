<template>
    <div class="home">
        <!-- 顶部搜索栏 -->
        <div class="search-bar">
            <input type="text"
                   placeholder="搜索场地或日期"
                   v-model="searchKeyword"
                   @input="handleSearch">
            <i class="fa fa-search"></i>
        </div>

        <!-- 日期选择器 -->
        <div class="date-picker">
            <div class="date-item"
                 v-for="(date, index) in availableDates"
                 :key="index"
                 :class="{ active: selectedDate === date.date }"
                 @click="selectDate(date.date)">
                <div class="weekday">{{ date.weekday }}</div>
                <div class="date">{{ date.date }}</div>
            </div>
        </div>

        <!-- 场地列表 -->
        <div class="court-list">
            <h2>可用场地</h2>

            <div class="court-card" v-for="court in filteredCourts" :key="court.id">
                <img :src="court.image" alt="场地图片" class="court-img">
                <div class="court-info">
                    <div class="court-header">
                        <h3>{{ court.name }}</h3>
                        <span class="price">?{{ court.price }}/小时</span>
                    </div>
                    <p class="description">{{ court.description }}</p>
                    <div class="tag-container">
                        <span class="tag" v-for="tag in court.tags" :key="tag">{{ tag }}</span>
                    </div>
                    <button class="book-btn"
                            @click="$router.push(`/court-detail/${court.id}`)">
                        查看详情
                    </button>
                </div>
            </div>

            <!-- 空状态 -->
            <div class="empty-state" v-if="filteredCourts.length === 0">
                <i class="fa fa-search"></i>
                <p>未找到匹配的场地</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    // 状态管理
    const searchKeyword = ref('');
    const selectedDate = ref('');
    const availableDates = ref([]);
    const courts = ref([]);

    // 初始化数据
    onMounted(() => {
      // 生成未来7天日期
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push({
          date: date.toISOString().split('T')[0],
          weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
        });
      }
      availableDates.value = dates;
      selectedDate.value = dates[0].date;

      // 模拟场地数据
      courts.value = [
        {
          id: 1,
          name: '羽毛球场A区',
          image: 'https://picsum.photos/seed/court1/400/200',
          price: 60,
          description: '标准双打场地，专业地胶，灯光充足',
          tags: ['双打', '专业地胶', '空调'],
          available: true
        },
        {
          id: 2,
          name: '羽毛球场B区',
          image: 'https://picsum.photos/seed/court2/400/200',
          price: 50,
          description: '标准单打场地，适合初学者',
          tags: ['单打', '训练'],
          available: true
        },
        {
          id: 3,
          name: 'VIP羽毛球场',
          image: 'https://picsum.photos/seed/court3/400/200',
          price: 80,
          description: '豪华VIP场地，独立休息区',
          tags: ['双打', 'VIP', '独立休息区'],
          available: false
        }
      ];
    });

    // 筛选场地
    const filteredCourts = computed(() => {
      return courts.value.filter(court => {
        const matchesSearch = court.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
                             court.description.toLowerCase().includes(searchKeyword.value.toLowerCase());
        return matchesSearch && court.available;
      });
    });

    // 方法
    const selectDate = (date) => {
      selectedDate.value = date;
      // 实际项目中这里应该重新请求该日期的场地数据
    };

    const handleSearch = () => {
      // 搜索逻辑
    };

    return {
      searchKeyword,
      selectedDate,
      availableDates,
      courts,
      filteredCourts,
      selectDate,
      handleSearch
    };
  }
};
</script>

<style scoped>
    .search-bar {
        position: relative;
        padding: 12px 15px;
        background-color: #fff;
    }

        .search-bar input {
            width: 100%;
            padding: 10px 15px 10px 40px;
            border-radius: 20px;
            border: 1px solid #eee;
            font-size: 14px;
        }

        .search-bar i {
            position: absolute;
            left: 30px;
            top: 22px;
            color: #999;
        }

    .date-picker {
        display: flex;
        overflow-x: auto;
        padding: 10px 15px;
        background-color: #fff;
        gap: 10px;
    }

    .date-item {
        min-width: 60px;
        text-align: center;
        padding: 10px 5px;
        border-radius: 8px;
        background-color: #f5f5f5;
    }

        .date-item.active {
            background-color: #42b983;
            color: white;
        }

    .weekday {
        font-size: 14px;
    }

    .date {
        font-size: 16px;
        font-weight: bold;
        margin-top: 5px;
    }

    .court-list {
        padding: 15px;
    }

        .court-list h2 {
            font-size: 18px;
            margin-bottom: 15px;
        }

    .court-card {
        background-color: #fff;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 15px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .court-img {
        width: 100%;
        height: 160px;
        object-fit: cover;
    }

    .court-info {
        padding: 15px;
    }

    .court-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

        .court-header h3 {
            font-size: 16px;
        }

    .price {
        color: #ff4d4f;
        font-weight: bold;
    }

    .description {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        line-height: 1.4;
    }

    .tag-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 15px;
    }

    .tag {
        font-size: 12px;
        padding: 3px 8px;
        background-color: #f0f9f0;
        color: #42b983;
        border-radius: 4px;
    }

    .book-btn {
        width: 100%;
        padding: 12px;
        background-color: #42b983;
        color: white;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
    }

    .empty-state {
        text-align: center;
        padding: 50px 0;
        color: #999;
    }

        .empty-state i {
            font-size: 40px;
            margin-bottom: 15px;
        }
</style>
