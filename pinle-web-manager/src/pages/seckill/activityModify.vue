<template>
  <div class="seckillactivitymodify-container">
    <breadcrumb></breadcrumb>
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="秒杀活动名称" name="1">
            <span>{{name}}</span>
          </el-collapse-item>
          <el-collapse-item title="活动状态" name="2">
            <div style="color: #38c9ff">
              <img src="../../img/icon_not_start.png" alt >
              <span>未开始</span>
            </div>
          </el-collapse-item>
          <el-collapse-item title="活动时间" name="3">
            <el-form label-width="100px">
              <el-form-item label="开始时间">
                <el-date-picker
                  type="datetime"
                  v-model="startTime"
                  @change="verfy_startTime"
                  placeholder="选择日期时间"
                  style="width:200px"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  type="datetime"
                  v-model="endTime"
                  @change="verfy_endTime"
                  placeholder="选择日期时间"
                  style="width:200px"
                  default-time="23:59:59"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker
                  type="datetime"
                  v-model="createTime"
                  style="width:200px"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="活动商品" name="4">
            <el-form label-width="100px">
              <el-form-item label="活动商品">
                <div class="goods">
                  <img :src="goods.picture" alt style="margin-left: 5px;">
                  <div class="msg">
                    <p class="ellipsis goodsname">{{goods.name}}</p>
                    <p class="ellipsis">原价: {{goods.price + '元'}}</p>
                  </div>
                </div>
                <span
                  style="color:#5d70e9;font-weight: 400;cursor:pointer"
                  @click="select_goods"
                >点击选择</span>
              </el-form-item>
              <el-form-item label="活动价格">
                <el-input v-model="seckillPrice" placeholder="请输入价格"></el-input>&nbsp;元
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <div class="btn">
          <el-button type="primary" @click="update_promotion">确定</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </div>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2", "3", "4"],
      name: "",
      startTime: "",
      endTime: "",
      seckillPrice: "",
      createTime: "",
      goods: "",
      id: this.$route.query.id,
    };
  },
  created() {
    let msg = localStorage.getItem("msg") || "";
    localStorage.removeItem("msg");
    if (msg) {
      let obj = JSON.parse(msg);
      this.name = obj.name;
      this.startTime = obj.startTime;
      this.endTime = obj.endTime;
      this.seckillPrice = obj.seckillPrice;
      this.createTime = obj.createTime;
      let id = localStorage.getItem("id") || "";
      localStorage.removeItem("id");
      if (id) {
        this.get_goodsDetail(id);
      } else {
        this.goods = obj.goods;
      }
    } else {
      this.get_detail();
    }
  },
  methods: {

    get_detail() {
      this.$axios.post("/web_panic_buy/get", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data;
          this.name = data.name;
          this.startTime = data.startTime;
          this.endTime = data.endTime;
          this.createTime = data.createtime;
          this.seckillPrice = data.panicBuyPrice;
          this.goods = data.goods;
        }
      });
    },
    select_goods() {
      let msg = {
        name: this.name,
        startTime: this.startTime,
        endTime: this.endTime,
        seckillPrice: this.seckillPrice,
        goods: this.goods,
        createTime: this.createTime
      };
      localStorage.setItem("msg", JSON.stringify(msg));
      this.$router.push("/seckill_selectGoods?type=12");
    },
    get_goodsDetail(id) {
      this.$axios.post("web_goods/get_one", "id=" + id).then(result => {
        if (result.data.status == 0) {
          let data = result.data.data.goods;
          this.goods = {
            picture: data.pictureUrl,
            name: data.name,
            price: data.price,
            id: data.id
          };
        }
      });
    },
    update_promotion(){
      if(!this.startTime){
        return this.$message({
          type:'warning',
          message:'活动开始时间不能为空'
        })
      }
      if(!this.endTime){
        return this.$message({
          type:'warning',
          message:'活动结束时间不能为空'
        })
      }
      if(!this.goods.id){
        return this.$message({
          type:'warning',
          message:'活动商品不能为空'
        })
      }
      if(!this.seckillPrice){
        return this.$message({
          type:'warning',
          message:'活动价格不能为空'
        })
      }
       let data = 'id=' + this.id + '&name=' + this.name + '&goodsId=' + this.goods.id + '&panicBuyPrice=' + this.seckillPrice + '&createtime=' + this.createTime + '&startTime=' + this.startTime + '&endTime=' + this.endTime  
      this.$axios.post('/web_panic_buy/modify',data).then(result => {
        if(result.data.status == 0) {
          if(result.data.data == 1){
            this.$router.push('/seckill_activityList')
            return this.$message({
              type:'success',
              message:'修改成功'
            })
          } else {
            return this.$message({
              type: 'warning',
              message:'修改失败'
            })
          }
        }
      })
    },
    //   校验开始时间
    verfy_startTime(){
      if(this.startTime == null){
        this.startTime = ''
      }

      if(this.endTime){
        this.timeCompare(1)
      }

    },
    //   校验结束时间
    verfy_endTime(){
      if(this.endTime == null){
        this.endTime = ''
      }

      if(!this.startTime){
        this.endTime = ''
        return this.$message({
          type: 'warning',
          message: '请先输入活动开始时间'
        })
      } else {
        this.timeCompare(2)
      }
    },
    //   结束时间与开始时间进行比较
    timeCompare(flag){
      //  flag  用于标记是清楚开始时间，还是清楚结束时间
      if((new Date(this.startTime)).getTime() >= (new Date(this.endTime)).getTime()){
        if(flag == 1){
          this.startTime = ''
        } else {
          this.endTime = ''
        }
        return this.$message({
          type: 'warning',
          message: "'活动开始时间'必须小于'活动结束时间'"
        })
      }
    }
  }
};
</script>



