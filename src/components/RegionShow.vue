<template>
  <div v-if="!err">
    <p>
      <template v-if="ok">
        <span v-if="type_latest">
          以下数据截止自 {{ raw.data.end_update_time }}
        </span>
        <span v-else>
          历史数据 {{ raw.data.end_update_time }}
        </span>
      </template>
      <template v-else>
        <span>加载中……</span>
      </template>
      <span v-show="loading_icon"><el-icon class="is-loading"><loading/></el-icon></span>
      <span v-if="ok && !loading_icon" class="history-icon">
        <el-button type="text" @click="fetch_info">
          <el-icon><clock/></el-icon>
          <span class="history-text">查看历史</span>
        </el-button>
      </span>
    </p>
    <el-dialog v-model="info.visible" title="历史数据" width="320px">
      <el-table
          v-if="!info.err"
          :data="info.table"
          ref="info_table"
          row-key="id"
          @cell-click="info_click"
          empty-text="数据加载中……"
          height="50vh"
      >
        <el-table-column label="时间">
          <template #default="scope">
            {{ scope.row.update_time }}
          </template>
        </el-table-column>
      </el-table>
      <div v-else>
        <p>加载历史记录失败！请刷新重试</p>
        <p>{{ info.err_msg }}</p>
      </div>
      <el-dialog
          v-model="info.download_visible"
          width="300px"
          top="25vh"
          title="下载全部数据"
          append-to-body
      >
        <div style="text-align: center">
          <el-button v-if="!info.err" @click="download_data(0)" style="width: 10em">
            <el-icon>
              <Download/>
            </el-icon>
            GitHub 源
          </el-button>
          <br>
          <br>
          <el-button v-if="!info.err" @click="download_data(1)" style="width: 10em">
            <el-icon>
              <Download/>
            </el-icon>
            GitHub 镜像源
          </el-button>
          <br>
          <br>
          <span class="link">数据来自</span>
          <el-link class="link" href="http://bmfw.www.gov.cn/yqfxdjcx/risk.html" target="_blank">
            <el-icon>
              <Link/>
            </el-icon>
            国家卫健委
          </el-link>
          <br>
          <el-link class="link" href="https://github.com/panghaibin/COVID-Risk-Region" target="_blank">
            <el-icon>
              <Link/>
            </el-icon>
            前端项目 GitHub
          </el-link>
          <br>
          <el-link class="link" href="https://github.com/panghaibin/RiskLevelAPI" target="_blank">
            <el-icon>
              <Link/>
            </el-icon>
            Api项目 GitHub
          </el-link>
          <br>
        </div>
      </el-dialog>
      <template #footer>
        <el-button v-if="!info.err" @click="info.download_visible = true" style="margin-right: 115px;">
          下载全部
        </el-button>
        <el-button @click="info.visible = false" type="primary">关闭</el-button>
      </template>
    </el-dialog>
    <div
        v-if="!type_latest"
        :class="ok ? ['history-pre-next'] : ['history-pre-next', 'item-disabled']"
    >
      <span v-if="info.pre" class="history-icon" style="float: left">
        <el-button type="text" @click="router_to(info.pre)">
          <span class="history-text">&lt; 上一历史数据</span>
        </el-button>
      </span>
      <span v-if="info.next" class="history-icon">
        <el-button type="text" @click="router_to(info.next)">
          <span class="history-text">下一历史数据 &gt;</span>
        </el-button>
      </span>
    </div>
    <div style="margin-top: 10px">
      <el-input
          :disabled="!ok"
          ref="filter_input"
          v-model="filter_text"
          placeholder="请输入区域名称，可用空格分隔多个关键词"
          clearable
          @clear="tag_add($refs.filter_input.input.value)"
          @change="tag_add"
      >
      </el-input>
      <template :class="ok ? ['tag-list'] : ['tag-list', 'item-disabled']">
        <el-tag
            v-for="(item, index) in filter_history"
            :type="dark_mode ? 'info' : ''"
            :key="index"
            :closable="true"
            @close="tag_remove(index)"
            @click="filter_text=item;tag_add(item)"
            class="tag-item"
        >
          {{ item }}
        </el-tag>
      </template>
    </div>
    <div class="risk-show">
      <el-affix target=".risk-show">
        <el-tabs
            @tab-click="handle_tabs_click"
            :class="ok ? ['risk-tab-label'] : ['risk-tab-label', 'item-disabled']"
            stretch
        >
          <el-tab-pane name="#high-risk">
            <template #label>
              <span class="high-risk-tab-label">高风险
                <span class="num">({{ high.count }})</span>
              </span>
            </template>
          </el-tab-pane>
          <el-tab-pane name="#middle-risk">
            <template #label>
              <span class="middle-risk-tab-label">中风险
                <span class="num">({{ middle.count }})</span>
              </span>
            </template>
          </el-tab-pane>
          <el-tab-pane name="#low-risk">
            <template #label>
              <span class="low-risk-tab-label">低风险
                <span class="num">({{ low.count }})</span>
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-affix>
      <h3 class="high-risk" id="high-risk" style="margin-top: 0">
        高风险等级地区
        <span class="num">({{ high.count }})</span>
        <el-button
            class="expand-all"
            :type="dark_mode ? 'info' : 'primary'"
            @click="high_expand"
            :disabled="!ok"
        >
          {{ high.expand_all_button }}
        </el-button>
      </h3>
      <el-tree
          v-if="ok"
          :key="high.key"
          :data="high.tree"
          :props="tree_props"
          node-key="id"
          :default-expand-all="high.expand_all"
          :default-expanded-keys="high.default_id_list"
          :auto-expand-parent="false"
          ref="high_tree"
          :filter-node-method="high_filter"
          empty-text="无数据"
      />
      <el-skeleton v-else :rows="6" animated/>
      <h3 class="middle-risk" id="middle-risk">
        中风险等级地区
        <span class="num">({{ middle.count }})</span>
        <el-button
            class="expand-all"
            :type="dark_mode ? 'info' : 'primary'"
            @click="middle_expand"
            :disabled="!ok"
        >
          {{ middle.expand_all_button }}
        </el-button>
      </h3>
      <el-tree
          v-if="ok"
          :key="middle.key"
          :data="middle.tree"
          :props="tree_props"
          node-key="id"
          :default-expand-all="middle.expand_all"
          :default-expanded-keys="middle.default_id_list"
          :auto-expand-parent="false"
          ref="middle_tree"
          :filter-node-method="middle_filter"
          empty-text="无数据"
      />
      <el-skeleton v-else :rows="6" animated/>
      <h3 class="low-risk" id="low-risk">
        低风险等级地区
        <span class="num">({{ low.count }})</span>
        <el-button
            v-if="low.used"
            class="expand-all"
            :type="dark_mode ? 'info' : 'primary'"
            @click="low_expand"
            :disabled="!ok"
        >
          {{ low.expand_all_button }}
        </el-button>
      </h3>
      <el-tree
          v-if="ok"
          :key="low.key"
          :data="low.tree"
          :props="tree_props"
          node-key="id"
          :default-expand-all="low.expand_all"
          :default-expanded-keys="low.default_id_list"
          :auto-expand-parent="false"
          ref="low_tree"
          :filter-node-method="low_filter"
          :empty-text="low.empty_text"
      />
      <el-skeleton v-else :rows="6" animated/>
    </div>
  </div>
  <div v-else>
    <p>API 获取出错，请刷新重试</p>
    <p>{{ err_msg }}</p>
  </div>
