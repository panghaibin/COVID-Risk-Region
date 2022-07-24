<template>
  <div class="footer-section">
    其余未列出地区为常态化防控区域
    <br>
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
  color: var(--el-color-info-dark-2);
  font-size: var(--el-font-size-small);
  padding-top: 10px;
  padding-bottom: 10px;
}

.link:hover {
  color: var(--el-link-hover-text-color);
}
</style>