<style lang="less">
.seckillactivitymodify-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    .el-main {
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
            font-weight: 600;
            border-bottom: 1px solid #e4e5e7;
            background-color: #eff3f6;

            .el-collapse-item__arrow {
              margin: 0;
              margin-left: 10px;
            }
          }
          .el-collapse-item__wrap {
            margin-top: 20px;
            border: none;
            .el-collapse-item__content {
              padding: 0;
              padding-left: 15px;
              display: flex;
              background-color: #eff3f6;
            }
          }
          &:nth-of-type(1) {
            .el-collapse-item__content {
              color: #000;
              font-weight: 600;
              .el-input {
                width: 150px !important;
              }
            }
          }
          &:nth-of-type(2) {
            .el-collapse-item__content {
              div {
                display: flex;
                img {
                  width: 20px;
                  height: 20px;
                }
                span {
                  margin-left: 10px;
                  font-weight: 600;
                  height: 20px;
                  line-height: 20px;
                }
              }
            }
          }
          &:nth-of-type(3) {
            .el-collapse-item__content {
              .el-form {
                display: flex;
                .el-form-item {
                  margin-bottom: 0;
                }
              }
              .el-input {
                width: 190px !important;
              }
            }
          }
          &:nth-of-type(4) {
            .el-collapse-item__content {
              .el-form {
                display: flex;
              }
            }
            .el-form-item__content:first-of-type {
              flex-direction: column;
            }
            .el-form-item__content:last-of-type {
              .el-input {
                width: 150px !important;
              }
            }
          }
        }
      }
      .el-input {
        .el-input__inner {
          height: 30px;
        }
      }
      .el-form {
        .el-form-item {
          margin-right: 50px;
          margin-bottom: 0;
          .el-form-item__label {
            color: #000;
            font-weight: 600;
            text-align: left;
          }
        }
      }
      .goods {
        display: flex;
        height: 80px;
        border: 1px solid #ccc;
        padding: 10px 0;
        box-sizing: border-box;
        img {
          width: 70px;
          height: 60px;
          display: block;
        }
        .msg {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          margin-left: 10px;
          p {
            height: 30px;
            line-height: 30px;
            width: 120px;
          }
        }
      }
      .btn {
        text-align: center;
        margin-top: 30px;
        .el-button {
          width: 65px;
          height: 30px;
          padding: 0;
          margin: 0 65px;
          &:last-of-type {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
