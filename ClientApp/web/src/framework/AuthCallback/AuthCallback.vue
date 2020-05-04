<template lang="pug">
  span 正在验证
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Logger } from '@/framework/shared/logger';

@Component
export default class AuthCallback extends Vue {
  beforeCreate() {
    Logger.info('vc');
    import('@/framework/shared/identity-service').then(({ iservice }) =>
      iservice.completeAuthentication()
    );
  }
}
</script>
