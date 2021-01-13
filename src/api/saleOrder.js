import request from '../utils/request';

// 销售订单列表查询
export function saleOrderList(data) { 
    return request({
        url: "/getSaleOrder",
        method: "post",
        data:data
    })
}

// 新增销售定单
export function addNewOrder(data) {
    return request({
        url: "/addSaleOrder",
        method: "post",
        data: data
    })
}

// 转定
export function transferOrder(data) {
    return request({
        url: "/transferSale",
        method: "post",
        data: data
    })
}

// 删除销售定单 单个删除
export function deleteSingleOrder(id) {
    return request({
        url: "/deleteSaleOrder",
        method: "post",
        data: id
    })
}

// 批量删除销售定单
export function deleteAllSaleOrder(ids) {
    return request({
        url: "/deleteAllSaleOrder",
        method: "post",
        data: ids
    })
}


// 查询询价单是否匹配  (新增的时候如果输入了询价单号，就调用接口)
export function findOrder(data) {
    return request({
        url: "/findQuotedPrice",
        method: "post",
        data: data
    })
}
//======================================================================= 
// 销售单列表
export function getSaleList(data) { 
    return request({
        url: "/getSale",
        method: "post",
        data: data
    })
}
// 新增销售单
export function addNewSale(data) {
    return request({
        url: "/addSale",
        method: "post",
        data: data
    })
}
// 删除销售单 单个删除
export function deleteSale(id) {
    return request({
        url: "/deleteSale",
        method: "post",
        data: id
    })
}

// 批量删除销售单
export function removeAllSale(ids) {
    return request({
        url: "/deleteAllSale",
        method: "post",
        data: ids
    })
}


/* ========================================================== */

// 导出销售定单报表
export function exportOrderReport(roleId=3) {
    return request({
        url: `/dowSaleOrderExcel?roleId=${roleId}`,
        method: "get"
    })
}

// 导出销售单报表
export function exportSaleReport(roleId=3) {
    return request({
        url: `/dowSaleExcel?roleId=${roleId}`,
        method: "post"
    })
}


// 查询所有产品列表
export function productList() {
    return request({
        url: "/getProductAll",
        method: "post",
        data: {}
    })
}