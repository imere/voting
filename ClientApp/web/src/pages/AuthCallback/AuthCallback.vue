<template lang="pug">
  span 正在验证
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "AuthCallback",
  beforeCreate() {
    console.log("vc");
    import("@/actions").then(({ iu }) =>
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      iu.completeAuthentication()(function() {})
    );
  }
});
</script>
