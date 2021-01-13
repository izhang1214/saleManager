<template>
  <div class="sale-Order">
    <div class="quoto-search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="产品ID：">
          <el-input
            placeholder="请输入产品ID"
            v-model="searchData.productId"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称：">
          <el-input
            placeholder="请输入产品名称"
            v-model="searchData.productName"
          ></el-input>
        </el-form-item>
        <el-form-item label="入库时间：">
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
        <el-table-column
          align="center"
          label="产品ID"
          prop="productId"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="productName"
          label="产品名称"
          width="120"
        >
        </el-table-column>
        <el-table-column align="center" prop="number" label="剩余库存">
        </el-table-column>
        <el-table-column align="center" prop="price" label="定价">
        </el-table-column>
        <el-table-column align="center" label="产品入库时间">
            <template slot-scope="scope">
              {{scope.row.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
            </template>
        </el-table-column>
        <el-table-column align="center" label="库存更新时间">
          <template slot-scope="scope" v-if="scope.row.updateTime">
              {{scope.row.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="quoto-footer">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="rowTotal"
          :page-size="5"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList } from "../../api/search";
import { getDetail } from "../../api/entryOroutStore";
import bus from "../../utils/eventBus";
export default {
  data() {
    return {
      rowTotal: 0,
      searchData: {
        productId: "",
        productName: "",
        createTime: "",
        updateTime: "",
        page: 1,
        pageRow: 5,
      },
      value: "",
      currentPage: 1,
      tableData: [],
    };
  },
  methods: {
    handleSearch() {
      getProductList(this.searchData).then((res) => {
        let data = res.data;
        if (data.status === "0000" && data.code === "0000") {
          this.rowTotal = data.data.rowTotal;
          this.tableData = data.data.list;
        }
      });
    },
    handleCurrentChange(page) {
      this.searchData.page = page;
      this.handleSearch();
    },
    handleDetail(val) {
      this.$router.push({name:"logInfo", params:{data:val}});
      // this.$router.push("/storeLog");
      // setTimeout(() => {
      //   bus.$emit("getStoreLog", val);
      // },50);
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
.quoto-search {
  box-shadow: 1px 1px 10px 0 #ccc;
  border-bottom: 1px solid #ccc3;
  padding: 10px 10px 0;
}
</style>