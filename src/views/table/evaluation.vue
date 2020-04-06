<template>
    <div class="app-container">
        <el-table
        :data="list"
        style="width: 100%">
            <el-table-column
            prop="eva_id"
            label="考核号"
            >
            </el-table-column>
            <el-table-column
            prop="staff_id"
            label="员工号"
            >
            </el-table-column>
            <el-table-column
            prop="eva_content"
            label="考核内容"
            >
            </el-table-column>
            <el-table-column
            prop="date"
            label="日期"
            >
            </el-table-column>
            <el-table-column
            prop="result"
            label="考核结果"
            >
            </el-table-column>
            <el-table-column
            v-if="role == 1"
            label="操作"
            fixed="right"
            width="100">
                <template slot-scope="scope">
                    <el-button @click="reviseRow(scope.row)" type="text" size="small">更新结果</el-button>
                    <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>

                </template>
      
            </el-table-column>

        </el-table>
        <el-dialog
        title="考核信息"
        :visible.sync="dialogVisible"
        width="50%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="员工ID">
                    <el-col :span="21">
                    <el-input :disabled="true" v-model="form.staff_id"/>
                    </el-col>
                </el-form-item>
                <el-form-item label="考核内容">
                    <el-col :span="21">
                    <el-input :disabled="true" v-model="form.eva_content"/>
                    </el-col>
                </el-form-item>
                <el-form-item label="考核日期">
                    <el-col :span="21">
                    <el-date-picker :disabled="true" v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%;" />
                    </el-col>
                </el-form-item>
                <el-form-item label="考核结果">
                    <el-col :span="21">
                    <el-input v-model="form.result"/>
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

export default {
    

    data() {
        return {
            list: [],
            form: {},
            dialogVisible: false,
            role: localStorage.getItem("role")
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            let staffid = localStorage.getItem('userId')
            axios.request({
                baseURL: 'http://127.0.0.1:8080',
                url: '/evaluation',
                method: 'get'
            }).then(res=>{
                this.list = res.data.data
                console.log(this.list)
                

            })
        },
        deleteRow(row){
      let eva_id = row.eva_id;
      console.log(eva_id)
      axios.request({
        baseURL: 'http://127.0.0.1:8080',
        url:'/evaluation',
        params: {
          eva_id
        },
        method: 'delete'
      }).then(res=>{
        console.log(res)
        if(res.data.status == 200){
          for(let i=0;i<this.list.length;i++){
            if(this.list[i].eva_id == eva_id){
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
        reviseRow(row){
            this.form = row
            console.log(row)
            this.dialogVisible = true

        },
        handSubmit(){
            let eva_id = this.form.eva_id - 0
            let eva_result = this.form.result
            let data = {
                eva_id,
                eva_result
            }
            axios.request({
                baseURL: 'http://127.0.0.1:8080',
                url: '/evaluation',
                data,
                method: 'put'
            }).then(res=>{
                console.log(res)
                if(res.data.status == 200){
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                    this.dialogVisible = false
                }
            })
        }
    }

}
</script>

<style>

</style>