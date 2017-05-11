<template>
	<div id="app">
			<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	}
}

</script>

<style>
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}
*{
  padding: 0;
  margin: 0;
  border: none;
  list-style: none;
  text-decoration: none;
  
}
#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}


</style>