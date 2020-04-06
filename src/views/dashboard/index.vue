<template>
  <div class="dashboard-container">
    <div class="admin-board">
      <div class="card-box">

      
      <el-row :gutter="20">
        <el-col :span="6">
        <el-card  style="background-color:#409EFF;color:#FFFFFF" shadow="always">
          <i class="el-icon-user-solid"></i><span style="margin-left:10px">用户数：{{ staff_count }}</span>
        </el-card>
        </el-col>
        <el-col :span="6">
        <el-card  style="background-color:#3BB5C4;color:#FFFFFF" shadow="always">
          <i class="el-icon-office-building"></i><span style="margin-left:10px">部门数：{{ department_count }}</span>
        </el-card>
        </el-col>
        <el-col :span="6">
        <el-card id="sign-card" shadow="always">
          <i class="el-icon-circle-check"></i><span style="margin-left:10px">当月签到次数：{{sign_count}}</span>
        </el-card>
        </el-col>

        
      </el-row>
      </div>
      <ve-histogram v-if="role == 1" style="width:100%" :data="chartData"></ve-histogram>
      <p v-if="role == 1" style="text-align:center;color:#909399;font-size:14px;margin-top:-46px;">近30天内用户签到情况</p>
    </div>
    
    <el-card v-if="role != 1" class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:20px;">个人信息</span>
        <el-button v-if="!signed" style="float: right; padding: 3px 0" type="text" @click="sign()">签到</el-button>
        <span v-if="signed" style="float: right; padding: 3px 0;font-size:14px">已签到</span>
      </div>
      <div class="info-item">
          <i class="el-icon-user-solid"></i> ID : {{ userinfo.id }}
      </div>
      <div class="info-item">
          <i class="el-icon-user"></i> 姓名 : {{ userinfo.name }}
      </div>
      <div class="info-item">
          <i class="el-icon-male" style="font-size:16px" ></i><i class="el-icon-female" style="font-size:16px"></i> 性别 : {{ userinfo.sex }}
      </div>
      <div class="info-item">
          <i class="el-icon-timer"></i> 年龄 : {{ userinfo.age }}
      </div>
      <div class="info-item">
          <i class="el-icon-notebook-1"></i> 学历 : {{ userinfo.education }}
      </div>
      <div class="info-item">
          <i class="el-icon-office-building"></i> 部门 : {{ userinfo.department }}
      </div>
      <div class="info-item">
          <i class="el-icon-suitcase"></i> 职位 : {{ userinfo.position }}
      </div>
      <div class="info-item">
          <i class="el-icon-coin"></i> 薪水 : {{ userinfo.salary }}
      </div>
      <div class="info-item">
          <i class="el-icon-medal"></i> 考核等级 : {{ userinfo.exam_level }}
      </div>
      <div class="info-item">
          <i class="el-icon-trophy"></i> 奖金 : {{ userinfo.awards }}
      </div>
      <div class="info-item">
          <i class="el-icon-date"></i> 入职时间 : {{ userinfo.enter_time }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { strToDate,getDay,compare_time } from '@/utils/index'
const baseURL = 'http://127.0.0.1:8080'


export default {
  name: 'Dashboard',
  components: {
  
  },
  created(){
    this.getInfo(localStorage.getItem("userId"))
    this.getStaffCount()
    this.getDepCount()
    this.getSign(30)
    
    //console.log('oo')
  },
  data(){
    return {
      userinfo:{},
      role: localStorage.getItem('role'),
      signed: false,
      staff_count: 0,
      department_count: 0,
      sign_count:0,
      chartData: {
          columns: ['date', '签到用户'],
          rows: []
        }
       
    }
  },
  methods: {
    getInfo(id){
      //console.log(this.userinfo)
      axios.request({
        baseURL:'http://127.0.0.1:8080',
        url:'/staffinfo',
        params:{
          'account':localStorage.getItem('userId')
        },
        method:'get'
      }).then(res=>{
        //console.log(res)
        this.userinfo = res.data.data
        //console.log(this.userinfo)
      })
      if(this.role != 1){

      
      axios.request({
        baseURL: 'http://127.0.0.1:8080',
        url: '/attendance',
        params:{
          'staffid':id
        },
        method: 'get'
      }).then(res=>{
          //console.log(res)
          let date = new Date()
          let year = date.getFullYear()
          let month = date.getMonth()+1
          let day = date.getDate()
          let sign_list = res.data.data;
          //console.log(year)

          let sorted = sign_list.filter(obj=>{
              console.log(obj.time.split('-')[0] == year)
              return (obj.time.split('-')[0] == year) && (obj.time.split('-')[1] == month)
          })
          //console.log(sorted)
          this.sign_count = sorted.length
          let card = document.getElementById("sign-card")
          var flag;
          let sign_res = (this.sign_count/day)
          if( sign_res < 0.6){
            this.$message({
              type: 'warning',
              message: '当月签到次数过少，注意考勤！'
            })
            card.style.backgroundColor = '#F56C6C'
            card.style.color = '#FFFFFF'
          }
          else if(sign_res < 0.8){
            this.$message({
              type: 'info',
              message: '当月考勤情况良好'
            })
            card.style.backgroundColor = '#909399'
            card.style.color = '#FFFFFF'
          }
          else{
            this.$message({
              type: 'success',
              message: '当月情况优秀'
            })
            card.style.backgroundColor = '#67C23A'
            card.style.color = '#FFFFFF'
          }

      })}

    },
    getStaffCount(){
      axios.request({
        baseURL,
        url:'/staff',
        method: 'get'
      }).then(res=>{
        this.staff_count = res.data.data.length
      })
    },
    getDepCount(){
      axios.request({
        baseURL,
        url:'/department',
        method: 'get'
      }).then(res=>{
        this.department_count = res.data.data.length
      })
    },
    getSign(n){
      let list = []
        for(let i=0;i<n;i++){
          this.getDayCount(getDay(-i)).then(res=>{
            let num = res.data.data
            let str = getDay(-i)
            let o = {
              'date': str,
              '签到用户':num
            }
            //console.log(o)
            list.push(o)
            list = list.sort(compare_time)
          })
        }
      
      this.chartData.rows = list
      
      
    },
    getDayCount(time){
      return axios.request({
        baseURL,
        url: '/attendance_chart',
        params: {
          time
        },
        method:'get'
      })

    },
    sign(){
      let date = strToDate(new Date() + "")
      //console.log(date)
      
      axios.request({
        baseURL: 'http://127.0.0.1:8080',
        url: '/attendance',
        data: {
          'staffid':this.userinfo.id,
          'time': date
        },
        method: 'post'
      }).then(res=>{
        //console.log(res)
        if(res.data.status == 200){
          this.$message({
            type:'success',
            message:res.data.msg
          })
          this.signed = true
          this.sign_count += 1
        }
        else{
          this.$message({
            type:'warning',
            message:'今天'+res.data.msg
          })
          this.signed = true
        }
      })
      
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.info-item{
  font-size: 20px;
  margin-left: 15px;
  margin-bottom: 15px;
}
.card-body{
  padding: 0 1.25rem 1.25rem;
  flex: 1 1 auto;
  overflow-x: hidden;
}
.admin-board p{
  margin: 0;
  
}
.admin-board {
  margin-bottom: 20px;
}
.echarts {
        width: 500px;
        height: 200px;
    }
    .card-box{
      margin-bottom: 15px;
    }
</style>
