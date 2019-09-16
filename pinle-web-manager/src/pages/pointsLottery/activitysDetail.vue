<template>
  <div class="points_act_detail-container">
    <breadcrumb></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)">

    <div class="content">
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item title="积分抽奖活动名称" name="1">
            <el-form label-width="60px">
              <el-form-item label="名称">
                <span>{{name}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="活动状态" name="2">
            <el-form label-width="60px">
              <el-form-item label="状态">
                <span>{{status}}</span>
              </el-form-item>
              <el-form-item label="单次抽奖积分">
                <span>{{points}}</span>&nbsp;积分
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="活动创建修改时间" name="3">
            <el-form label-width="80px">
              <el-form-item label="创建时间">
                <span>{{createTime}}</span>
              </el-form-item>
              <el-form-item label="修改时间">
                <span>{{modifyTime}}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="活动抽奖设置" name="4">
            <div class="circle">
              <ul ref="lottery">
                <li v-for="item in prizeList" :key="item.id">
                  <img src="@/img/button.png" alt v-if="item.id == 5">
                  <div class="prize_goods" v-if="item.flag == 2" @click="$router.push('goodsDetail?id=' + item.id)">
                    <img :src="item.picture" alt>
                    <p class="ellipsis">{{item.goodsName}}</p>
                    <p>中奖概率:{{item.probibality}}</p>
                  </div>
                  <div class="prize_points" v-if="item.flag == 1">
                    <img src="@/img/icon_points.png" alt>

                    <p class="ellipsis">{{item.points}}积分</p>
                    <p>中奖概率:{{item.probibality}}</p>
                  </div>
                  <div class="no_prize" v-if="item.flag == 3">
                    <p class="ellipsis">{{item.thanks}}</p>
                    <p>中奖概率:{{item.probibality}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </div>
  </div>
</template>


<script>
import breadcrumb from "../../components/breadcrumb";
import { lottery_detail } from "../../api/getData";
export default {
  components: { breadcrumb },
  data() {
    return {
      activeName: ["1", "2",'3','4'],
      id: this.$route.query.id,
      name: "",
      status: "",
      points: "",
      createTime: "",
      modifyTime: "",
      prizeList: [
        { id: 1, flag: "", },
        { id: 2, flag: "", },
        { id: 3, flag: "", },
        { id: 4, flag: "", },
        { id: 5, flag: "5" },
        { id: 6, flag: "" ,},
        { id: 7, flag: "" ,},
        { id: 8, flag: "" ,},
        { id: 9, flag: "" ,}
      ],
      goods: {}
    };
  },
  created() {
    this.get_lottery_detail();
  },
  methods: {
   async get_goodsDetail(id,position) {
     let data;
      await this.$axios.post("web_goods/get_one", "id=" + id).then(result => {
        if (result.data.status == 0) {
          data = result.data.data.goods;
        }
      })
return data
    },
    get_lottery_detail() {
      let data = "drawId=" + this.id;
      lottery_detail(data).then(res => {
        if (res.data.status == 0) {
          let data = res.data.data;
          this.createTime = data.createTime;
          if (data.drawStatus == 0) {
            this.status = "禁用";
          } else if (data.drawStatus == 1) {
            this.status = "启用";
          }
          this.points = data.drawScore;
          this.name = data.drawName;
          this.modifyTime = data.updateTime;
          this.prizeList.forEach((item, index) => {
            if (item.id != 5) {
              if(index >4){
                index--
              }
              item["probibality"] = data.drawItemVo[index]['drawWeight'];
              if (data.drawItemVo[index].drawType == 2) {
                item.flag = 1;
                item["points"] = data.drawItemVo[index].drawcore;
              } else if (data.drawItemVo[index].drawType == 1) {
                item.flag = 2;

                  
                  // this.get_goodsDetail(data.drawItemVo[index].drawGoodId,index);
                var reponse= this.get_goodsDetail(data.drawItemVo[index].drawGoodId,index);
                 reponse.then(res => {
                   this.$set(item,'picture',res.pictureUrl)
                                               item.picture = res.pictureUrl
                  item.goodsName = res.name
                  item.goodsPrice = res.price
                  item.id = res.id
   
                 })

   
         
 
              } else if (data.drawItemVo[index].drawType == 3) {
                item.flag = 3
                item["thanks"] = "谢谢惠顾";
              }
            }
          });
        console.log(this.prizeList)
        }
      });

    }
  },

};
</script>



<style lang="less">
.points_act_detail-container {
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
              padding-left: 45px;
              display: flex;
              background-color: #eff3f6;
              .el-form {
                width: 100%;
                .el-form-item {
                  margin-bottom: 0;
                  .el-form-item__label {
                    text-align: center;
                    font-weight: bold;
                    color: #000;
                  }
                }
              }
            }
          }
          &:nth-of-type(2) {
            .el-form {
              display: flex;
              .el-form-item {
                width: 230px;
                &:nth-of-type(2) {
                  .el-form-item__label {
                    width: 115px !important;
                  }
                  .el-form-item__content {
                    margin-left: 115px !important;
                  }
                }
              }
            }
          }
          &:nth-of-type(3) {
            .el-form {
              display: flex;
              .el-form-item {
                width: 330px;
              }
            }
          }
          &:nth-of-type(4) {
            .circle {
              width: 380px;
              height: 380px;
              background-color: #e4e4e4;
              border-radius: 15px;
              box-sizing: border-box;
              padding: 30px;
              ul {
                display: flex;
                flex-wrap: wrap;
                li {
                  width: 100px;
                  height: 100px;
                  background-color: #fff;
                  border-radius: 5px;
                  &:nth-of-type(3n-1) {
                    margin: 0 10px;
                  }
                  &:nth-of-type(-n + 6) {
                    margin-bottom: 10px;
                  }
                  &:nth-of-type(5) {
                    text-align: center;
                    box-sizing: border-box;
                    padding-top: 11px;
                    background-color: transparent;
                  }
                }
              }
              .prize_goods {
                box-sizing: border-box;
                padding-left: 10px;
                padding-top: 10px;
                img {
                  width: 40px;
                  height: 45px;
                  vertical-align: top;
                }
                span {
                  vertical-align: top;
                  display: inline-block;
                  height: 50px;
                  margin-left: 10px;
                  line-height: 50px;
                  color: #409eff;
                  cursor: pointer;
                }
                p {
                  line-height: 16px;
                  font-size: 12px;
                  color: #666;
                }
              }
              .prize_points {
                box-sizing: border-box;
                padding-left: 10px;
                padding-top: 16px;
                span {
                  vertical-align: top;
                  display: inline-block;
                  height: 28px;
                  margin-left: 10px;
                  line-height: 28px;
                  color: #409eff;
                  cursor: pointer;
                }
                p {
                  line-height: 18px;
                  font-size: 12px;
                  color: #666;
                }
              }
              .no_prize {
                box-sizing: border-box;
                padding-left: 10px;
                padding-top: 30px;
                span {
                  vertical-align: top;
                  display: inline-block;
                  height: 20px;
                  line-height: 20px;
                  color: #409eff;
                  cursor: pointer;
                }
                p {
                  line-height: 22px;
                  font-size: 12px;
                  color: #666;
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
