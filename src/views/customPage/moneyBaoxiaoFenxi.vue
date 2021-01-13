<template>
  <div class="sale-Order">
    <div class="quoto-search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="报销单号：">
          <el-input placeholder="请输入单号" v-model="searchData.costOrderNo"></el-input>
        </el-form-item>
        <el-form-item label="报销人：">
          <el-input placeholder="请输入姓名" v-model="searchData.costPerson"></el-input>
        </el-form-item>
        <el-form-item label="申请时间：">
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
          <el-button type="primary" @click="handleSearch">查询</el-button>
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
        <el-table-column align="center" prop="costOrderNo" label="报销单号">
        </el-table-column>
        <el-table-column align="center" prop="costTypeName" label="报销类型">
        </el-table-column>
        <el-table-column align="center" prop="costPerson" label="报销人">
        </el-table-column>
        <el-table-column align="center" prop="costPrice" label="报销金额">
        </el-table-column>
        <el-table-column align="center" prop="auditPerson" label="审批人">
        </el-table-column>
        <el-table-column align="center" label="报销提交时间">
          <template slot-scope="scope">
            {{scope.row.costSubmitTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          prop="quotedPriceDate"
          label="操作"
          fit="true"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDetail(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="quoto-footer">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="5"
          layout="total,prev, pager, next, jumper"
          :total="totalRecord">
        </el-pagination>
    </div>
    </div>
    <el-dialog title="报销单详情" width="55%" :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="tables">
        <div class="tables_row">
            <div class="column flex_2"><span class="title">报销单号</span></div>
            <!-- <div class="column flex_1"><span class="title">报销子单号</span></div> -->
        </div>
        <div class="tables_row">
            <div class="column flex_2"><span>{{detailObj.costOrderNo}}</span></div>
            <!-- <div class="column flex_1"><span>{{detailObj.costChildOrderNo}}</span></div> -->
        </div>
        <div class="tables_row">
            <div class="column flex_1"><span class="title">报销人</span></div>
            <div class="column flex_1"><span class="title">报销提交时间</span></div>
            <div class="column flex_1"><span class="title">审批人</span></div>
        </div>
        <div class="tables_row">
            <div class="column flex_1"><span>{{detailObj.costPerson}}</span></div>
            <div class="column flex_1"><span>{{detailObj.costSubmitTime}}</span></div>
            <div class="column flex_1"><span>{{detailObj.auditPerson}}</span></div>
        </div>

        <div class="tables_row">
            <div class="column flex_1"><span class="title">开户行银行卡号</span></div>
            <div class="column flex_1"><span class="title">收款人开户行</span></div>
            <div class="column flex_1"><span class="title">报销类型</span></div>
        </div>
        <div class="tables_row">
            <div class="column flex_1"><span>{{detailObj.payeeBankNo}}</span></div>
            <div class="column flex_1"><span>{{detailObj.payeeBank}}</span></div>
            <div class="column flex_1"><span>{{detailObj.costTypeName}}</span></div>
        </div>
        <div class="tables_row">
            <div class="column flex_2"><span class="title">报销金额</span></div>
            <div class="column flex_1"><span class="title">状态</span></div>
        </div>

        <div class="tables_row">
            <div class="column flex_2"><span class="price">{{detailObj.costPrice}}</span></div>
            <div class="column flex_1"><span>待审核</span></div>
        </div>
        <div class="tables_row">
            <div class="column flex_2"><span class="title">备注</span></div>
        </div>
        <div class="tables_row">
            <div class="column flex_2"><span>{{detailObj.param1}}</span></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span> 
    </el-dialog>
  </div>
</template>

<script>
import {getCostList} from '../../api/customerManager';
export default {
  data() {
    return {
      dialogVisible:false,
      searchData:{
        costOrderNo:"",
        costChildOrderNo:"",
        costPerson:"",
        auditPerson:"",
        costSubmitStartTime:null,
        costSubmitEndTime:null,
        costType:'1',
        page: 1,
        pageRow: 5
      },
      detailObj:{},
      value: "",
      currentPage: 1,
      tableData: [],
      totalRecord:0,
    };
  },
  methods: {
    async handleSearch() {
      this.searchData.costSubmitStartTime = this.value[0];
      this.searchData.costSubmitEndTime = this.value[1];
      const {data} = await getCostList(this.searchData);
      if(data.code==='0000' &&data.status==='0000'){
        this.tableData = data.data.dataList;
        this.totalRecord = data.data.totalRecord;
      }else{
        this.$message({
          message:data.msg,
          type:"warning"
        })
      }
    },
    handleCurrentChange(page) {
      this.searchData.page=page;
      this.handleSearch();
    },
    handleDetail(val) {
        this.detailObj = val;
        this.dialogVisible=true;
    },
    handleClose(){
      this.dialogVisible=false;
    }
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
  justify-content: flex-end;
  margin-top: 20px;
}
.quoto-search {
  box-shadow: 1px 1px 10px 0 #ccc;
  border-bottom: 1px solid #ccc3;
  padding: 10px 10px 0;
}
/deep/.el-dialog__header{
  background-color:rgba(245,245,245,1);
}
.tables {
  width: 100%;
  border-left: 1px solid #cccccc;
  border-top: 1px solid #cccccc;
  box-sizing: border-box;
}
.tables .tables_row {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.tables .tables_row:nth-of-type(odd) {
  background-color: #f2f2f2;
}
.tables .tables_row .column {
  border-right: 1px solid #ccc;
}
.tables .tables_row .column span {
  margin-left: 20px;
}
.tables .tables_row .flex_1 {
  flex: 1;
}
.tables .tables_row .flex_2 {
  flex: 2;
}
.title{
  font-weight: bold;
  font-size: 16px;
}
.price{
  color:red;
  font-size: 16px;
}
</style>