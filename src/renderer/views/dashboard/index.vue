<template>
	<div class="dashboard-editor-container">
		
		<panel-group/>
		
		<el-row style="margin-bottom:32px;">
		  <line-chart :chart-data="lineChartData"/>
		</el-row>
		
		<el-row :gutter="32">
		  <el-col :xs="24" :sm="24" :lg="8">
		    <div class="chart-wrapper">
		      <raddar-chart/>
		    </div>
		  </el-col>
		  <el-col :xs="24" :sm="24" :lg="8">
		    <div class="chart-wrapper">
		      <pie-chart/>
		    </div>
		  </el-col>
		  <el-col :xs="24" :sm="24" :lg="8">
		    <div class="chart-wrapper">
		      <bar-chart/>
		    </div>
		  </el-col>
		</el-row>
		
	</div>

</template>

<script>
	import PanelGroup from './components/PanelGroup'
	import LineChart from './components/LineChart'
	import RaddarChart from './components/RaddarChart'
	import PieChart from './components/PieChart'
	import BarChart from './components/BarChart'
	
	const lineChartData = {
	  newVisitis: {
	    expectedData: [100, 120, 161, 134, 105, 160, 165],
	    actualData: [120, 82, 91, 154, 162, 140, 145]
	  }
	}
	
	import {
		mapGetters
	} from 'vuex'

	const localStorage = require('../../../main/localStorage').default

	export default {
		 components: {
		  PanelGroup,
		  LineChart,
		  RaddarChart,
		  PieChart,
		  BarChart,
		},
		data () {
		  return {
		    voice: localStorage.getItem('voice'),
			lineChartData: lineChartData.newVisitis
		  }
		},
		created() {
			// console.log(this.voice)
		},
		name: 'dashboard',
		computed: {
			...mapGetters([
				'name',
				'roles'
			])
		},
		methods: {
		  handleSetLineChartData(type) {
		    this.lineChartData = lineChartData[type]
		  }
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	
	
	.dashboard-editor-container {
	  padding: 32px;
	  // background-color: rgb(240, 242, 245);
	  .chart-wrapper {
	    background: #fff;
	    padding: 16px 16px 0;
	    margin-bottom: 32px;
	  }
	}
</style>
