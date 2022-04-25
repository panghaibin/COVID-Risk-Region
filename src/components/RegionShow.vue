<template>
  <div v-if="!err">
    <p v-if="ok">以下信息截止自{{ raw.data.end_update_time }}</p>
    <p v-else>加载中……</p>
    <el-input
        :disabled="!ok"
        ref="filter_input"
        v-model="filter_text"
        placeholder="请输入区域名称"
        clearable
        @clear="tag_add($refs.filter_input.input.value)"
        @change="tag_add"
    >
    </el-input>
    <div :class="ok ? 'tag-list' : ['tag-list', 'tag-list-disabled']">
      <el-tag
          v-for="(item, index) in filter_history"
          :key="index"
          :closable="true"
          @close="tag_remove(index)"
          @click="$refs.filter_input.focus();filter_text=item;tag_add(item)"
          class="tag-item"
      >
        {{ item }}
      </el-tag>
    </div>
    <h3 class="high-risk">
      高风险等级地区
      <span class="num">({{ high.count }})</span>
      <el-button ref="high_button" class="expand-all" type="primary" @click="high_expand" :disabled="!ok">
        {{ high.expand_all_button }}
      </el-button>
    </h3>
    <el-tree
        v-if="ok"
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
    <h3 class="middle-risk">
      中风险等级地区
      <span class="num">({{ middle.count }})</span>
      <el-button class="expand-all" type="primary" @click="middle_expand" :disabled="!ok">
        {{ middle.expand_all_button }}
      </el-button>
    </h3>
    <el-tree
        v-if="ok"
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
    data_url: String
  },
  data() {
    return {
      raw: null,
      ok: false,
      err: false,
      err_msg: "",

      high: {
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
        tree: null,
        count: '-',
        province_id_list: [],
        city_id_list: [],
        county_id_list: [],
        default_id_list: [],
        expand_all: false,
        expand_all_button: "展开",
      },

      tree_props: {
        label: 'label',
        children: 'children',
        class: 'tree-node',
      },

      filter_text: "",
      filter_history: [
        "北京",
        "上海",
        "江苏",
      ],
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      window.vue = this;
    }
    if (!localStorage.getItem("latest_timestamp")
        || !localStorage.getItem("latest")
        || (new Date().getTime() - localStorage.getItem("latest_timestamp")) > 5 * 60 * 1000
    ) {
      this.fetch_data(this.data_url + "?t=" + new Date().getTime());
    } else {
      this.raw = JSON.parse(localStorage.getItem("latest"));
      this.high_init();
      this.middle_init();
      this.ok = true;
    }
    if (localStorage.getItem("filter_history")
        && localStorage.getItem("filter_history") !== ""
        && localStorage.getItem("filter_history") !== "[]"
    ) {
      this.filter_history = JSON.parse(localStorage.getItem("filter_history"));
    } else {
      localStorage.setItem("filter_history", JSON.stringify(this.filter_history));
    }
  },
  methods: {
    fetch_data: function (url) {
      let that = this
      axios
          .get(url)
          .then(function (response) {
            let raw = response.data
            let msg
            let update_required = false
            if (that.ok) {
              if (that.raw.data["end_update_time"] !== raw.data["end_update_time"]) {
                msg = "数据更新成功"
                update_required = true
              } else {
                msg = "已是最新数据"
              }
            } else {
              msg = "数据加载成功"
              update_required = true
            }
            ElNotification.success({
              message: msg,
              duration: 2500,
              position: 'bottom-right',
              showClose: false,
              customClass: 'notification-item',
            })
            if (update_required) {
              that.raw = raw
              that.high_init()
              that.middle_init()
              that.ok = true
              localStorage.setItem("latest", JSON.stringify(raw));
            }
            localStorage.setItem("latest_timestamp", new Date().getTime().toString());
          })
          .catch(function (error) {
            console.log(error)
            let msg
            if (that.ok) {
              msg = "数据更新失败<br>已显示缓存数据"
              ElNotification.info({
                message: msg,
                duration: 2500,
                position: 'bottom-right',
                showClose: false,
                customClass: 'notification-item',
                dangerouslyUseHTMLString: true,
              })
            } else {
              that.err_msg = error
              that.err = true
            }
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
      this.high.count = this.raw.data["hcount"]
    },
    middle_init() {
      this.list2tree(this.raw.data["middlelist"], this.middle)
      this.middle.count = this.raw.data["mcount"]
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
    }
  }
}

</script>

<style scoped>
.high-risk, .middle-risk {
  margin-top: 1.1em;
  margin-bottom: 0.2em;
  overflow-y: auto;
  font-weight: bold;
}

.high-risk .num {
  color: #f26161;
}

.middle-risk .num {
  color: #fdbe34;
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

.tag-list-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
<style>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
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
</style>