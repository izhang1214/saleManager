// 路由全选校验
import router from './router/index';
// 导入用户信息查询接口
import { getUserMessage } from './api/login';
import store from './store/index';

// router.beforeEach((to, from, next) => {
//     console.log(to, from);
//     next()
// })