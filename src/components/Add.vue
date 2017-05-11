<template>
    <div class="add">
        <el-row>
            <el-col :span="19">
                <div class="fjh-search">
                    <div class="fjh-search-box">
                        <el-input placeholder="请输入内容"></el-input>
                    </div>
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary" @click="dialogFormVisible = true">增加</el-button>
                </div>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="name" label="名称" width="180">
                    </el-table-column>
                    <el-table-column prop="classList" label="类型">
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="180">
                    </el-table-column>
    
                </el-table>
                <!--增加界面-->
                <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
                    <el-form :model="addForm">
                        <el-form-item label="商品名称" :label-width="formLabelWidth">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品类型" :label-width="formLabelWidth">
                            <el-select v-model="addForm.listClass" placeholder="请选择商品类型">
                                <el-option label="米饭" value="米饭"></el-option>
                                <el-option label="面食" value="面食"></el-option>
                                <el-option label="零食商品" value="零食商品"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单价（元）" :label-width="formLabelWidth">
                            <el-input v-model="addForm.price" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addList">确 定</el-button>
                    </div>
                </el-dialog>
    
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data () {
     return {
         dialogFormVisible: false,
         formLabelWidth: '120px',
         addForm: {
          name: '',
          price: '',
          listClass:''
        },
        tableData: [{
          price: '2016-05-02',
          name: '王小虎',
          classList: '上海市普陀区金沙江路 1518 弄'
        }, {
          price: '2016-05-04',
          name: '王小虎',
          classList: '上海市普陀区金沙江路 1517 弄'
        }, {
          price: '2016-05-01',
          name: '王小虎',
          classList: '上海市普陀区金沙江路 1519 弄'
        }, {
          price: '2016-05-03',
          name: '王小虎',
          classList: '上海市普陀区金沙江路 1516 弄'
        }]
      }

  },
  methods:{
      addList:function(){
          console.log(this.id)
          this.dialogFormVisible = false
          var name=this.addForm.name;
          var price=this.addForm.price;
          var classList=this.addForm.listClass;
          var data={
              name:name,
              price:price,
              classList:classList,
              
          }
          console.log(data)
          $.ajax({
              url:'http://127.0.0.1:3000/addlist',
              type:'GET',
              dataType:'json',
              data:data,
              success:function(data){
                  console.log(data.tips)
              },
              error:function(){
                  console.log('err')
              }
          })
      }
  }
 
}
</script>
<style>
.fjh-search {
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 30px;
}

.fjh-search-box {
    width: 200px;
    float: left;
    margin-right: 30px;
}
</style>