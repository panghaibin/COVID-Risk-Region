<template>
  <el-container>
    <RegionShow :data_url="data_url"></RegionShow>
  </el-container>
</template>

<script>
import RegionShow from "@/components/RegionShow";
import {useHead} from "@vueuse/head";
import {computed, reactive} from "vue";

export default {
  name: 'App',
  components: {
    RegionShow
  },
  setup() {
    const site_data = reactive({
      title: "全国中高风险地区查询",
    })
    useHead({
      title: computed(() => site_data.title),
      meta: [
        {
          name: "description"
        }
      ]
    });
  },
  data() {
    return {
      data_url: "http://localhost/latest.json",
      // data_url: "https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json",
    };
  }
}
</script>

<style>

</style>
