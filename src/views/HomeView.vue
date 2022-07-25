<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
<!--  禁用 el scrollbar ，不然会与 router Scroll Behavior 冲突-->
<!--  <el-scrollbar height="100vh">-->
    <div class="content-body">
      <div class="content">
        <el-container>
          <el-header class="header">
            <router-link to="/">
              <h1>{{ title }}</h1>
            </router-link>
          </el-header>
          <el-main>
            <RegionShow
                :key="api_url"
                :data_url="api_url"
                :info_url="info_url"
                :type_latest="type_latest"
            ></RegionShow>
          </el-main>
          <el-footer class="footer">
            <FooterShow></FooterShow>
          </el-footer>
        </el-container>
      </div>
    </div>
<!--  </el-scrollbar>-->
</template>

<script>
import RegionShow from "@/components/RegionShow";
import FooterShow from "@/components/FooterShow";
import { Head } from '@vueuse/head'
import update from '@/mixins/update'

let url = process.env.NODE_ENV === 'development'
    // ? 'https://covid-api.caduo.ml/'
    ? 'http://localhost/ccr-api/'
    : 'https://covid-api.caduo.ml/';

export default {
  name: "HomeView",
  components: {
    RegionShow,
    FooterShow,
    Head
  },
  computed: {
    api_url() {
      let file_name = this.$route.params.fileName;
      if (file_name) {
        return url + file_name + '.json';
      } else {
        return url + 'latest.json';
      }
    },
    type_latest() {
      return !this.$route.params.fileName;
    },
  },
  data() {
    return {
      title: "全国疫情高中低风险地区查询",
      info_url: url + 'info.json'
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

header a {
  text-decoration:none;
  color: inherit;
}

.content {
  max-width: 900px;
  min-width: 355px;
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

.link {
  color: var(--el-color-info-dark-2);
  vertical-align: baseline;
  font-size: var(--el-font-size-small);
}

@media screen and (max-width: 768px) {
  .el-scrollbar__bar.is-vertical {
    width: 3px;
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
