<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
  <div class="content">
    <el-container>
      <el-header class="header">
        <h1>全国中高风险地区查询</h1>
      </el-header>
      <el-main>
        <RegionShow :data_url="data_url"></RegionShow>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import RegionShow from "@/components/RegionShow";
import {Head} from '@vueuse/head'

export default {
  name: 'App',
  components: {
    RegionShow,
    Head
  },
  data() {
    return {
      title: "全国中高风险地区查询",
      // data_url: "http://localhost/latest.json",
      data_url: "https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json"
    };
  }
}
</script>

<style>
.header {
  background-color: #f4f4f5;
  height: auto !important;
  text-align: center;
  border-radius: 5px;
}
.content {
  max-width: 900px;
  min-width: 350px;
  margin: 0 auto;
  text-align-all: center;
}
</style>
