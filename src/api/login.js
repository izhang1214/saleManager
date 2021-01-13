import request from '../utils/request';

// 登录接口
export function login(account, pwd) {
    // 返回一个promise对象
    return request({
        url: "/login",
        method: 'post',
        data: {
            account: account,
            pwd: pwd
        }
    })
}

// 获取用户信息
export function getUserMessage(data) { 
    // 传分页参数
    return request({
        url: "/getUserInfo",
        method: 'post',
        data:data
    })
}
