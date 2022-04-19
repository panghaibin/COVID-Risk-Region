<template>
  <RegionShow :data_url="data_url"></RegionShow>
</template>

<script>
import RegionShow from "@/components/RegionShow";

export default {
  name: 'App',
  components: {
    RegionShow
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
