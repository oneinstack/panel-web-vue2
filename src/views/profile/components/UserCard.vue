<template>
  <el-card style="margin-bottom:20px;">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ $t('table.about_me') }}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>{{ $t('table.hello') }}</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          <span>{{ user.username }}</span>
        </div>
      </div>

      <div class="user-bio">
        <div class="user-role user-bio-section">
          <div class="user-bio-section-header">
            <i class="iconfont icon-user-role" />
            <span>{{ user.role | userTypeFilter }}</span>
          </div>
        </div>

        <div class="user-role user-bio-section">
          <div class="user-bio-section-header">
            <i class="iconfont icon-phone" />
            <span>{{ user.phone }}</span>
          </div>
        </div>

        <div class="user-role user-bio-section">
          <div class="user-bio-section-header">
            <i class="iconfont icon-mail" />
            <span>{{ user.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  filters: {
    userTypeFilter(status) {
      const userTypeMap = {
        1: i18n.t('table.readonly'),
        100: i18n.t('table.editor'),
        999: i18n.t('table.admin')
      }
      return userTypeMap[status]
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          avatar: '',
          username: '',
          role: '',
          status: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
