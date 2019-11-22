<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col
          :span="6"
          :xs="24"
        >
          <user-card :user="user" />
        </el-col>
        <el-col
          :span="18"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                :label="$t('table.account')"
                name="account"
              >
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters(['username', 'avatar', 'roles', 'email', 'phone', 'status', 'comment'])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        username: this.username,
        avatar: this.avatar,
        role: this.roles,
        email: this.email,
        phone: this.phone,
        comment: this.comment
      }
    }
  }
}
</script>
