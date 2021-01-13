<template>
  <div class="addQuoto">
    <el-drawer
      title="新增"
      :visible.sync="drawer"
      :direction="direction"
      size="40%"
      style="box-shadow: 1px 1px 1px 0.5px #ccc"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <!-- 产品名 -->
          <el-form-item
            :label="addData.productName"
            :label-width="formLabelWidth"
          >
            <el-select v-model="value" filterable placeholder="请选择" @focus="getList">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"                
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="addData.custName"
            prop="custName"
            :label-width="formLabelWidth"
          >
            <el-input
              :placeholder="'请输入' + addData.custName"
              v-model="form.custName"
            ></el-input>
          </el-form-item>
          <!-- 期望价 -->
          <el-form-item
            :label="addData.expectPrice"
            prop="expectPrice"
            :label-width="formLabelWidth"
            v-show="addData.quotoFlag"
          >
            <el-input
              :placeholder="'请输入' + addData.expectPrice"
              v-model.number="form.expectPrice"
            ></el-input>
          </el-form-item>
          <!-- saleOrder销售订单 -->
          <el-form-item
            :label="addData.saleOrder"
            :label-width="formLabelWidth"
            v-show="addData.saleOrder">
            <el-input
              :placeholder="'请输入' + addData.saleOrder"
              v-model="form.saleOrderId"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="addData.orderNo"
            :label-width="formLabelWidth"
            v-show="!addData.quotoFlag"
          >
            <el-input
              :placeholder="'请输入' + addData.orderNo"
              v-model="form.orderNo"
            ></el-input>
          </el-form-item>          
          <el-form-item
            label="期望报价日期："
            :label-width="formLabelWidth"
            v-show="addData.quotoFlag"
          >
            <el-date-picker
              v-model="form.expectPriceDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :label="addData.remarks"
            props="remarks"
            :label-width="formLabelWidth"
          >
            <el-input
              style="width: 80%"
              v-model="form.remarks"
              type="textarea"
              placeholder="请输入客户备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button style="margin-left: 10px" @click="cancelForm"
          >取 消</el-button
        >
        <el-button type="primary" @click="sureBtn('ruleForm')">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { quotoManagerSearch, addQuoted } from "../../api/quotoManager";
import { addNewOrder ,findOrder,addNewSale,productList} from '../../api/saleOrder';
export default {
  props: {
    addData: {
      type: Object,
    },
  },
  data() {
    return {
      direction: "rtl",
      labelPosition: "right",
      drawer: false,
      formLabelWidth: "140px",
      timer: null,
      value:"",
      form: {
        orderNo: "",
        sale: "",
        saleOrderId:'',
        custName: "",
        productName: "",
        price: "",
        custRemarks:"",
        remarks: null,
        priceDate: null,
        status: null,
        expectPriceDate: null, //期望报价时间
        quotedPrice: null,
        quotedPricePeople: null,
        quotedPriceDate: null,
      },
      rules: {
        // productName: [
        //   { required: true, message: "请输入产品名称", trigger: "blur" },
        // ],
        price: [
          { required: this.addData.saleFlag, message: "请输入价格",trigger: "blur"},
        ],
        custName: [
          {required: true, message: "请输入客户名",trigger: "blur"},
        ],
        expectPrice: [
          { required: this.addData.quotoFlag,message: "请输入期望价" },
          { type: 'number', message: '价格必须为数字值'}
        ]
      },
      options:[]
    };
  },
  mounted() {
    this.getList();
    this.form.sale = this.$store.state.user.user.id+'';
  },
  methods: {
    cancelForm() {
      this.loading = false;
      this.drawer = false;
    },
    getList(){
      var arr=[];
      productList().then(res=>{
        let data = res.data;
        if(data.code==='0000' && data.status==='0000'){
          data.data.forEach(x=>{
           arr.push({
            value:x.productName ,
            label:x.productName
           })
          });
          this.options = arr;
        }
      })
    },
    addDataFun(data){
      if (data.status === "0000" && data.code === "0000") {
        this.$message({
          message: "添加" + data.msg,
          type: "success",
        });
        // 添加成功后，清空数据
        for (let key in this.form) {
          this.form[key]=null
        };
        this.$emit("get-data");
      }
    },
    // 添加的确定按钮
    sureBtn(ruleForm) {
      this.form.sale = this.$store.state.user.user.id+'';
      console.log(this.form.sale);
      this.form.productName = this.value;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 报价管理的新增
          if(this.addData.quotoFlag){
            addQuoted(this.form).then((res) => {
              const data = res.data;
              this.addDataFun(data);
            });
          }
          // 销售订单新增
          if(this.addData.saleFlag){
            if(this.form.orderNo!==""){
              // 调用 询价比对 接口
              findOrder(this.form).then(res=>{
                const data =res.data;
                if(data.status!=='0000'&& data.code==='0000'){
                  this.$message({
                    message:data.msg,
                    type:"error"
                  })
                  return false;
                }else{
                  addNewOrder(this.form).then(res=>{
                    const data = res.data;
                    this.addDataFun(data);
                  })
                }
              })
            }else{
              addNewOrder(this.form).then(res=>{
                const data = res.data;
                this.addDataFun(data);
              })
            }
          };
          // 销售单新增
          if(this.addData.singleFlag){
            if(this.form.orderNo!==""){
              // 调用 询价比对 接口
              findOrder(this.form).then(res=>{
                const data =res.data;
                if(data.status!=='0000'&& data.code==='0000'){
                  this.$message({
                    message:data.msg,
                    type:"error"
                  })
                  return false;
                }else{
                  addNewSale(this.form).then(res=>{
                    const data = res.data;
                    this.addDataFun(data);
                  })
                }
              })
            }else{
              addNewSale(this.form).then(res=>{
                const data = res.data;
                this.addDataFun(data);
              })
            }
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.el-input,
.el-textarea__inner {
  width: 80% !important;
}
.demo-drawer__footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #ccc;
  padding-top: 5px;
}
/deep/.el-select{
  width: 80%;
}
/deep/ :focus {
  outline: 0;
}
/deep/ .el-drawer__header {
  line-height: 40px;
  box-shadow: 1px 1px 10px 0px #ccc;
}
</style>