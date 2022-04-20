<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
  <el-container>
    <RegionShow :data_url="data_url"></RegionShow>
  </el-container>
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

</style>
