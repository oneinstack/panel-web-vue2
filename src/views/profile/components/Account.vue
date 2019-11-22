<template>
  <el-form
    ref="dataForm"
    :element-loading-text="$t('table.loading')"
    element-loading-background="rgba(255,255,255,0.7)"
    :rules="rules"
    :model="user"
    label-position="right"
    label-width="100px"
    style="width: 400px"
  >
    <el-form-item
      :label="$t('table.username')"
      prop="username"
    >
      <el-input v-model.trim="user.username" />
    </el-form-item>

    <el-form-item
      :label="$t('table.password')"
      prop="password"
    >
      <el-input
        v-model.trim="user.password"
        show-password
      />
    </el-form-item>

    <el-form-item
      :label="$t('table.email')"
      prop="email"
    >
      <el-input v-model.trim="user.email" />
    </el-form-item>

    <el-form-item :label="$t('table.phone')">
      <el-input v-model.trim="user.phone" />
    </el-form-item>

    <el-form-item :label="$t('table.comment')">
      <el-input
        v-model.trim="user.comment"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="submit"
      >{{ $t('table.save') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  postInfo
} from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          email: '',
          phone: '',
          comment: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: 'username is required', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: 'email is not a valid email',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            min: 6,
            max: 20,
            message: 'password must be between 6 and 20 characters'
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      const data = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
        phone: this.user.phone,
        comment: this.user.comment
      }
      postInfo(data).then(() => {
        this.$message({
          message: i18n.t('table.saved_successfully'),
          type: 'success',
          duration: 5 * 1000
        })
      })
    }
  }
}
</script>
