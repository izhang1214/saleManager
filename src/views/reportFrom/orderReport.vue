<template>
    <div class="sale-Order">
        <div class="quoto-search">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="销售订单号：">
                    <el-input placeholder="请输入" v-model='searchData.saleOrderId'></el-input>
                </el-form-item>
                <el-form-item label="提交时间：">
                    <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="quoto-showData">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    align="center"
                    label="销售订单号"
                    prop="saleOrderId"
                    width="220">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="orderNo"
                    label="询价单号"
                    width="220">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="custName"
                    label="客户名">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="productName"
                    label="产品名">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="price"
                    label="定价">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop='quotedPrice'
                    label="报价">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop='remarks'
                    label="备注">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop='sale'
                    label="销售">
                </el-table-column>
                <el-table-column
                    align="center"
                    width="160"
                    label="订单提交时间">
                    <template slot-scope="scope">
                        {{scope.row.saleOrderDate | dateFormat('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop='statusDesc'
                    label="状态">
                </el-table-column>
            </el-table>
            <div class="quoto-footer">
                <el-button>
                    <a :href="'/down/dowSaleOrderExcel?roleId='+roleId+'&str='+userId" download='模板.xlsx'>导出报表</a>
                </el-button>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="5"
                    layout="total, prev, pager, next, jumper"
                    :total="rowTotal">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {saleOrderList} from '../../api/saleOrder';

    export default {
        data() {
            return {
                searchData:{
                    saleOrderId:"",
                    sale:this.$store.state.user.user.id+'',
                    page:1,
                    pageRow:5,
                    priceStartDate:"",
                    priceEndDate:"",
                },
                rowTotal:0,
                value:"",
                currentPage:1,
                tableData: [],
                downLoadUrl:"",
                roleId:"",
                userId:""
            }
        },
        created () {
            this.roleId = this.$store.state.user.user.roleId;
            this.userId = this.$store.state.user.user.id;
        },
        methods: {
            handleSearch() {
                console.log(this.value);
                this.searchData.priceStartDate = this.value[0];
                this.searchData.priceEndDate = this.value[1];
                saleOrderList(this.searchData).then(res=>{
                    let data = res.data;
                    if(data.status==='0000' && data.code==='0000'){
                        this.rowTotal=data.data.rowTotal;                        
                        this.tableData = data.data.list.map(x=>{
                            x.statusDesc = x.status==1?'已转定':'未转定';
                            return x
                        });
                    }
                })
            },
            // 新增
            addSale(){
                this.$refs.addSaleRef.drawer = true;
            },
            handleCurrentChange(page) {
               this.searchData.page=page;
               this.handleSearch()
            },
        },
        mounted () {
            this.roleId = this.$store.state.user.user.roleId;
        },
    }
</script>

<style scoped>
.el-form-item__content,.el-date-editor{
    width: 250px;
}
.el-form-item{margin-right:20px;}
.quoto-footer{
    display: flex;
    justify-content: space-between;
    margin-top:20px;
}
.quoto-search{
    box-shadow: 1px 1px 10px 0 #ccc;
    border-bottom: 1px solid #ccc3;
    padding: 10px 10px 0;
}
.quoto-footer a{
    color: #606266;
}
</style>