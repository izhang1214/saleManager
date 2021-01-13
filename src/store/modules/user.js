import { getUserInfo, saveUserInfo, removeUserInfo } from '../../utils/auth';
import { login, getUserMessage } from '../../api/login';
import router from '../../router/index';
const user = {
    state: {
        user: getUserInfo() //从缓存中获取用户信息
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            saveUserInfo(user);//存入缓存
        },
    },
    actions: {
        //登录
        Login({ commit }, state) {
            const { username, password } = state;
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    commit('SET_USER', res.data.data);
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },


        // 退出登录
        Logout({ commit }) {
            router.push('/login');
            commit('SET_USER', null);
        }
    }
}

export default user;