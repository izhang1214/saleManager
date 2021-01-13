<template>
  <div class="sale-Order">
    <div class="quoto-search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="客户名：">
          <el-input placeholder="请输入客户名" v-model="searchData.customerName"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
            <el-select v-model="searchData.type" placeholder="类型" style="width: 250px">
                <el-option label="客户" value="客户"></el-option>
                <el-option label="供应商" value="供应商"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="新增时间：">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最近下单时间：">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="customerSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="quoto-showData">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column align="center" prop="customerName" label="客户名">
        </el-table-column>
        <el-table-column align="center" prop="customerPhone" label="联系电话">
        </el-table-column>
        <el-table-column align="center" prop="customerEmail" label="联系邮箱">
        </el-table-column>
        <el-table-column align="center" prop="customerAddress" label="联系地址">
        </el-table-column>
        <el-table-column align="center" prop="customerLicense" label="营业执照">
        </el-table-column>
        <el-table-column align="center" prop="orderNo" label="询价单">
        </el-table-column>
        <el-table-column align="center" prop="saleOrderId" label="销售订单">
        </el-table-column>
        <el-table-column align="center" prop="saleId" label="销售单">
        </el-table-column>
        <el-table-column align="center" label="新增时间">
          <template slot-scope="scope">
            {{scope.row.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="最近下单时间">
          <template slot-scope="scope">
            {{scope.row.orderTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>        
      </el-table>
      <div class="quoto-footer">        
        <el-button @click="refreshList">刷新列表&nbsp;<i class="el-icon-refresh"></i></el-button>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="5"
            layout="total, prev, pager, next,jumper"
            :total="totalRecord">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {custRelationList} from '../../api/customerManager';
export default {
  data() {
    return {
      totalRecord:0,
      searchData: {
        page: 1,
        pageRow: 5,
        createStartTime: null,
        createEndTime: null,
        orderStartTime:null,
        orderEndTime:null,
        type: "",
        customerName:""
      },
      value: "",
      currentPage: 1,
      tableData: [],
    };
  },
  methods: {
    customerSearch() {
      custRelationList(this.searchData).then(res=>{
        var data = res.data;
        console.log(data);
        if(data.code==='0000' && data.status==='0000'){
          this.tableData = data.data.dataList;
          this.totalRecord = data.data.totalRecord
        }else{
          this.$$message({
            message:data.msg,
            type:"warning"
          })
        }
      })
    },
    // 新增
    addSale() {
      this.$refs.addSaleRef.drawer = true;
    },
    handleCurrentChange(page) {
      this.searchData.page=page;
      this.customerSearch()
    },
    // 刷新
    refreshList(){
      this.customerSearch();
    },
  },
};
</script>

<style scoped>
.el-form-item__content,
.el-date-editor {
  width: 250px;
}
.el-form-item {
  margin-right: 20px;
}
.quoto-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.quoto-search {
  box-shadow: 1px 1px 10px 0 #ccc;
  border-bottom: 1px solid #ccc3;
  padding: 10px 10px 0;
}
</style>