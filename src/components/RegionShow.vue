<template>
  <el-main v-if="!ok">
    Loading...
  </el-main>
  <el-main v-if="ok">
    <el-input v-model="filter_text" placeholder="请输入区域名称"></el-input>
    <h3 id="high-risk">
      高风险等级地区
      <span class="num">({{ raw.data.hcount }})</span>
      <el-button class="expand-all" type="primary" @click="high_expand">{{ high_expand_all_button }}</el-button>
    </h3>
    <el-tree
        :data="high_tree"
        node-key="id"
        :default-expand-all="high_expand_all"
        :default-expanded-keys="high_default_id_list"
        :auto-expand-parent="false"
        ref="high_tree"
        :filter-node-method="filter_high_node"
    />
    <h3 id="middle-risk">
      中风险等级地区
      <span class="num">({{ raw.data.mcount }})</span>
      <el-button class="expand-all" type="primary" @click="middle_expand">{{ middle_expand_all_button }}</el-button>
    </h3>
    <el-tree
        :data="middle_tree"
        node-key="id"
        :default-expand-all="middle_expand_all"
        :default-expanded-keys="middle_default_id_list"
        :auto-expand-parent="false"
        ref="middle_tree"
        :filter-node-method="filter_middle_node"
    />
  </el-main>
</template>

<script>
import axios from "axios";

export default {
  name: "RegionShow",
  props: {
    data_url: String
  },
  data() {
    return {
      raw: null,
      ok: false,
      high_tree: null,
      high_city_id_list: null,
      high_province_id_list: null,
      high_county_id_list: null,
      high_default_id_list: null,
      high_expand_all: false,
      high_expand_all_button: "展开",

      middle_tree: null,
      middle_city_id_list: null,
      middle_province_id_list: null,
      middle_county_id_list: null,
      middle_default_id_list: null,
      middle_expand_all: false,
      middle_expand_all_button: "展开",

      filter_text: ""
    }
  },
  mounted() {
    let loading = this.$loading()
    let that = this
    axios
        .get(this.data_url)
        .then(function (response) {
          let raw = response.data
          that.raw = raw
          let high = list2tree(raw.data.highlist)
          that.high_tree = high["tree"]
          that.high_province_id_list = high["province_id_list"]
          that.high_city_id_list = high["city_id_list"]
          that.high_county_id_list = high["county_id_list"]
          that.high_default_id_list = that.high_province_id_list.concat(that.high_county_id_list)

          let middle = list2tree(raw.data.middlelist)
          that.middle_tree = middle["tree"]
          that.middle_province_id_list = middle["province_id_list"]
          that.middle_city_id_list = middle["city_id_list"]
          that.middle_county_id_list = middle["county_id_list"]
          that.middle_default_id_list = that.middle_province_id_list.concat(that.middle_county_id_list)

          loading.close()
          that.ok = true
          // console.log(that.middle_tree)
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  methods: {
    high_expand() {
      this.high_expand_all = !this.high_expand_all
      if (this.high_expand_all) {
        let id_list = this.high_default_id_list.concat(this.high_city_id_list)
        for (let i = 0; i < id_list.length; i++) {
          this.$refs.high_tree.store.getNode(id_list[i]).expanded = true;
        }
      } else {
        for (let i = 0; i < this.high_city_id_list.length; i++) {
          this.$refs.high_tree.store.getNode(this.high_city_id_list[i]).expanded = false;
        }
      }
      this.high_expand_all_button = this.high_expand_all ? "收起" : "展开"
    },
    middle_expand() {
      this.middle_expand_all = !this.middle_expand_all
      if (this.middle_expand_all) {
        let id_list = this.middle_default_id_list.concat(this.middle_city_id_list)
        for (let i = 0; i < id_list.length; i++) {
          this.$refs.middle_tree.store.getNode(id_list[i]).expanded = true;
        }
      } else {
        for (let i = 0; i < this.middle_city_id_list.length; i++) {
          this.$refs.middle_tree.store.getNode(this.middle_city_id_list[i]).expanded = false;
        }
      }
      this.middle_expand_all_button = this.middle_expand_all ? "收起" : "展开"
    },
    filter_high_node(value, data) {
      if (!value) return true
      if (data.label.includes(value)) {
        return true
      }
      let parent_id = data.pid
      while (parent_id !== -1) {
        let parent_node = this.$refs.high_tree.store.getNode(parent_id).data
        if (parent_node.label.includes(value)) {
          return true
        }
        parent_id = parent_node.pid
      }
      return false
    },
    filter_middle_node(value, data) {
      if (!value) return true
      if (data.label.includes(value)) {
        return true
      }
      let parent_id = data.pid
      while (parent_id !== -1) {
        let parent_node = this.$refs.middle_tree.store.getNode(parent_id).data
        if (parent_node.label.includes(value)) {
          return true
        }
        parent_id = parent_node.pid
      }
      return false
    },
  },
  watch: {
    filter_text(value) {
      this.$refs.high_tree.filter(value)
      this.$refs.middle_tree.filter(value)
    }
  }
}

function list2tree(list) {
  let tree = []
  let id_count = 0
  let province_id_list = []
  let city_id_list = []
  let county_id_list = []
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    let province = item.province
    let city = item.city
    let county = item.county
    let communitys = item.communitys
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
      // console.log('communitys_item', communitys)
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
  return {
    "tree": tree,
    "province_id_list": province_id_list,
    "city_id_list": city_id_list,
    "county_id_list": county_id_list
  }

}

</script>

<style scoped>
#high-risk, #middle-risk {
  margin-top: 1.1em;
  margin-bottom: 0.2em;
  overflow-y: auto;
  font-weight: bold;
}

#high-risk .num {
  color: #f26161;
}

#middle-risk .num {
  color: #fdbe34;
}

.expand-all {
  margin-left: 20px;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 2em;
  max-height: 100%;
}

</style>