</template>

<script>
import axios from "axios"
import { ElNotification } from 'element-plus'

export default {
  name: "RegionShow",
  props: {
    data_url: String,
    info_url: String,
    type_latest: Boolean,
  },
  computed: {
    data_name() {
      return this.data_url.split("/").pop().split(".").shift();
    },
    data_name_timestamp() {
      return this.data_name + "_timestamp";
    },
  },
  data() {
    return {
      raw: null,
      ok: false,
      err: false,
      err_msg: "",

      info: {
        raw: null,
        visible: false,
        download_visible: false,
        ok: false,
        err: false,
        err_msg: "",
        table: null,
        pre: null,
        next: null,
      },

      high: {
        key: 0,
        tree: null,
        count: '-',
        province_id_list: [],
        city_id_list: [],
        county_id_list: [],
        default_id_list: [],
        expand_all: false,
        expand_all_button: "展开",
      },
      middle: {
        key: 0,
        tree: null,
        count: '-',
        province_id_list: [],
        city_id_list: [],
        county_id_list: [],
        default_id_list: [],
        expand_all: false,
        expand_all_button: "展开",
      },
      low: {
        key: 0,
        tree: null,
        count: '-',
        province_id_list: [],
        city_id_list: [],
        county_id_list: [],
        default_id_list: [],
        expand_all: false,
        expand_all_button: "展开",
        used: true,
        empty_text: "无数据",
      },

      tree_props: {
        label: 'label',
        children: 'children',
        class: 'tree-node',
      },

      filter_text: "",
      filter_history: [
        "北京市",
        "上海市",
        "江苏省",
      ],

      dark_mode: false,
      loading_icon: false,
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      window.vue = this;
    }

    if (this.type_latest) {
      if (!localStorage.getItem(this.data_name_timestamp) || !localStorage.getItem(this.data_name)) {
        this.fetch_latest(false);
      } else {
        this.fetch_latest(true);
      }
    } else {
      this.fetch_history();
      this.fetch_data(this.info_url, null, true).then((response) => {
        that.info.raw = response
        const file_name = this.$route.params.fileName;
        const pre_next = this.find_info_pre_next(file_name);
        this.info.pre = pre_next.pre;
        this.info.next = pre_next.next;
      })
    }

    let filter_history = JSON.parse(localStorage.getItem("filter_history"));
    if (filter_history && filter_history.length) {
      this.filter_history = filter_history
    } else {
      localStorage.setItem("filter_history", JSON.stringify(this.filter_history));
    }

    let media = window.matchMedia('(prefers-color-scheme: dark)');
    let that = this;
    let callback = (e) => {
      that.dark_mode = e.matches;
    };
    media.addEventListener('change', callback);
    callback(media);
  },
  methods: {
    fetch_data: async function (url, use_proxy = null, force_local = false, force_fetch = false) {
      let name = url.split("/").pop().split(".").shift();
      let name_timestamp = name + "_timestamp";
      let name_local = JSON.parse(localStorage.getItem(name));
      if (force_local && !!name_local) {
        return name_local;
      }
      if (!force_fetch && new Date().getTime() - localStorage.getItem(name_timestamp) < 5 * 60 * 1000) {
        return name_local;
      }

      if (use_proxy === null) {
        use_proxy = localStorage.getItem("use_proxy") === "true";
      }
      let new_url
      let timeout_time
      let proxy_url
      // disabled proxy temporarily due to the fxxking gfw
      // process.env.NODE_ENV === 'development' ? proxy_url = "" : proxy_url = "https://gh.hbtech.workers.dev/"
      proxy_url = ""
      use_proxy ? new_url = proxy_url + url : new_url = url;
      use_proxy ? timeout_time = 5000 : timeout_time = 2000;

      let CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const timeout = setTimeout(() => {
        source.cancel();
      }, timeout_time);

      let that = this
      try {
        let res = await axios.get(new_url, { cancelToken: source.token })
        clearTimeout(timeout);
        let raw = res.data;
        localStorage.setItem(name, JSON.stringify(raw));
        localStorage.setItem(name_timestamp, new Date().getTime().toString());
        localStorage.setItem("use_proxy", use_proxy.toString());
        return Promise.resolve(raw);
      } catch (error) {
        clearTimeout(timeout);
        console.log(error)
        if (!use_proxy) {
          return that.fetch_data(url, true)
        } else {
          return Promise.reject(error);
        }
      }
    },
    fetch_latest(check_local = false) {
      if (check_local) {
        this.raw = JSON.parse(localStorage.getItem(this.data_name));
        this.high_init();
        this.middle_init();
        this.low_init();
        this.ok = true;
        if ((new Date().getTime() - localStorage.getItem(this.data_name_timestamp)) < 5 * 60 * 1000) {
          return
        } else {
          this.loading_icon = true;
        }
      } else {
        this.loading_icon = true;
      }
      let url = this.data_url + "?t=" + new Date().getTime();
      this.fetch_data(url, null, false, true).then((data) => {
        let msg
        let update_required = true
        if (this.ok) {
          if (this.raw.data["end_update_time"] !== data["data"]["end_update_time"]) {
            msg = "数据更新成功"
          } else {
            msg = "已是最新数据"
            update_required = false
          }
        } else {
          msg = "数据加载成功"
        }
        ElNotification.success({
          message: msg,
          duration: 2500,
          position: 'bottom-right',
          showClose: false,
          customClass: 'notification-item',
        })
        if (update_required) {
          this.raw = data
          this.high_init()
          this.middle_init()
          this.low_init()
          this.ok = true
        }
        this.loading_icon = false;
      }).catch((error) => {
        console.log(error)
        if (this.ok) {
          let msg = "数据更新失败<br>已显示缓存数据"
          ElNotification.info({
            message: msg,
            duration: 2500,
            position: 'bottom-right',
            showClose: false,
            customClass: 'notification-item',
            dangerouslyUseHTMLString: true,
          })
        } else {
          this.err_msg = error
          this.err = true
        }
        this.loading_icon = false;
      })
    },
    fetch_info() {
      this.info.visible = true
      this.info.err = false
      let that = this
      this.fetch_data(this.info_url).then((response) => {
        that.info.raw = response
        let file_list = response["file_list"]
        let table = []
        let id_count = 0
        for (let i = file_list.length - 1; i >= 0; i--) {
          let item = file_list[i]
          let file = item["file_name"].replace(".json", "")
          let update_timestamp = new Date(item["update_time"] * 1000)
          let day = update_timestamp.toLocaleString('zh-CN',
              {
                timeZone: 'Asia/Shanghai',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
          let update_time = update_timestamp.toLocaleString('zh-CN',
              {
                timeZone: 'Asia/Shanghai',
                hour12: false,
                hour: '2-digit',
              })
          day = day.replace(/\//g, "-")
          update_time = update_time.replace("24", "00")
          if (!table.length || table[table.length - 1]['update_time'] !== day) {
            table.push({
              id: id_count++,
              update_time: day,
              file_name: "#",
              children: [{
                id: id_count++,
                update_time: day + " " + update_time,
                file_name: file,
              }]
            })
          } else {
            table[table.length - 1]['children'].unshift({
              id: id_count++,
              update_time: day + " " + update_time,
              file_name: file,
            })
          }
        }
        that.info.table = table
        that.info.ok = true
      }).catch((error) => {
        that.info.err = true
        that.info.err_msg = error
        console.log(error)
      })
    },
    fetch_history() {
      this.loading_icon = true;
      let url = this.data_url;
      this.fetch_data(url, null, true).then((data) => {
        // 增加历史数据翻页后，若频繁翻页可能会让提示框显示多次，减少时间
        let msg = "历史数据加载成功"
        ElNotification.success({
          message: msg,
          duration: 1200,
          position: 'bottom-right',
          showClose: false,
          customClass: 'notification-item',
        })
        this.raw = data
        this.high_init()
        this.middle_init()
        this.low_init()
        this.ok = true
        this.loading_icon = false;
      }).catch((error) => {
        console.log(error)
        let msg = "历史数据加载失败"
        ElNotification.info({
          message: msg,
          duration: 2500,
          position: 'bottom-right',
          showClose: false,
          customClass: 'notification-item',
        })
        this.err_msg = error
        this.err = true
        this.loading_icon = false;
      })
    },
    list2tree(list, data) {
      let tree = []
      let id_count = 0
      let province_id_list = []
      let city_id_list = []
      let county_id_list = []
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let province = item["province"]
        let city = item.city
        let county = item["county"]
        let communitys = item["communitys"]
        let province_item = null
        let city_item = null
        let county_item = null
        let communitys_item = null
        for (let j = 0; j < tree.length; j++) {
          let tree_item = tree[j]
          if (tree_item.label === province) {
            province_item = tree_item
            break
          }
        }
        if (province_item === null) {
          province_item = {
            id: id_count++,
            pid: -1,
            label: province,
            children: [],
            expanded: true
          }
          tree.push(province_item)
          province_id_list.push(province_item.id)
        }
        for (let j = 0; j < province_item.children.length; j++) {
          let province_item_child = province_item.children[j]
          if (province_item_child.label === city) {
            city_item = province_item_child
            break
          }
        }
        if (city_item === null) {
          city_item = {
            id: id_count++,
            pid: province_item.id,
            label: city,
            children: [],
            expanded: true
          }
          province_item.children.push(city_item)
          city_id_list.push(city_item.id)
        }

        for (let j = 0; j < city_item.children.length; j++) {
          let city_item_child = city_item.children[j]
          if (city_item_child.label === county) {
            county_item = city_item_child
            break
          }
        }
        if (county_item === null) {
          county_item = {
            id: id_count++,
            pid: city_item.id,
            label: county,
            children: [],
            expanded: true
          }
          city_item.children.push(county_item)
          county_id_list.push(county_item.id)
        }
        for (let j = 0; j < county_item.children.length; j++) {
          let county_item_child = county_item.children[j]
          if (county_item_child.label === communitys) {
            communitys_item = county_item_child
            break
          }
        }
        if (communitys_item === null) {
          communitys_item = []
          for (let j = 0; j < communitys.length; j++) {
            county_item.children.push({
              id: id_count++,
              pid: county_item.id,
              label: communitys[j]
            })
          }
        }
      }
      data.tree = tree
      data.province_id_list = province_id_list
      data.city_id_list = city_id_list
      data.county_id_list = county_id_list
      data.default_id_list = province_id_list.concat(county_id_list)
    },
    high_init() {
      this.list2tree(this.raw.data["highlist"], this.high)
      this.high.key++
      this.high.count = this.raw.data["hcount"]
    },
    middle_init() {
      this.list2tree(this.raw.data["middlelist"], this.middle)
      this.middle.key++
      this.middle.count = this.raw.data["mcount"]
    },
    low_init() {
      let lowlist = this.raw.data["lowlist"];
      if (!lowlist) {
        this.low.used = false;
        this.low.empty_text = "其余未列出地区为低风险地区(历史定义)";
        return
      }
      this.low.used = true;
      this.low.empty_text = "无数据";
      this.list2tree(this.raw.data["lowlist"], this.low)
      this.low.key++
      this.low.count = this.raw.data["lcount"]
    },
    high_expand() {
      this.high.expand_all = !this.high.expand_all
      if (this.high.expand_all) {
        let id_list = this.high.default_id_list.concat(this.high.city_id_list)
        for (let i = 0; i < id_list.length; i++) {
          this.$refs.high_tree.store.getNode(id_list[i]).expanded = true;
        }
      } else {
        for (let i = 0; i < this.high.city_id_list.length; i++) {
          this.$refs.high_tree.store.getNode(this.high.city_id_list[i]).expanded = false;
        }
      }
      this.high.expand_all_button = this.high.expand_all ? "收起" : "展开"
    },
    middle_expand() {
      this.middle.expand_all = !this.middle.expand_all
      if (this.middle.expand_all) {
        let id_list = this.middle.default_id_list.concat(this.middle.city_id_list)
        for (let i = 0; i < id_list.length; i++) {
          this.$refs.middle_tree.store.getNode(id_list[i]).expanded = true;
        }
      } else {
        for (let i = 0; i < this.middle.city_id_list.length; i++) {
          this.$refs.middle_tree.store.getNode(this.middle.city_id_list[i]).expanded = false;
        }
      }
      this.middle.expand_all_button = this.middle.expand_all ? "收起" : "展开"
    },
    low_expand() {
      this.low.expand_all = !this.low.expand_all
      if (this.low.expand_all) {
        let id_list = this.low.default_id_list.concat(this.low.city_id_list)
        for (let i = 0; i < id_list.length; i++) {
          this.$refs.low_tree.store.getNode(id_list[i]).expanded = true;
        }
      } else {
        for (let i = 0; i < this.low.city_id_list.length; i++) {
          this.$refs.low_tree.store.getNode(this.low.city_id_list[i]).expanded = false;
        }
      }
      this.low.expand_all_button = this.low.expand_all ? "收起" : "展开"
    },
    high_filter(value, data) {
      if (!value) {
        if (data.children === undefined) {
          this.high.count++
        }
        return true
      }
      let value_list = value.split(" ")
      for (let i = 0; i < value_list.length; i++) {
        let value = value_list[i]
        if (!value) {
          continue
        }
        if (data.label.includes(value)) {
          if (data.children === undefined) {
            this.high.count++
          }
          return true
        }
        let parent_id = data.pid
        while (parent_id !== -1) {
          let parent_node = this.$refs.high_tree.store.getNode(parent_id).data
          if (parent_node.label.includes(value)) {
            if (data.children === undefined) {
              this.high.count++
            }
            return true
          }
          parent_id = parent_node.pid
        }
      }
      return false
    },
    middle_filter(value, data) {
      if (!value) {
        if (data.children === undefined) {
          this.middle.count++
        }
        return true
      }
      let value_list = value.split(" ")
      for (let i = 0; i < value_list.length; i++) {
        let value = value_list[i]
        if (!value) {
          continue
        }
        if (data.label.includes(value)) {
          if (data.children === undefined) {
            this.middle.count++
          }
          return true
        }
        let parent_id = data.pid
        while (parent_id !== -1) {
          let parent_node = this.$refs.middle_tree.store.getNode(parent_id).data
          if (parent_node.label.includes(value)) {
            if (data.children === undefined) {
              this.middle.count++
            }
            return true
          }
          parent_id = parent_node.pid
        }
      }
      return false
    },
    low_filter(value, data) {
      if (!value) {
        if (data.children === undefined) {
          this.low.count++
        }
        return true
      }
      let value_list = value.split(" ")
      for (let i = 0; i < value_list.length; i++) {
        let value = value_list[i]
        if (!value) {
          continue
        }
        if (data.label.includes(value)) {
          if (data.children === undefined) {
            this.low.count++
          }
          return true
        }
        let parent_id = data.pid
        while (parent_id !== -1) {
          let parent_node = this.$refs.low_tree.store.getNode(parent_id).data
          if (parent_node.label.includes(value)) {
            if (data.children === undefined) {
              this.low.count++
            }
            return true
          }
          parent_id = parent_node.pid
        }
      }
      return false
    },
    tag_add(item) {
      item = item.trim()
      if (item === "") {
        return
      }
      while (item.includes("  ")) {
        item = item.replace("  ", " ")
      }
      this.filter_history.unshift(item)
      this.filter_history = Array.from(new Set(this.filter_history))
      localStorage.setItem("filter_history", JSON.stringify(this.filter_history));
    },
    tag_remove(index) {
      this.filter_history.splice(index, 1)
      localStorage.setItem("filter_history", JSON.stringify(this.filter_history));
    },
    router_to(path) {
      if (!path) {
        return
      }
      this.$router.push({
        path: "./" + path,
      })
    },
    info_click(row) {
      if (row.file_name === "#") {
        this.$refs.info_table.toggleRowExpansion(row)
      } else {
        this.router_to(row.file_name)
      }
    },
    find_info_pre_next(file_name) {
      const info_list = this.info.raw.file_list
      let index = info_list.findIndex(item => item.file_name === file_name + ".json")
      if (index === -1) {
        return
      }
      let pre_index = index - 1
      let next_index = index + 1
      let pre, next;
      if (pre_index < 0) {
        pre = null
      } else {
        pre = info_list[pre_index].file_name.replace(".json", "")
      }
      if (next_index >= info_list.length) {
        next = null
      } else {
        next = info_list[next_index].file_name.replace(".json", "")
      }
      return {
        pre: pre,
        next: next,
      }
    },
    download_data(target) {
      if (target === 0) {
        window.open('https://github.com/panghaibin/RiskLevelAPI/archive/refs/heads/api.zip');
      } else if (target === 1) {
        window.open('https://gh-proxy.caduo.ml/https://github.com/panghaibin/RiskLevelAPI/archive/refs/heads/api.zip');
      }
    },
    scroll_to(to) {
      this.$router.push({
        path: "",
        hash: to,
        replace: true,
      })
    },
    handle_tabs_click(tab) {
      this.scroll_to(tab.props.name)
    },
  },
  watch: {
    filter_text(value) {
      value = value.trim()
      while (value.includes("  ")) {
        value = value.replace("  ", " ")
      }
      this.high.count = 0
      this.$refs.high_tree.filter(value)
      this.middle.count = 0
      this.$refs.middle_tree.filter(value)
      if (!this.low.used) {
        return
      }
      this.low.count = 0
      this.$refs.low_tree.filter(value)
    }
  }
}

</script>

<style scoped>
.high-risk, .middle-risk, .low-risk {
  margin-top: 1.1em;
  margin-bottom: 0.2em;
  overflow-y: auto;
  font-weight: bold;
}

.high-risk-tab-label, .middle-risk-tab-label, .low-risk-tab-label {
  font-weight: bold;
}

.high-risk-tab-label .num, .high-risk .num {
  color: #f26161;
}

.middle-risk-tab-label .num, .middle-risk .num {
  color: #fdbe34;
}

.low-risk-tab-label .num, .low-risk .num {
  color: #0f59a4;
}

.expand-all {
  margin-left: 20px;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 2em;
  max-height: 100%;
}

.tag-item {
  /*font-size: 14px;*/
  cursor: pointer;
  margin: 0.25rem;
}

.tag-list {
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.item-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.history-pre-next {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 1em;
}

.history-pre-next-disabled {
  opacity: 0.5;
  pointer-events: none;
}

</style>
<style>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.el-icon.is-loading {
  animation: rotating 2s linear infinite;
  vertical-align: text-top;
}

.el-tree__empty-text {
  width: 100%;
}

.el-tree-node__content {
  height: auto;
}

.el-tree-node {
  white-space: break-spaces;
}

.tree-node {
  padding: 1px;
}

.notification-item {
  width: 230px;
}

.history-icon {
  float: right;
  vertical-align: text-top;
}

.history-icon .el-button {
  padding: 0;
  height: auto;
  font-size: 1em;
}

.history-icon .el-button .history-text {
  font-size: 0.8em;
  margin: 0;
}

.el-dialog__body {
  padding: 10px;
}

.risk-tab-label {
  background-color: #fff;
}

@media (prefers-color-scheme: dark) {
  .el-tabs__item {
    color: #e2e2e2;
  }

  .el-tabs__item:hover {
    color: var(--el-color-primary);
    cursor: pointer;
  }

  .el-tabs__item:active {
    color: var(--el-color-primary);
    cursor: pointer;
  }

  .risk-tab-label {
    background-color: #121212;
    color: #e2e2e2;
  }

  .notification-item {
    background-color: #1f1f1f;
    color: #fff;
    border-color: #73767a;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.12);
  }

  .el-skeleton, .el-input.is-disabled {
    filter: invert(85%);
  }

  .el-overlay {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .el-dialog {
    background-color: #191919;
  }

  .el-dialog__title {
    color: #fff;
  }

  tr, td, th {
    background-color: #191919 !important;
    border-color: #73767a;
    border-bottom: 1px solid #73767a !important;
    color: #ffffff;
  }

  tr:hover, td:hover, th:hover {
    background-color: #1f1f1f !important;
  }

  .el-table {
    --el-table-border-color: #73767a !important;
    --el-table-bg-color: #191919 !important;
  }
}
</style>