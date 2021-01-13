import request from '../utils/request';


// 出入库
export function entryOrOut(data) {
    return request({
        url: "/inOutPutWarehouse",
        method: 'post',
        data:data
    })
}

// 详情
export function getDetail(data) {
    return request({
        url: "/getInOutPutWarehouse",
        method: 'post',
        data: data
    })
}