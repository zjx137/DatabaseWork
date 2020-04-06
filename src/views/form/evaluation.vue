<template>
  <div class="app-container">
      <h3 v-if="role!=1">您无权访问</h3>
      <div class="form-container" v-if="role == 1">
      <h2>新增考核</h2>
      <el-form ref="form" :model="form" label-width="100px">
          <el-col :span="16" :offset="7">
            <el-form-item label="员工ID">
                <el-col :span="12">
                    <el-input v-model="form.staffid" placeholder="例如：10000" />
                </el-col>
            </el-form-item>
            <el-form-item label="考核内容">
                <el-col :span="12">
                <el-input v-model="form.content" placeholder="" />
                </el-col>
            </el-form-item>
            <el-form-item label="考核时间">
                <el-col :span="12">
                <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%;" />
                </el-col>
            </el-form-item>
            <el-form-item style="margin-top:40px;">
                <el-col :offset="3">
                <el-button type="primary" @click="onSubmit">创建</el-button>
                <el-button @click="onCancel">取消</el-button>
                </el-col>
            </el-form-item>

          </el-col>
      </el-form>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {strToDate} from '@/utils/index'

export default {
    data() {
        return {
            role: localStorage.getItem('role'),
            form:{
                staffid: '',
                date: '',
                content: '',
            }
        }
    },
    methods: {
        onSubmit(){
            this.form.date = strToDate(this.form.date)
            console.log(this.form)
            axios.request({
                baseURL:'http://127.0.0.1:8080',
                url:'/evaluation',
                data:this.form,
                method:'post'
            }).then(res=>{
                console.log(res)
                if(res.data.status == 200){
                    this.$message({
                    type: 'success',
                    message: '添加成功',
                    showClose: true
                    })
                    this.form = {
                staffid: '',
                date: '',
                content: '',
            }
                }
                else{
                    this.$message({
                    type: 'warning',
                    message: 'ID错误',
                    showClose: true
                    })                    
                }
            }).catch(err=>{
                this.$message({
                    type: 'error',
                    message: '添加失败',
                    showClose: true

                })
            })
        },
        onCancel(){

        }
    }
}
</script>

<style scoped>
.app-container{
  padding: 20px 150px;
}
</style>

