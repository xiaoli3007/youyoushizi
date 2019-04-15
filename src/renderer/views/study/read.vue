<template>
	<div>
		<read-task></read-task>
	</div>
</template>

<script>
	import ReadTask from '@/components/ReadTask'

	export default {
		data() {
			return {
				list: null,
			}
		},
		components: {
			ReadTask
		},
		filters: {

		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData() {

			}
		}
	}
</script>
