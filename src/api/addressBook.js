import request from '../utils/request';

// 查询
export function searchAddress(data) {
    return request({
        url: "/getAddressBook",
        method: 'post',
        data: data
    })
}

// 新增 
export function insertAddress(data) {
    return request({
        url: "/insertAddressBook",
        method: 'post',
        data: data
    })
}