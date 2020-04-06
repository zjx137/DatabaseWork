<template>
  <div class="app-container">
      <h2 style="color:#606266">考核信息</h2>
        <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="staff_id"
      label="员工ID"
      >
    </el-table-column>    
    <el-table-column
      prop="date"
      label="考核日期"
      >
    </el-table-column>
    <el-table-column
      prop="eva_content"
      label="考核内容"
      >
    </el-table-column>
    <el-table-column
      prop="result"
      label="考核结果">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'


export default {

    created() {
        this.getList(localStorage.getItem('userId'))

    },

    data() {
        return {
            list:[]
        }
    },
    methods: {
        getList(staffid){
            console.log(staffid)
            axios.request({
                baseURL: 'http://127.0.0.1:8080',
                url: 'evaluation',
                params: {
                    staffid
                },
                method: 'get'
            }).then(res=>{
                console.log(res)
                if(res.data.data.length == 0){
                    this.$message({
                        type:'info',
                        message:'暂时没有考核哦'
                    })
                }
                else{
                    this.list = res.data.data
                }
            })
        }
    }

}
</script>

<style scoped>

</style>