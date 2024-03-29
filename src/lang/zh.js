export default {
  route: {
    dashboard: '仪表盘',
    website: '网站',
    ftp: 'FTP',
    database: '数据库',
    accounts: '账号管理',
    databases: '数据库管理',
    monitor: '监控',
    cron: '计划任务',
    Profile: '个人中心',
    setting: '设置',
    user: '用户管理',
    panel: '面板设置'
  },
  navbar: {
    dashboard: '仪表盘',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: 'OneinStack面板',
    logIn: '登录',
    username: '账号',
    password: '密码'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips:
      '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description:
      '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips:
      '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips:
      '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2:
      '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips:
      '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    account: '账户',
    about_me: '关于我',
    hello: '你好',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    username: '用户名',
    email: '邮箱',
    phone: '电话',
    path: '根目录',
    user_type: '类型',
    created_by: '创建人',
    created_at: '创建时间',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    password: '密码',
    actions: '操作',
    edit: '编辑',
    reload: '同步',
    update: '更新',
    save: '保存',
    detail: '查看',
    publish: '发布',
    draft: '草稿',
    assignroles: '分配角色',
    delete: '删除',
    cancel: '取消',
    comment: '备注',
    confirm: '确定',
    admin: '管理员',
    editor: '编辑用户',
    readonly: '只读用户',
    enable: '启用',
    disable: '禁用',
    success: '成功',
    created_successfully: '创建成功',
    updated_successfully: '更新成功',
    reloaded_successfully: '同步成功',
    saved_successfully: '保存成功',
    deleted_successfully: '删除成功',
    enabled_successfully: '启用成功',
    disabled_successfully: '禁用成功',
    cron_name: '名称',
    cron_type: '类型',
    cron_time: '执行时间',
    content: '执行内容',
    shell_script: 'Shell脚本',
    access_url: '访问URL',
    database_name: '数据库名',
    character_set: '字符集',
    database_type: '数据库类型',
    user_account: '绑定账号',
    permissions: '权限',
    permission_all: '读写',
    permission_select: '只读',
    hosts: '地址',
    grant_hosts: '授权地址',
    hosts_localhost: '本地服务器',
    hosts_all: '所有人(%)',
    hosts_ip: '指定IP',
    loading: '加载中'
  },
  example: {
    warning:
      '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description:
      '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips:
      'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  }
}
