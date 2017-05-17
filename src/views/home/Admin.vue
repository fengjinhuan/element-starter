<template>
    <div class="admin">
        <h2 class="fjh-tag">111</h2>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input placeholder="请输入具体商品名字" v-model="filters.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getListById">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--商品列表-->
        <el-table :data="listData" stripe style="width: 100%">  
            <el-table-column prop="name" label="名称" width="200" sortable>
            </el-table-column>
            <el-table-column prop="type" label="分类" width="200" sortable>
            </el-table-column>
            <el-table-column prop="price" label="单价(元)" width="200" sortable>
            </el-table-column>
            <el-table-column prop="date" label="时间" width="200" sortable>
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template scope="scope">
                    <el-button size="small" :disabled="true">编辑</el-button>
                    <el-button type="danger" size="small" @click="del(scope)">删除</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
                <el-form-item label="商品名字" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入商品名字"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-radio-group v-model="addForm.lists">
                        <el-radio class="radio" :label="0">米饭</el-radio>
                        <el-radio class="radio" :label="1">面食</el-radio>
                        <el-radio class="radio" :label="2">零食</el-radio>
                        <el-radio class="radio" :label="3">香烟</el-radio>
                        <el-radio class="radio" :label="4">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品单价(元)" prop="checkPrice">
                    <el-input-number v-model="addForm.price" :min="0.5" :max="100"></el-input-number>
                </el-form-item>
    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default{
    data(){   
        var checkPrice = (rule, value, callback) => {
        if (this.addForm.price===0) {
          return callback(new Error('请输入价格  如:2.5 如:2;点为英文下的点' ));
        }else if(!/^\d{1,2}\.?[5]?$/.test(this.addForm.price)){
             return callback(new Error('上限为100哟~~如有角单位须为5,点为英文下的点' ))
        }
        else {
              callback();
            }
      };

        return {
        filters: {
                name: ''//查询指定名字
            },
        id:'',     
        chackEatType:["米饭",'面食','零食','香烟','其他'],
        addLoading: false,//新增页面加载
        addFormVisible: false,//新增界面是否显示
        //新增界面数据
				addForm: {
					name: '',
					listClass: 0,
					price:0,
					
				},
        // 新增界面规则
                addFormRules: {
					name: [
						{ required: true, message: '请输入商品名字', trigger: 'blur' }
					],
                    checkPrice:[
                        {validator: checkPrice,  trigger: 'blur' }
                    ]
				},
        listData: []

    }
 },
methods:{
        // 编辑商品
        // edit(s){
        //     var _this=this;
        //     var data={
        //                 userName:localStorage.getItem("name"),
        //                 name:s.row.name,
        //                 price:s.row.price,
        //                 type:s.row.type
        //             }
        //     console.log(data)
        //     $.ajax({
        //                 url:'http://127.0.0.1:3000/user/edit',
        //                 data:data,
        //                 dataType:'json',
        //                 type:'GET',
        //                 success:function(data){
        //                     console.log(data.tips)
        //                 },
        //                 error:function(){
        //                     console.log('err')
        //                 }
        //             })
        // },
        // 删除商品
        del(s){
            
            var _this=this;
            var data={
                        userName:localStorage.getItem("name"),
                        name:s.row.name,
                        price:s.row.price,
                        type:s.row.type
                    }
            this.$confirm('名字：'+data.name+'，价格：'+data.price+'元，类型：'+data.type, '确认删除吗？', {}).then(() => {
                    $.ajax({
                        url:'http://127.0.0.1:3000/user/dellist',
                        data:data,
                        dataType:'json',
                        type:'GET',
                        success:function(data){
                            if(data.tips){
                                 _this.$notify.success({
                                    title: '删除成功',
                                    message: '你已删除这个商品',
                                    type:'success',
                                    duration:3000,
                                    offset:300
                                });
                               _this.listData=data.arr
                            }
                        },
                        error:function(){
                            console.log('err')
                        }
                    })
            }).catch(()=>{
                    });
            

        },
        // 查询菜品
        getListById(){
            var _this=this;
            var list={
              name:this.filters.name,
              listId:this.id,
            };
            $.ajax({
                data:list,
                type:'GET',
                dataType:'json',
                url:'http://127.0.0.1:3000/user/getListById',
                success:function(data){
                    
                    _this.listData=data.tips;
                },
                error:function(){
                    _this.listData=[];
                }
            })
        },
        //显示新增界面
		handleAdd: function () {
			this.addFormVisible = true;
            this.addForm = {
					name: '',
					lists: 0,
					price: 0,
				
			};
		},
            // 新增提交按钮
        addSubmit: function () {
            var _this=this;
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    var date=new Date();
                    var month=date.getMonth()+1
                    var data={
                            name:this.addForm.name,
                            lists:this.chackEatType[this.addForm.lists],
                            price:this.addForm.price.toFixed(1),
                            id:this.id,
                            time:date.getFullYear()+'-'+month+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes(),
                            listId:this.listData.length
                        };                
                    this.$confirm('名字：'+data.name+'，价格：'+data.price+'元，类型：'+data.lists, '确认提交吗？', {}).then(() => {    
                        this.addLoading = true;
                        $.ajax({
                            type:'GET',
                            dataType:'json',
                            url:'http://127.0.0.1:3000/user/add',
                            data:data,
                            success:function(data){
                                if(data.tips){
                                    _this.addLoading = false;
                                    _this.listData.unshift(data.arr)
                                    _this.addFormVisible=false
                                }
                            },
                            error:function(){
                    
                            }
                        })
                    }).catch(()=>{
                    });
                }
            });
        },
},
mounted(){
    var _this=this;
    this.id=localStorage.getItem("id");
    //请求加载数据
    $.ajax({
        type:'GET',
        dataType:'json',
        data:{
            id:this.id
        },
        url:'http://127.0.0.1:3000/user/admin',
        success:function(data){
            _this.listData=data.inside;
        },
        error:function(){
            
        }
    })
     
  
    
}  
   
}
</script>
<style scoped>
.fjh-tag {
    line-height: 50px;
}

.admin {}

.toolbar {
    padding-left: 20px;
    padding-top: 20px;
    background: #F2F2F2;
    margin-bottom: 20px;
}
</style>