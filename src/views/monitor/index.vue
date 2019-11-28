<template>
  <div class="monitor-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminMonitor from './admin'
import editorMonitor from './editor'

export default {
  name: 'Monitor',
  components: { adminMonitor, editorMonitor },
  data() {
    return {
      currentRole: 'adminMonitor'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
  }
}
</script>
