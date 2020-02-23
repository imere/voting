<template lang="pug">
  span 正在验证
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AuthCallback extends Vue {
  beforeCreate() {
    console.log("vc");
    import("@/actions").then(({ iu }) =>
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      iu.completeAuthentication()(function() {}, undefined as any)
    );
  }
}
</script>
