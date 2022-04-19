<template>
  <RegionShow data_url="http://localhost/latest.json"></RegionShow>
<!--  <RegionShow data_url="https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json"></RegionShow>-->
</template>

<script>
import RegionShow from "@/components/RegionShow";

export default {
  name: 'App',
  components: {
    RegionShow
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
