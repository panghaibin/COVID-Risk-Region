<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
  <div class="content">
    <el-container>
      <el-header class="header">
        <h1>全国疫情中高风险地区查询</h1>
      </el-header>
      <el-main>
        <RegionShow :data_url="api_url"></RegionShow>
      </el-main>
      <el-footer class="footer">
        <FooterShow></FooterShow>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import RegionShow from "@/components/RegionShow";
import FooterShow from "@/components/FooterShow";
import {Head} from '@vueuse/head'

let dev_api_url = "http://localhost/latest.json"
let prod_api_url = "https://gh.hbtech.workers.dev/https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json"

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
  }
}
</script>

<style>
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
  background-color: #f4f4f5;
  height: auto !important;
  text-align: center;
  border-radius: 5px;
}

.footer {
  background-color: #f4f4f5;
  bottom: 0;
  height: auto;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
