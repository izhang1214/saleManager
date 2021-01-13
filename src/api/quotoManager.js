import request from '../utils/request';

// 报价管理查询
export function quotoManagerSearch(searchData) {
    return request({
        url: "/getQuotedPrice",
        method: 'post',
        data: searchData
    })
}

// 删除单条询价单
export function deleteQuotoOrder(id) {
    return request({
        url: "/deleteQuotedPrice",
        method: 'post',
        data: id
    })
}

// 全部删除询价单
export function deleteAllOrder(ids) {
    console.log(ids);
    return request({
        url: "/deleteAllQuotedPrice",
        method: "post",
        data:ids
    })
}

// 新增报价
export function addQuoted(addData) { 
    return request({
        url: "/addQuotedPrice",
        method: "post",
        data: addData
    })
}

// 立即报价
export function quickQuoto(data) { 
    return request({
        url: "/updateQuotedPrice",
        method: "post",
        data: data
    })
}
