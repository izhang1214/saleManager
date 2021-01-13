import request from '../utils/request';

export function custRelationList(data) {
    return request({
        url: "/getCustomerManage",
        method: 'post',
        data:data
    })
}


// 客户关系新增insertCustomerManage
export function addCustomerManage(data) {
    // 返回一个promise对象
    return request({
        url: "/insertCustomerManage",
        method: 'post',
        data:data
    })
}


// 费用报销申请 insertCostSubmit
export function addCostSubmit(data) {
    // 返回一个promise对象
    return request({
        url: "/insertCostSubmit",
        method: 'post',
        data: data
    })
}

// 费用报销查询 getCostSubmit
export function getCostList(data) {
    // 返回一个promise对象
    return request({
        url: "/getCostSubmit",
        method: 'post',
        data: data
    })
}