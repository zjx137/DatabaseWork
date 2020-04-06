<template>

  <div class="app-container">
    <h2 style="margin-left:120px;">新增员工信息</h2>
    <h3 v-if="role != 1" >您无权访问</h3>
    <el-form v-if="role == 1" ref="form" :model="form" label-width="120px">
      <el-col :span="16" :offset="7">
      <el-form-item label="员工ID">
        <el-col :span="12">
        <el-input v-model="form.id" />
        </el-col>
      </el-form-item>
      <el-form-item label="姓名">
        <el-col :span="12">
        <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="form.role">
          <el-option label="员工" value='0' />
          <el-option label="管理员" value='1' />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" value="男" />
          <el-radio label="女" value="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="form.education" placeholder="please select your zone">
          <el-option label="高中及其以下" value="高中及其以下" />
          <el-option label="本科" value="本科" />
          <el-option label="研究生" value="研究生"/>
          <el-option label="博士及其以上" value="博士及其以上"/>
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="form.department" placeholder="please select your department">
          <el-option label="人事部" value="10000" />
          <el-option label="生产部" value="10001" />
          <el-option label="销售部" value="10002" />
          <el-option label="开发部" value="10003" />
          <el-option label="采购部" value="10004" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-col :span="12">
        <el-input v-model="form.age" />
        </el-col>
      </el-form-item>
      <el-form-item label="职位">
        <el-col :span="12">
        <el-input v-model="form.position" />
        </el-col>
      </el-form-item>
      <el-form-item label="薪酬">
        <el-col :span="12">
        <el-input v-model="form.salary" />
        </el-col>
      </el-form-item>
      <el-form-item label="考核等级">
        <el-col :span="12">
        <el-input v-model="form.eaxm_level" />
        </el-col>
      </el-form-item>
      <el-form-item label="奖金">
        <el-col :span="12">
        <el-input v-model="form.awards" />
        </el-col>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-col :span="11">
          <el-date-picker v-model="form.enter_time" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>     
      </el-form-item>

      <el-form-item>
        <el-col :offset="3">
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
        </el-col>
      </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import {strToDate,strToNum} from '@/utils/index'
import axios from 'axios'

export default {
  data() {
    return {
      role: localStorage.getItem('role'),
      form: {
        id: '',
        name: '',
        role: '0',
        sex: '男',
        education: '高中及其以下',
        department: '10000',
        age: 0,
        position: '',
        salary: 0,
        exam_level: 0,
        awards: 0,
        enter_time: '',


      }
    }
  },
  methods: {
    onSubmit() {
      
      this.form.enter_time = strToDate(this.form.enter_time)
      this.form.age = strToNum(this.form.age)
      this.form.salary = strToNum(this.form.salary)
      this.form.exam_level = strToNum(this.form.exam_level)
      this.form.awards = strToNum(this.form.awards)
      this.form.role = strToNum(this.form.role)

      axios.request({
        baseURL: 'http://127.0.0.1:8080',
        url: 'staffinfo',
        data: this.form,
        method: 'post'
      }).then(res=>{
        console.log(res)
        this.$message({
          showClose: true,
          type: 'success',
          message: '创建成功'
        })
      }).catch(err=>{
        this.$message({
          showClose: true,
          type: 'error',
          message: '创建失败'
        })
      })

      console.log(this.form)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.app-container{
  padding: 20px 150px;
}
</style>

