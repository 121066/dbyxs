<template>
  <div class="bar_del-container">
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
              <el-form-item label="砍价状态">
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
                  <img :src="goalGoods.picture" alt>
                  <div class="goods_msg">
                    <p class="ellipsis">
                        <el-tooltip class="item" effect="dark" :content="goalGoods.name" placement="bottom">
                           <span>{{goalGoods.name}}</span>
                        </el-tooltip>
                    </p>
                    <p class="ellipsis">原价:{{goalGoods.price + '元'}}</p>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="帮砍信息" name="3" class="promotion_info">
              <div style="line-height: 40px;padding-left: 10px;box-sizing: border-box;color: #666">
               <span style="font-weight: bold">已有{{num}}</span>人帮砍，目标价格 <span style="font-weight: bold">{{goalGoods.price}}</span>元  帮砍  <span style="font-weight: bold">{{bar_price}}</span>元
              </div>
            <el-main style="padding:0;">
              <div class="table" style="height: 420px;">
                <el-table :data="member" style="width: 100%" height="290">
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="price" label="帮砍金额（元）"></el-table-column>
                  <el-table-column prop="time" label="加入时间"></el-table-column>
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
import {bargain_detail} from '../../api/getData'
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
      name: "张三",  
      status: "",  //   砍价状态  '1': '已获得' ,'3': '砍价中' , '2':砍价超时
      createtime: "2019-05-05  22:59:59",
      overtime: "2019-08-05 22:59:59",
      goalGoods:{picture: '//img.alicdn.com/imgextra/i1/2641599952/O1CN01Lc0fQ22NO4BwM4KMk_!!0-item_pic.jpg_760x760Q50s50.jpg_.webp', name: '苏泊尔烧水壶电热水壶家用玻璃开水壶自动断电304不锈钢电茶壶器', price: '100'},
      person: "",
      members: [],
      member: [],
      num: '',
      bar_price: '',
    };
  },
  created() {
    this.get_bar_detail()
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.member = this.members.splice((this.currentPage - 1) * this.pageSize,this.currentPage * this.page)

    },
    currentChange(val) {
      this.currentPage = val;
      this.member = this.members.splice((this.currentPage - 1) * this.pageSize,this.currentPage * this.page)
    },
    get_bar_detail(){
      bargain_detail('teamId=' + this.id).then(res => {
        if(res.data.status == 0){
          var data = res.data.data
          this.name = data.username //  发起者
          if(data.status == 1) {
            this.status = '已获得'
          } else if(data.status ==3){
            this.status = '砍价中'
          } else if(data.status ==2){
            this.status = '砍价超时'
          }
          this.createtime = data.startTime
          this.overtime = data.endTime
          this.goalGoods.name = data.shortName
          this.goalGoods.picture = data.picture
          this.goalGoods.price = data.price
          this.num = data.num
          this.bar_price = data.total
          this.members = data.user
          this.total = data.user.length;
          this.page = Math.ceil(this.total / this.pageSize)
          this.member = this.members.splice((this.currentPage - 1) * this.pageSize,this.currentPage * this.page)
        }
      })
    }
  }
};
</script>



<style lang="less">
@import "../../style/table";
.bar_del-container {
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
