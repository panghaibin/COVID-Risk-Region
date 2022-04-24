<template>
  <div class="footer-section">
    数据来自<el-link class="link" href="http://bmfw.www.gov.cn/yqfxdjcx/risk.html" target="_blank">国家卫健委</el-link>
    |
    <el-link class="link" href="https://github.com/panghaibin/COVID-Risk-Region" target="_blank">GitHub</el-link>
    |
    <el-link class="link" href="https://github.com/panghaibin/RiskLevelAPI" target="_blank">Api GitHub</el-link>
  </div>
</template>

<script>
export default {
  name: "FooterShow"
}
</script>

<style scoped>
.footer-section {
  color: #73767a;
  font-size: var(--el-font-size-small);
  padding-top: 10px;
  padding-bottom: 10px;
}

.link {
  color: #73767a;
  vertical-align: baseline;
  font-size: var(--el-font-size-small);
}
.link:hover {
  color: var(--el-link-hover-text-color);
}
</style>