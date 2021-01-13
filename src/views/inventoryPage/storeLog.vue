<template>
  <div class="log-content">
    <div class="log-header">
      <div>
        <h2>{{ detailVal.productName }}</h2>
        <p>(ID:{{ detailVal.productId }})</p>
        <span>产品名称</span>
      </div>
      <div>
        <h2 style="margin-top: 40px">{{ detailVal.price }}</h2>
        <span>产品定价</span>
      </div>
      <div>
        <h2 style="margin-top: 40px">{{ detailVal.number }}</h2>
        <span>剩余库存数</span>
      </div>
    </div>
    <div class="quoto-showData">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column align="center" prop="actType" label="操作">
        </el-table-column>
        <el-table-column align="center" prop="inOutTypeName" label="操作类型">
        </el-table-column>
        <el-table-column align="center" prop="actNumberStr" label="操作数量">
        </el-table-column>
        <el-table-column align="center" prop="actTime" label="操作时间">
        </el-table-column>
        <el-table-column align="center" prop="actPerson" label="操作人">
        </el-table-column>
        <el-table-column align="center" prop="actRemark" label="操作备注">
        </el-table-column>
      </el-table>
      <div class="quoto-footer">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="5"
          layout="total, prev, pager, next,jumper"
          :total="totalRecord"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { custRelationList } from "../../api/customerManager";
import { getDetail } from "../../api/entryOroutStore";
import bus from "../../utils/eventBus";
export default {
  data() {
    return {
      totalRecord: 0,
      searchData: {
        page: 1,
        pageRow: 5,
        createStartTime: null,
        createEndTime: null,
        orderStartTime: null,
        orderEndTime: null,
        type: "",
        customerName: "",
        productId: "",
      },
      value: "",
      currentPage: 1,
      tableData: [],
      detailVal: {},
      detailData: {
        productId: "",
        page: 1,
        pageRow: 5,
      },
    };
  },
  // mounted() {
  //   bus.$on("getStoreLog", (val) => {
  //     this.detailData.productId = val.productId;
  //     this.getDetailLog(this.detailData);
  //     console.log(val, "接收数据");
  //   });
  // },
  mounted()  {
    const data = this.$route.params;
    this.detailData.productId = data.data.productId;
    if(this.detailData.productId){
      this.getDetailLog(this.detailData);
    }
  },
  watch: {
    '$route'(to) {
      if(to.path==='/storeLog'){
          const data = this.$route.params;
          if(data.data.productId){
            this.detailData.productId = data.data.productId;
            this.getDetailLog(this.detailData);
          }
      }
    }
  },
  methods: {
    customerSearch() {},
    handleCurrentChange(page) {
      this.searchData.page = page;
      this.customerSearch();
    },
    getDetailLog(params) {
      getDetail(params).then((res) => {
        let data = res.data;
        if (data.status === "0000" && data.code === "0000") {
          this.detailVal.productId = data.data.productId;
          this.detailVal.productName = data.data.productName;
          this.detailVal.price = data.data.price;
          this.detailVal.number = data.data.number;
          this.totalRecord = data.data.totalRecord;
          this.tableData = data.data.dataList;
        }
      });
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
  justify-content: flex-end;
  margin-top: 20px;
}
.log-header {
  width: 100%;
  margin: 15px auto;
  display: flex;
  background: rgba(249, 249, 249, 1);
  /* box-shadow: 0 3px 5px rgba(0,0,0,0.5);   */
}
.log-header div {
  height: 150px;
  flex: 1;
  text-align: center;
}
.log-header div h2 {
  margin: 30px 0 5px;
}
.log-header div:nth-of-type(2) {
  /* border-left: 1px solid #ccc; */
  /* border-right: 1px solid #ccc; */
  box-shadow: 5px 0px 5px -5px #00000036, -5px 0px 5px -5px #00000036;
}
</style>