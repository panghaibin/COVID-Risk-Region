<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
  <el-scrollbar height="100vh">
    <div class="content-body">
      <div class="content">
        <el-container>
          <el-header class="header">
            <h1>{{ title }}</h1>
          </el-header>
          <el-main>
            <RegionShow :data_url="api_url"></RegionShow>
          </el-main>
          <el-footer class="footer">
            <FooterShow></FooterShow>
          </el-footer>
        </el-container>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import RegionShow from "@/components/RegionShow";
import FooterShow from "@/components/FooterShow";
import {Head} from '@vueuse/head'
import update from './mixins/update'

let dev_api_url = "http://localhost/latest.json"
let prod_api_url = "https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json"

export default {
  name: 'App',
  components: {
    RegionShow,
    FooterShow,
    Head
  },
  data() {
    return {
      title: "全国疫情中高风险地区查询",
      api_url: process.env.NODE_ENV === 'development' ? dev_api_url : prod_api_url
    };
  },
  mixins: [update],
}
</script>

<style>
html, body {
  margin: 0;
}

.content-body {
  margin: 8px;
}

.content {
  max-width: 900px;
  min-width: 350px;
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary-dark-2);
  height: auto !important;
  text-align: center;
  border-radius: 5px;
}

.footer {
  bottom: 0;
  height: auto;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .el-scrollbar__bar {
    display: none;
  }
}

@media (prefers-color-scheme: dark) {
  html, body {
    background-color: #121212;
  }

  .header {
    background-color: #191919;
    color: #e2e2e2;
  }

  .el-input__wrapper {
    background-color: #191919;
    border-color: #73767a;
    box-shadow: 0 0 0 1px #73767a;
  }

  p, h3, .el-input__inner {
    color: #e2e2e2;
  }

  .el-tree {
    --el-tree-node-hover-bg-color: #191919;
    background-color: #121212;
    color: #e2e2e2;
  }
}
</style>
