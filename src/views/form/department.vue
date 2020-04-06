<template>
  <div class="app-container">
      <h3 v-if="role != 1">您无权访问</h3>
      <div class="form-container" v-if="role == 1">
      <h2 style="margin-left:100px">新增部门</h2>
      <el-form ref="form" :model="form" label-width="120px">
          <el-col :span="8" :offset="7">
          <el-form-item label="部门ID">
              <el-col>
              <el-input v-model="form.id" placeholder="例如：10000" />
              </el-col>
          </el-form-item>

          <el-form-item label="部门名称">
             
              <el-input v-model="form.name"  />
              
          </el-form-item>
          <el-form-item label="主管">
              
              <el-input v-model="form.head_person" />
              
          </el-form-item>
          
          <el-form-item style="margin-top:30px;">
                <el-col :offset="6">
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

const baseURL = 'http://127.0.0.1:8080'
const url = '/department'

export default {
    data() {
        return {
            role: localStorage.getItem('role'),
            form: {
                id: '',
                name: '',
                head_person: '',
            }

        }
    },
 
    methods: {
        onSubmit(){
            console.log(this.form)
            axios.request({
                baseURL,
                url,
                data:this.form,
                method: 'post'
            }).then(res=>{
                console.log(res)
                if(res.data.status == 200){
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                    this.form = {
                id: '',
                name: '',
                head_person: '',
            }
                }
            })
        },
        onCancel(){

        }
    }

}
</script>

<style scoped>
.form-container{
    padding: 0 20px;
}
</style>