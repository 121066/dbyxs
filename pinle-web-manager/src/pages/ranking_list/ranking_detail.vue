<template>
  <div class="ranking_detail-container">
    <breadcrumb style></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="排行榜设置名称" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="活动状态">
                <el-radio v-model="form.radio" label="0" disabled>禁用</el-radio>
                <el-radio v-model="form.radio" label="1" disabled>启用</el-radio>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="排行榜奖品设置" name="2">
            <div class="add_area" v-for="(item, index) in form.activitySetting" :key="index">
              <div class="area">
                <span>{{item.start}}</span>-
                <span>{{item.end}}</span>
                名
              </div>
              <div style="height: 140px;">
                <div class="goods">
                  <i
                    class="el-icon-circle-plus-outline"
                    style="color:#409eff;font-size:30px;cursor:pointer;"
                    @click="select_goods(index)"
                    v-if="!item.goods.id"
                  ></i>
                  <img :src="item.goods.picture" alt v-if="item.goods.picture" @click="see_detail(item.goods.id)">
                  <div class="goods_msg" v-if="item.goods.picture">
                    <p class="ellipsis">{{item.goods.name}}</p>
                    <p class="ellipsis">原价:{{item.goods.price}}元</p>
                  </div>
                </div>

              </div>

            </div>
          </el-collapse-item>
        </el-collapse>

      </el-main>
      <!-- <el-dialog title="添加提醒" :visible.sync="form.dialogVisible1" width="30%" class="tips">
        <div>
          <p>当前有多个启动的抽奖活动，如果添加则以当前活动为主</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="form.dialogVisible1 = false">确 定</el-button>
          <el-button @click="form.dialogVisible1 = false">取消</el-button>
        </span>
      </el-dialog>-->

    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { goods_detail,modify_ranking,see_modify_detail} from "../../api/getData";

export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2"],
      form: {
        name: "",
        radio: "1",
        dialogVisible: false,
        // dialogVisible1: false,
        startRanking: "",
        endRanking: "",
        type: "", //   用于标记是向前添加，还是向后添加
        position: "", //  用于标记该区间位于哪个位置
        flag: false,
        id:this.$route.query.id,
        activitySetting: [
        //   {
        //     start: "1",
        //     end: "100",
        //     goods: { picture: "", price: "", name: "", id: "" },
        //     isshow1: false,
        //     isshow2: false,
        //     isshow3: true,
        //     isshow4: true
        //   }
        ],
        positionId: ""
      }
    };
  },
  created() {
    this.get_ranking_detail()
  },
  methods: {
    get_ranking_detail(){
        see_modify_detail('id=' + this.form.id).then(res => {
            if(res.data.status == 0){
                let data = res.data.data
                this.form.name = data.name
                this.form.radio = data.stauts
                let goods = res.data.data.goods 
                goods.forEach((item,index) => {
                    this.form.activitySetting.push({start:item.startRanking,end:item.endRanking,goods:{id:item.id,picture:item.picture,name:item.shortName,price:item.price},isshow1:true,isshow2:true,isshow3:true,isshow4:true})
                })
                this.form.activitySetting.forEach((item,index) => {
                    if(index == 0){
                        item.isshow1 = false
                    }
                    if(index == this.form.activitySetting.length - 1){
                        item.isshow2 = false
                    }
                })
            }
        })
    },
    see_detail(id){
      this.$router.push('goodsDetail?id=' + id)
    }
  }
};
</script>



<style lang="less">
.ranking_detail-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  position:relative;
    > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  .el-tag__close.el-icon-close:hover {
    background-color: #409eff;
    color: #fff;
    border-radius: 50%;
  }
  .content {
    width: 100%;
    flex: 1;
    padding: 30px;
    background-color: #eff3f6;
    box-sizing: border-box;
    overflow: hidden;
    .el-main {
      background-color: #fff;
      height: 100%;
      padding: 20px 40px 0;
      .el-collapse {
        border: none;
        .el-collapse-item {
          margin-bottom: 10px;
          .el-collapse-item__header {
            height: 40px;
            color: #409eff;
            border-bottom: 1px solid #e4e5e7;
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
                    .el-input {
                      .el-input__inner {
                        height: 30px;
                        line-height: 30px;
                      }
                    }
                  }
                }
              }
            }
          }
          &:nth-of-type(1) {
            .el-collapse-item__content {
              .el-form {
                .el-form-item {
                  margin-right: 200px;
                }
              }
            }
          }
          &:nth-of-type(2) {
            .el-collapse-item__content {
              padding-left: 66px;
            }
            .add_area {
              display: flex;
              .area {
                margin-right: 10px;
                width: 70px;
              }
              .goods {
                width: 180px;
                height: 90px;
                border: 1px solid #ccc;
                display: flex;
                align-items: center;
                padding-left: 10px;
                box-sizing: border-box;
                i {
                  margin-left: 65px;
                }

                img {
                  width: 70px;
                  height: 60px;
                  display: block;
                }
                .goods_msg {
                  display: flex;
                  justify-content: space-between;
                  flex-direction: column;
                  margin-left: 10px;
                  p {
                    height: 30px;
                    line-height: 30px;
                    width: 90px;
                  }
                }
              }

            }
          }
        }
      }
    }
  }


  
}
</style>
