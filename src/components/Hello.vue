<template>
  <div class="hello">
    <el-row>
      <div class="cc">
        <el-col :span="5" class="fjh-nav">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>商家管理</template>
              <el-menu-item-group>
                <el-menu-item index="/add">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          
        </el-col>
        </div>
      <router-view></router-view>
    </el-row>
   
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>