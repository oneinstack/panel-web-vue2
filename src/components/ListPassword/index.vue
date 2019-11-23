<template>
  <span v-if="showPassword">
    {{ ListpassWord(password) }}
    <i class="el-input__icon el-icon-view el-input__clear" @click="showPassword = false" />

  </span>
  <span v-else>
    {{ password }}
    <i class="el-input__icon el-icon-view el-input__clear" @click="showPassword = true" />
  </span>
</template>

<script>
export default {
  name: 'ListPassword',
  props: {
    password: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showPassword: true
    }
  },
  methods: {
    ListpassWord(val) {
      const len = val.length
      let createPassword = ''
      for (let i = 0; i < len; i++) {
        const j = '*'
        createPassword += j
      }
      return createPassword
    }
  }
}
</script>

<style>
</style>
