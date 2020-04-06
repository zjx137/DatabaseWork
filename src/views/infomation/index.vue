<template>
  <div class="app-container">
      <h2>信息查询</h2>
      <div class="price-container">
          <el-tabs :tab-position="tabPosition" style="height: 200px;">
          <el-tab-pane label="奖金查询">
              <el-col :span="4">
              <el-input v-model="price_form.min_p" placeholder="最低奖金" />
              </el-col>
              <el-col :span="4">
              <el-input v-model="price_form.max_p" style="margin-left:10px" placeholder="最高奖金" />
              </el-col>
              <el-button icon="el-icon-search" style="margin-left:20px" @click="priceSubmit()" circle></el-button>
              <el-table
              :data="price_list">
              <el-table-column
              prop="name"
              label="姓名">
              </el-table-column>
              <el-table-column
              prop="education"
              label="学历">
              </el-table-column>
              <el-table-column
              prop="department"
              label="部门">
              </el-table-column>
              <el-table-column
              prop="position"
              label="职位">
              </el-table-column>
              <el-table-column
              prop="awards"
              label="奖金">
              </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="考核等级">
              <el-col :span="4">
              <el-input v-model="exam_level" placeholder="考核等级" />
              </el-col>
              <el-button icon="el-icon-search" style="margin-left:20px" @click="examSubmit()" circle></el-button>
                <el-table
              :data="exam_list">
              <el-table-column
              prop="name"
              label="姓名">
              </el-table-column>
              <el-table-column
              prop="education"
              label="学历">
              </el-table-column>
              <el-table-column
              prop="department"
              label="部门">
              </el-table-column>
              <el-table-column
              prop="position"
              label="职位">
              </el-table-column>
              <el-table-column
              prop="exam_level"
              label="考核等级">
              </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="职位查询">
              <el-col :span="4">
              <el-input v-model="position" placeholder="职位名称" />
              </el-col>
              <el-button icon="el-icon-search" style="margin-left:20px" @click="posSubmit()" circle></el-button>
              <el-table
              :data="pos_list">
              <el-table-column
              prop="name"
              label="姓名">
              </el-table-column>
              <el-table-column
              prop="education"
              label="学历">
              </el-table-column>
              <el-table-column
              prop="department"
              label="部门">
              </el-table-column>
              <el-table-column
              prop="position"
              label="职位">
              </el-table-column>
              </el-table>
          </el-tab-pane>
         
          </el-tabs>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const baseURL = 'http://127.0.0.1:8080'
const url1 = '/price_query'
const url2 = '/position_query'
const url3 = '/exam_query'

export default {
    data() {
        return {
            tabPosition: 'right',
            price_form:{
                min_p: '',
                max_p: ''
            },
            price_list: [],
            position: '',
            pos_list: [],
            exam_level: '',
            exam_list: []

        }
    },
    methods: {
        priceSubmit(){
            this.price_form.min_p = (!!this.price_form.min_p)?this.price_form.min_p:'0'
            this.price_form.max_p = (!!this.price_form.max_p)?this.price_form.max_p:'999999999'
            //console.log(this.price_form)
            let params = this.price_form
            axios.request({
                baseURL,
                url:url1,
                params,
                method: 'get'
            }).then(res=>{
                //console.log(res)
                
                if(res.data.status == 200){
                    this.price_list = res.data.data
                    this.$message({
                        type:'success',
                        message:res.data.msg
                    })
                }
                
            })
        },
        posSubmit(){
            let position = this.position
            axios.request({
                baseURL,
                url: url2,
                params: {
                    position,
                },
                method: 'get'
            }).then(res=>{
              
                if(res.data.status == 200){
                    this.pos_list = res.data.data
                    this.$message({
                        type:'success',
                        message:res.data.msg
                    })
                }
            })
        },
        examSubmit(){
            let exam_level = this.exam_level
            console.log(this.position)
            axios.request({
                baseURL,
                url:url3,
                params:{
                    exam_level
                },
                method: 'get'
            }).then(res=>{
                if(res.data.status == 200){
                    this.exam_list = res.data.data
                    this.$message({
                        type:'success',
                        message:res.data.msg
                    })
                }
                
            })
        }
    }

}
</script>

<style>

</style>