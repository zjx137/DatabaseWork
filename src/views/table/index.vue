<template>
  <div class="app-container">
    <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="姓名"
      width="80">
    </el-table-column>
    <el-table-column
      prop="id"
      label="ID"
      >
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      >
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      >
    </el-table-column>
    <el-table-column
      prop="education"
      label="学历"
      >
    </el-table-column>
    <el-table-column
      prop="department"
      label="部门"
      width="120">
    </el-table-column>
    <el-table-column
      prop="position"
      label="职位"
      >
    </el-table-column>
    <el-table-column
      prop="salary"
      label="薪水"
      >
    </el-table-column>
    <el-table-column
      prop="exam_level"
      label="考核等级"
      >
    </el-table-column>
    <el-table-column
      prop="awards"
      label="奖金"
      >
    </el-table-column>
    <el-table-column
      prop="enter_time"
      label="入职时间"
      >
    </el-table-column>
    <el-table-column
      v-if="role == 1"
      label="操作"
      fixed="right"
      width="100">
      <template slot-scope="scope">
        <el-button @click="reviseRow(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>

      </template>
      
    </el-table-column>
    </el-table>
    <el-dialog
        title="个人信息"
        :visible.sync="dialogVisible"
        width="50%"
      >
    <el-form ref="form" :model="form" label-width="120px">
      
      <el-form-item label="员工ID">
        <el-col :span="21">
        <el-input v-model="form.id" />
        </el-col>
      </el-form-item>
      <el-form-item label="姓名">
        <el-col :span="21">
        <el-input v-model="form.name" />
        </el-col>
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
        <el-col :span="21">
        <el-input v-model="form.age" />
        </el-col>
      </el-form-item>
      <el-form-item label="职位">
        <el-col :span="21">
        <el-input v-model="form.position" />
        </el-col>
      </el-form-item>
      <el-form-item label="薪酬">
        <el-col :span="21">
        <el-input v-model="form.salary" />
        </el-col>
      </el-form-item>
      <el-form-item label="考核等级">
        <el-col :span="12">
        <el-input v-model="form.exam_level" />
        </el-col>
      </el-form-item>
      <el-form-item label="奖金">
        <el-col :span="21">
        <el-input v-model="form.awards" />
        </el-col>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-col :span="21">
          <el-date-picker v-model="form.enter_time" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>     
      </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handSubmit()">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { strToNum,strToDate } from '@/utils/index'

export default {

  data() {
    return {
      role: localStorage.getItem('role'),
      list: [],
      form: {},
      dialogVisible: false,

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.request({
        baseURL: 'http://127.0.0.1:8080',
        url: '/staff',
        method: 'get'
      }).then(res=>{
        
        this.list = res.data.data
        console.log(this.list)
      })

    },
    reviseRow(row){
      
      this.form = row;
      console.log(this.form)
      this.dialogVisible = true
    },
    deleteRow(row){
      let id = row.id;
      axios.request({
        baseURL: 'http://127.0.0.1:8080',
        url:'/staff',
        params: {
          id
        },
        method: 'delete'
      }).then(res=>{
        console.log(res)
        if(res.data.status == 200){
          for(let i=0;i<this.list.length;i++){
            if(this.list[i].id == id){
              this.list.splice(i,1)
              break
            }
          }
          this.$message({
            type:'success',
            message:res.data.msg
          })
        }
        else{
          this.$message({
            type:'error',
            message:'删除失败'
          })          
        }
      })
    },
    handSubmit(){
      this.form.enter_time = strToDate(this.form.enter_time)
      this.form.age = strToNum(this.form.age)
      this.form.salary = strToNum(this.form.salary)
      this.form.exam_level = strToNum(this.form.exam_level)
      this.form.awards = strToNum(this.form.awards)
      axios.request({
        baseURL: 'http://127.0.0.1:8080',
        url: '/staff',
        data: this.form,
        method: 'post'
      }).then(res=>{
        console.log(res)
        if(res.data.status == 200){
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
        this.dialogVisible = false;
      })
    }
  }
}
</script>
