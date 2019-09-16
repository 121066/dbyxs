<template>
  <div class="sin_del-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">
    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="发起者" name="1">
            <el-form label-width="80px">
              <el-form-item label="发起者">
                <span>{{name}}</span>
              </el-form-item>
              <el-form-item label="拼单状态">
                <span>{{status}}</span>
              </el-form-item>
              <el-form-item label="开始时间" style="margin-left: -20px;margin-right: 70px;">
                <span>{{createtime}}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{overtime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="商品信息" name="2">
            <el-form  class="goods_select">
              <el-form-item>
                <div class="goods">
                  <img :src="goodsPic" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">
                        <el-tooltip class="item" effect="dark" :content="goodName" placement="bottom">
                           <span>{{goodName}}</span>
                        </el-tooltip>
                    </p>
                    <p>原价:{{goodsPrice + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="拼单用户" name="3" class="promotion_info">
              <div style="line-height: 40px;padding-left: 10px;box-sizing: border-box;color: #666">
               <span style="font-weight: bold">{{joinNum}}</span>人参与，目标人数 <span style="font-weight: bold">{{goalNum}}</span>人  拼单价格  <span style="font-weight: bold">{{pgPrice}}</span>元
              </div>
            <el-main style="padding:0;">
              <div class="table" style="height: 420px;">
                <el-table :data="member" style="width: 100%" height="290">
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="joinTime" label="加入时间"></el-table-column>
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="joinTime" label="加入时间"></el-table-column>
                </el-table>
                  <pagination
                    :currentPage="currentPage"
                    :page="page"
                    :total="total"
                    :pageSize="pageSize"
                    @change-current="currentChange"
                    @change-size="sizeChange"
                  ></pagination>
              </div>
            </el-main>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </div>
  </div>
</template>


<script>
import pagination from "../../components/page";
import breadcrumb from "../../components/breadcrumb";
import { purchase_detail } from '../../api/getData'
export default {
  components: { breadcrumb, pagination },
  data() {
    return {
      activeName: ["1", "2", "3"],
      id: this.$route.query.id,
      pageSize: 5,
      currentPage: 1,
      page: 1,
      total: 0,
      usersList: [],
      name: "",
      status: "",
      createtime: "",
      overtime: "",
      person: "",
      members: [],
      member: [],
      goodName: '',
      goodsPrice: '',
      goodsPic: '',
      joinNum: '',
      goalNum: '',
      pgPrice: '' ,  //  拼单价格
    };
  },
  created() {
    this.get_purchase_detail()
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    currentChange(val) {
      this.currentPage = val;
    },
    get_purchase_detail(){
      purchase_detail('id=' + this.id).then(res => {
        if(res.data.status == 0) {
          var data = res.data.data
          this.name = data.username
          if(data.status == 1) {
            this.status = '已获得'
          } else if(data.status == 2){
            this.status = '拼单超时结束'
          } else if(data.status == 3){
            this.status = '拼单中'
          }
          this.createtime = data.startTime
          this.overtime = data.endTime
          this.goodName = data.shortName
          this.goodsPrice = data.price
          this.goodsPic = data.picture
          this.joinNum = data.joinNum
          this.goalNum = data.goalNum
          this.pgPrice =  data.pgPrice
          if(data.user == null) {
            data.user = []
          }
          this.members = data.user
          this.total = data.user.length
          this.page = Math.ceil(this.total / this.pageSize)
          this.member = this.members.splice((this.currentPage - 1) * this.pageSize,this.pageSize * this.currentPage)
        }
      })
    }
  }
};
</script>



<style lang="less">
@import "../../style/table";
.sin_del-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  position: relative;
  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: auto;
    .el-main {
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          margin-bottom: 10px;
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

              .el-form {
                display: flex;

                .el-form-item {
                  margin: 0;
                  width: 250px;
                  .el-form-item__label {
                    height: 30px;
                    line-height: 30px;
                    text-align: left;
                    color: #000;
                    font-weight: 600;
                    padding: 0;
                  }
                  .el-form-item__content {
                    line-height: 30px;
                  }
                }
              }
              .goods_select {
                display: flex;
                flex-wrap: wrap;
                .el-form-item {
                  width: 375px;
                  margin-right: 38px;

                  .el-form-item__content {
                    // display: flex;
                    // justify-content: space-between;
                    .goods {
                      width: 180px;
                      height: 70px;
                      padding: 5px;
                      box-sizing: border-box;
                      //   border: 1px solid #bbbfc2;
                      display: flex;
                      justify-content: space-around;
                      border: 1px solid #ccc;
                      img {
                        width: 70px;
                        height: 60px;
                      }
                      .goods_msg {
                        width: 95px;
                        margin-left: 5px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        p {
                          width: 100%;
                        }
                      }
                    }
                  }
                }
              }
            }
          }

        }
        .promotion_info {
          .el-collapse-item__content {
            flex-direction: column;
          }
          .el-collapse-item__wrap{
              margin-top: 0;
          }
        }
      }
    }
  }
}
</style>
