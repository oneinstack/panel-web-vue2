<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.db_name"
        :placeholder="$t('table.database_name')"
        clearable
        prefix-icon="el-icon-search"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
      />

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
        icon="iconfont icon-reload1"
        @click="handleReload"
      >{{ $t('table.reload') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('table.add') }}
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

      <el-table-column
        :label="$t('table.database_name')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.db_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.character_set')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.db_character }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.database_type')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.db_type }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.user_account')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.user_account.join(",") }}</span>
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
        :label="$t('table.actions')"
        align="center"
        width="200"
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
          :label="$t('table.database_name')"
          prop="db_name"
        >
          <el-input
            v-model="temp.db_name"
            :disabled="dialogStatus === 'create' ? false : true"
          />
        </el-form-item>

        <el-form-item
          :label="$t('table.character_set')"
          prop="db_character"
        >
          <el-select
            v-model="temp.db_character"
            :disabled="dialogStatus === 'detail' ? true : false"
            class="filter-item"
            placeholder
          >
            <el-option
              v-for="item in databaseCharacterOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.display_name"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="$t('table.database_type')"
          prop="db_type"
        >
          <el-select
            v-model="temp.db_type"
            disabled
            class="filter-item"
            placeholder
          >
            <el-option
              v-for="item in databaseTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.display_name"
            />
          </el-select>
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
  databaseReload,
  databaseList,
  databaseCreate,
  databaseUpdate,
  databaseDelete
} from '@/api/database'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' }
]

const databaseTypeOptions = [
  { key: 1, display_name: 'MySQL' },
  { key: 2, display_name: 'PostgreSQL' },
  { key: 3, display_name: 'MongoDB' }
]

const databaseCharacterOptions = [
  { key: 1, display_name: 'utf8mb4' },
  { key: 2, display_name: 'utf8' },
  { key: 3, display_name: 'gbk' },
  { key: 4, display_name: 'big5' }
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
      showPassword: true,
      multipleSelection: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pagesize: 20,
        db_name: undefined,
        status: undefined
      },
      databaseTypeOptions,
      databaseCharacterOptions,
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' },
        { label: 'status Ascending', key: '+status' },
        { label: 'status Descending', key: '-status' }
      ],
      showReviewer: false,
      temp: {
        id: undefined,
        db_name: '',
        db_character: '',
        db_type: '',
        comment: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: i18n.t('table.edit'),
        create: i18n.t('table.add'),
        detail: i18n.t('table.detail')
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        db_name: [{ required: true, min: 1, max: 20, trigger: 'blur' }]
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
      databaseList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
        db_name: '',
        db_character: 'utf8mb4',
        db_type: 'MySQL',
        comment: ''
      }
    },
    handleReload() {
      this.resetTemp()
      this.dialogStatus = 'reload'
      this.dialogFormVisible = false
      databaseReload().then(() => {
        this.$notify({
          title: i18n.t('table.success'),
          message: i18n.t('table.reloaded_successfully'),
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
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
          databaseCreate(this.temp).then(() => {
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
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          databaseUpdate(tempData).then(() => {
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
      databaseDelete(data).then(() => {
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
    }
  }
}
</script>
