<template>
  <div class="app-container">
      <el-table
      :data="list"
      style="width:90%;margin: 0 auto;">
        <el-table-column
      prop="id"
      label="部门ID"
        >
        </el-table-column>
        <el-table-column
      prop="name"
      label="部门"
        >
        </el-table-column>
        <el-table-column
      prop="head_person"
      label="主管"
        >
        </el-table-column>
        <el-table-column
        v-if="role == 1"
        label="操作"
        fixed="right">
            <template slot-scope="scope">
                <el-button @click="reviseRow(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>

            </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="部门信息"
        :visible.sync="dialogVisible"
        width="50%">
            <el-form ref="form" label-width="120px" :model="form">
                <el-form-item label="部门ID">
                    <el-col :span="20">
                    <el-input :disabled="true" v-model="form.id" />
                    </el-col>
                </el-form-item>
                <el-form-item label="名称">
                    <el-col :span="20">
                    <el-input v-model="form.name" />
                    </el-col>
                </el-form-item>
                <el-form-item label="主管">
                    <el-col :span="20">
                    <el-input v-model="form.head_person" />
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

const baseURL = 'http://127.0.0.1:8080'
const url = '/department'

export default {
    data() {
        return {
            list: [],
            form: {},
            dialogVisible: false,
            role: localStorage.getItem('role')
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData(){
            axios.request({
                baseURL,
                url,
                method: 'get'
            }).then(res=>{
                //console.log(res)
                this.list = res.data.data
                //console.log(this.list)
            })
        },
        reviseRow(row){
            this.form = row
            console.log('in')
            this.dialogVisible = true
        },
        deleteRow(row){
            this.form = row
            let id = this.form.id
            axios.request({
                baseURL,
                url,
                params: {
                    id,
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
                        type: 'success',
                        message: res.data.msg
                    })
                }
            })


        },
        handSubmit(){
            console.log(this.form)
            axios.request({
                baseURL,
                url,
                data:this.form,
                method:'put'
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

<style scoped>

</style>