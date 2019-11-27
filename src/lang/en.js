export default {
  route: {
    dashboard: 'Dashboard',
    website: 'Website',
    ftp: 'FTP',
    database: 'Database',
    accounts: 'Accounts',
    databases: 'Databases',
    monitor: 'Monitor',
    cron: 'Cron',
    Profile: 'Profile',
    setting: 'Setting',
    user: 'User',
    panel: 'Panel'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Project Site',
    logOut: 'Log Out',
    profile: 'My Profile',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'OneinStack Panel',
    logIn: 'Login',
    username: 'Username',
    password: 'Password'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips:
      'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  guide: {
    description:
      'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips:
      'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips:
      'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips:
      'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1:
      'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2:
      'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips:
      'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    account: 'Account',
    about_me: 'About me',
    hello: 'Hello',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'Reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    username: 'Username',
    email: 'Email',
    phone: 'Phone',
    path: 'Path',
    user_type: 'Usertype',
    created_by: 'CreatedBy',
    created_at: 'CreatedAt',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    reload: 'Reload',
    update: 'Update',
    save: 'Save',
    detail: 'Detail',
    assignroles: 'Asssignroles',
    publish: 'Publish',
    draft: 'Draft',
    password: 'Password',
    delete: 'Delete',
    cancel: 'Cancel',
    comment: 'Comment',
    confirm: 'Confirm',
    admin: 'Admin',
    editor: 'Editor',
    readonly: 'ReadOnly',
    enable: 'Enable',
    disable: 'Disable',
    success: 'Success',
    created_successfully: 'Created successfully',
    updated_successfully: 'Updated successfully',
    reloaded_successfully: 'Reloaded successfully',
    saved_successfully: 'Saved successfully',
    deleted_successfully: 'Deleted successfully',
    enabled_successfully: 'Enabled successfully',
    disabled_successfully: 'Disabled successfully',
    cron_name: 'CronName',
    cron_type: 'CronType',
    cron_time: 'CronTime',
    content: 'Content',
    shell_script: 'Shell Script',
    access_url: 'Asccess URL',
    database_name: 'Database Name',
    character_set: 'Character Set',
    database_type: 'Database Type',
    user_account: 'User Account',
    loading: 'Loading'
  },
  example: {
    warning:
      'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description:
      'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips:
      'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips:
      'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  }
}
