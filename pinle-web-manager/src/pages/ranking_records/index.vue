<template >
  <div class="ranking_records-container">
    <breadcrumb style="position: absolute;width:100%;"></breadcrumb>
    <div class="content">
      <div class="query">
        <div class="margin_right_20">
            期数:&nbsp;
          <el-input v-model="number" placeholder="请输入期数" style="width:100px;height:30px;"></el-input>
        </div>
                <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="get_rankingList_records(1)">查询</el-button>

        </div>
      </div>


      <div class="table">
        <el-table :data="records_list" style="width: 100%" height="548">
          <el-table-column prop="number" label="期数"></el-table-column>
          <el-table-column prop="username" label="用户名称"></el-table-column>
          <el-table-column prop="ranking" label="名次"></el-table-column>
          <el-table-column prop="amount" label="消费金额">

          </el-table-column>
          <el-table-column  label="奖品">
                            <template slot-scope="scope">
                  <img :src="scope.row. picture" alt="" style="width: 20px;height: 20px;"><span>{{scope.row.shortName}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="openTime" label="开奖时间"></el-table-column>
        </el-table>
        <pagination :currentPage="currentPage" :page="page" :total="total"  :pageSize="pageSize" @change-current="currentChange" @change-size="sizeChange"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import breadcrumb from "../../components/breadcrumb";
import pagination from '../../components/page'
import {ranking_records_list} from '../../api/getData'
export default {
  components: { breadcrumb,pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      total:0,
        records_list:[],
        number:'',
    };
  },
  created() {

    // this.get_bannerList();

    this.get_rankingList_records();
    // 获取商品类型

  },
  methods: {


    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.get_rankingList_records();
    },
    currentChange(val) {
      this.currentPage = val;
      this.get_rankingList_records();
    },
    get_rankingList_records(currentPage){
        if(currentPage){
            this.currentPage = currentPage
        }
        let data = 'number=' + this.number + '&size=' + this.pageSize + '&current=' + this.currentPage
        ranking_records_list(data).then(res => {
            if(res.data.status == 0 && res.data.data.records.length != 0){
                this.total = res.data.data.total
                this.page = Math.ceil(this.total / this.pageSize)
                this.records_list = res.data.data.records
            }
        })


    }

  },

};
</script>

<style lang="less" >
.ranking_records-container {
  @import "../../style/table.less";
  @import "../../style/content.less";
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
    .el-table__row > td {
    height: 50px;
    }
  .content {
    .query {
      .btn {
        .el-button {
          width: 70px;
        }
      }
    }
    .el-table__row{
      td:nth-of-type(5){
            .cell{
              img{
                vertical-align: top;
                margin-right: 5px;
              }

    }
      }
    }

  }
}
</style>

