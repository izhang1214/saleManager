import request from '../utils/request';

// 
export function getProductList(searchData) {
    return request({
        url: "/getProduct",
        method: 'post',
        data: searchData
    })
}

export function getSupplierList(searchData) {
    return request({
        url: "/getSupplier",
        method: 'post',
        data: searchData
    })
}