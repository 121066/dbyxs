<template>
  <div class="address-container">
    <el-select v-model="addressDetail.province" placeholder="请选择省" @change="handleChange1">
      <el-option v-for="item in options1" :key="item.id" :label="item.label" :value="item.label"></el-option>
    </el-select>&nbsp;&nbsp;
    <el-select v-model="addressDetail.city" placeholder="请选择市" @change="handleChange2">
      <el-option v-for="item in options2" :key="item.id" :label="item.label" :value="item.label"></el-option>
    </el-select>&nbsp;&nbsp;
    <el-select v-model="addressDetail.area" placeholder="请选择区">
      <el-option v-for="item in options3" :key="item.id" :label="item.label" :value="item.label"></el-option>
    </el-select>
  </div>
</template>


<script>
// import {mapState} from 'vuex'
import { province, citys, areas } from "../api/getData.js";
export default {
  data() {
    return {
      options1: [],
      options2: [],
      options3: []
    };
  },
  // props:['province','city','area'],
  created() {
    this.handleChange();
  },
  methods: {
    handleChange(father = -1, level = 1) {
      province(father, level).then(result => {
        if (result.data.status == 0) {
          result.data.data.forEach(item => {
            this.options1.push({
              label: item.name,
              id: item.id
            });
          });
          if (this.addressDetail.city) {
            new Promise((resolve, reject) => {
              this.get_citys();
              resolve();
            }).then(() => {
              setTimeout(() => {
                this.get_areas();
              }, 100);
            });
          }
        }
      });
    },

    handleChange1() {
      this.options2 = [];
      this.options3 = [];
      this.addressDetail.city = "";
      this.addressDetail.area = "";
      this.get_citys();
    },
    get_citys() {
      let id = "";
      this.options1.forEach(item => {
        if (item.label == this.addressDetail.province) {
          return (id = item.id);
        }
      });
      citys(id).then(result => {
        if (result.data.status == 0) {
          result.data.data.forEach(item => {
            this.options2.push({
              label: item.name,
              id: item.id
            });
          });
        }
      });
    },
    handleChange2() {
      this.options3 = [];
      this.addressDetail.area = "";
      this.get_areas();
    },
    get_areas() {
      let id = "";
      this.options2.forEach(item => {
        if (item.label == this.addressDetail.city) {
          return (id = item.id);
        }
      });
      areas(id).then(result => {
        if (result.data.status == 0) {
          result.data.data.forEach(item => {
            this.options3.push({
              label: item.name,
              id: item.id
            });
          });
        }
      });
    }
  },
  computed: {
    addressDetail() {
      return this.$store.state.addressDetail;
    }
  }
};
</script>


<style lang="less">
.address-container {
  color: #666;
  width: 450px;
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .el-select {
    width: 100px;
    .el-input.el-input--suffix {
      width: 100px;
      .el-input__inner {
        width: 100px;
      }
    }
  }
}
</style>

