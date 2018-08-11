<template lang="pug">
	#account
		el-card
			.clearfix(slot='header')
				span Benutzerkonto
			div
				AccountEdit
</template>


<script>
import AccountEdit from '@/components/AccountEdit.vue'

export default {
  name: 'account',
	components: {
		AccountEdit
	}
}
</script>
