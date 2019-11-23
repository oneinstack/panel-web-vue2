<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        :placeholder="$t('table.username')"
        clearable
        prefix-icon="el-icon-search"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
      />

      <el-select
        v-model="listQuery.status"
        :placeholder="$t('table.status')"
        clearable
        style="width: 90px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>

      <!-- <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select> -->

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('table.add') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="danger"
        icon="el-icon-warning"
        @click="handleBan"
      >{{ $t('table.disable') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      stripe
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <!-- <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        :label="$t('table.username')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.email')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.phone')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.user_type')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.user_type | userTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.comment')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.comment }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.status')"
        prop="status"
        sortable
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="handleStatus($event, scope.row.id)"
          />
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="success"
            @click="handleDetail(row)"
          >
            {{ $t('table.detail') }}
          </el-button>

          <el-button
            type="primary"
            size="small"
            @click="handleUpdate(row)"
          >
            {{ $t('table.edit') }}
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="small"
            type="danger"
            @click="handleDelete(row)"
          >{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :element-loading-text="$t('table.loading')"
        element-loading-background="rgba(255,255,255,0.7)"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="88px"
        style="width: 380px; margin-left:50px;"
      >
        <el-form-item
          :label="$t('table.username')"
          prop="username"
        >
          <el-input
            v-model="temp.username"
            :disabled="dialogStatus === 'create' ? false : true"
          />
        </el-form-item>

        <el-form-item
          v-if="dialogStatus != 'detail' ? true : false"
          :label="$t('table.password')"
          prop="password"
        >
          <el-input
            v-model="temp.password"
            placeholder="6 - 20"
          />
        </el-form-item>

        <el-form-item
          :label="$t('table.phone')"
          prop="phone"
        >
          <el-input
            v-model="temp.phone"
            :disabled="dialogStatus === 'detail' ? true : false"
          />
        </el-form-item>

        <el-form-item
          :label="$t('table.email')"
          prop="email"
        >
          <el-input
            v-model="temp.email"
            :disabled="dialogStatus === 'detail' ? true : false"
          />
        </el-form-item>

        <el-form-item
          :label="$t('table.user_type')"
          prop="user_type"
        >
          <el-select
            v-model="temp.user_type"
            :disabled="dialogStatus === 'detail' ? true : false"
            class="filter-item"
            placeholder
          >
            <el-option
              v-for="item in userTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="dialogStatus == 'create' ? false : true"
          :label="$t('table.status')"
        >
          <el-switch
            v-model="temp.status"
            :disabled="dialogStatus === 'detail' ? true : false"
            :active-value="1"
            :inactive-value="2"
          />
        </el-form-item>

        <el-form-item
          v-if="dialogStatus == 'detail' ? true : false"
          :label="$t('table.created_by')"
          prop="created_by"
        >
          <el-input
            v-model="temp.created_by"
            :disabled="dialogStatus === 'detail' ? true : false"
          />
        </el-form-item>

        <el-form-item
          v-if="dialogStatus == 'detail' ? true : false"
          :label="$t('table.created_at')"
          prop="created_at"
        >
          <el-input
            v-model="temp.created_at"
            :disabled="dialogStatus === 'detail' ? true : false"
          />
        </el-form-item>

        <el-form-item :label="$t('table.comment')">
          <el-input
            v-model="temp.comment"
            :disabled="dialogStatus === 'detail' ? true : false"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">{{
          $t('table.cancel')
        }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogPvVisible"
      title="Reading statistics"
    >
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="key"
          label="Channel"
        />
        <el-table-column
          prop="pv"
          label="Pv"
        />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >{{
          $t('table.confirm')
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  userCreate,
  userUpdate,
  userDelete,
  userUpdateBatch
} from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' }
]

const statusOptions = [
  { key: 1, display_name: i18n.t('table.enable') },
  { key: 2, display_name: i18n.t('table.disable') }
]

const userTypeOptions = [
  { key: 1, display_name: i18n.t('table.readonly') },
  { key: 100, display_name: i18n.t('table.editor') },
  { key: 999, display_name: i18n.t('table.admin') }
]
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    userTypeFilter(status) {
      const userTypeMap = {
        1: i18n.t('table.readonly'),
        100: i18n.t('table.editor'),
        999: i18n.t('table.admin')
      }
      return userTypeMap[status]
    },
    statusNameFilter(status) {
      const statusNameMap = {
        1: i18n.t('table.enable'),
        2: i18n.t('table.disable')
      }
      return statusNameMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      multipleSelection: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pagesize: 20,
        username: undefined,
        status: undefined
      },
      userTypeOptions,
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' },
        { label: 'status Ascending', key: '+status' },
        { label: 'status Descending', key: '-status' }
      ],
      statusOptions,
      showReviewer: false,
      temp: {
        id: undefined,
        username: '',
        password: '',
        phone: '',
        email: '',
        user_type: '',
        status: undefined,
        comment: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        reload: i18n.t('table.reload'),
        update: i18n.t('table.edit'),
        create: i18n.t('table.add'),
        detail: i18n.t('table.detail')
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        user_type: [{ required: true, message: 'user_type is required' }],
        username: [
          { required: true, min: 4, max: 20, trigger: 'blur' }
        ],
        email: [
          { type: 'email', trigger: ['blur', 'change'] }
        ],
        password: [
          { min: 6, max: 20 }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      userList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: i18n.t('table.updated_successfully'),
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        username: '',
        password: '',
        phone: '',
        email: '',
        comment: '',
        user_type: 1,
        status: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          userCreate(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: i18n.t('table.success'),
              message: i18n.t('table.created_successfully'),
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          userUpdate(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: i18n.t('table.success'),
              message: i18n.t('table.updated_successfully'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      const data = {
        id: row.id
      }
      userDelete(data).then(() => {
        this.$notify({
          title: i18n.t('table.success'),
          message: i18n.t('table.deleted_successfully'),
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleBan() {
      if (this.multipleSelection.length > 0) {
        const id_list = this.multipleSelection.map(val => val.id)
        const data = {
          id_list: id_list,
          status: 2
        }
        userUpdateBatch(data).then(() => {
          this.getList()
          this.$notify({
            title: i18n.t('table.success'),
            message: i18n.t('table.disabled_successfully'),
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    handleStatus(status, id) {
      const data = {
        id_list: [id],
        status: status
      }
      const setMessage =
        status === 1
          ? i18n.t('table.enabled_successfully')
          : i18n.t('table.disabled_successfully')
      userUpdateBatch(data).then(() => {
        this.getList()
        this.$notify({
          title: i18n.t('table.success'),
          message: setMessage,
          type: 'success',
          duration: 2000
        })
      })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
