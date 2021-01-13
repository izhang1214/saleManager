// 封装用户信息的缓存
const User_Info = 'user-info';

// 获取用户信息
export function getUserInfo() { 
    return JSON.parse(localStorage.getItem(User_Info));
}

// 保存用户信息
export function saveUserInfo(user) {
    return localStorage.setItem(User_Info, JSON.stringify(user))
}

// 移除用户信息
export function removeUserInfo(user) {
    localStorage.removeItem(User_Info)
}