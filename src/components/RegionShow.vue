<template>
  <el-container v-if="ok">
    <el-main>
      <!--    <el-input v-model="filter_text" placeholder="请输入区域名称"></el-input>-->
      <h3 id="high-risk">
        高风险地区
        <span class="num">({{ raw.data.hcount }})</span>
        <el-button class="expanded-all" type="primary" @click="high_expand">{{ high_expand_all_button }}</el-button>
      </h3>
      <el-tree
          :data="high_tree"
          node-key="id"
          :default-expand-all="high_expand_all"
          :default-expanded-keys="high_default_id_list"
          ref="high_tree"
      />
      <h3 id="middle-risk">
        中风险地区
        <span class="num">({{ raw.data.mcount }})</span>
        <el-button class="expanded-all" type="primary" @click="middle_expand">{{ middle_expand_all_button }}</el-button>
      </h3>
      <el-tree
          :data="middle_tree"
          node-key="id"
          :default-expand-all="middle_expand_all"
          :default-expanded-keys="middle_default_id_list"
          ref="middle_tree"
      />
    </el-main>
  </el-container>
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
      high_all_id_list: null,
      high_default_id_list: null,
      high_expand_all: false,
      high_expand_all_button: "展开",

      middle_tree: null,
      middle_all_id_list: null,
      middle_default_id_list: null,
      middle_expand_all: false,
      middle_expand_all_button: "展开",

      filter_text: ""
    }
  },
  mounted() {
    let that = this
    axios
        .get(this.data_url)
        .then(function (response) {
          let raw = response.data
          that.raw = raw
          let high = list2tree(raw.data.highlist)
          that.high_tree = high["tree"]
          that.high_default_id_list = high["default_id_list"]
          that.high_all_id_list = high["all_id_list"]
          let middle = list2tree(raw.data.middlelist)
          that.middle_tree = middle["tree"]
          that.middle_default_id_list = middle["default_id_list"]
          that.middle_all_id_list = middle["all_id_list"]

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
        for (let i = 0; i < this.$refs.high_tree.store._getAllNodes().length; i++) {
          this.$refs.high_tree.store._getAllNodes()[i].expanded = true;
        }
      } else {
        for (let i = 0; i < this.high_all_id_list.length; i++) {
          this.$refs.high_tree.store.getNode(this.high_all_id_list[i]).expanded = false;
        }
      }
      this.high_expand_all_button = this.high_expand_all ? "收起" : "展开"
    },
    middle_expand() {
      this.middle_expand_all = !this.middle_expand_all
      if (this.middle_expand_all) {
        for (let i = 0; i < this.$refs.middle_tree.store._getAllNodes().length; i++) {
          this.$refs.middle_tree.store._getAllNodes()[i].expanded = true;
        }
      } else {
        for (let i = 0; i < this.middle_all_id_list.length; i++) {
          this.$refs.middle_tree.store.getNode(this.middle_all_id_list[i]).expanded = false;
        }
      }
      this.middle_expand_all_button = this.middle_expand_all ? "收起" : "展开"
    },
    filter_high_node(value, data) {
      if (!value) return true
      return data.label.includes(value)
    },
    filter_middle_node(value, data) {
      if (!value) return true
      return data.label.includes(value)
    }
  }
}

function list2tree(list) {
  let tree = []
  let id_count = 0
  let default_id_list = []
  let all_id_list = []
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
        label: province,
        children: [],
        expanded: true
      }
      tree.push(province_item)
      default_id_list.push(province_item.id)
      // all_id_list.push(province_item.id)
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
        label: city,
        children: [],
        expanded: true
      }
      province_item.children.push(city_item)
      // id_list.push(city_item.id)
      all_id_list.push(city_item.id)
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
        label: county,
        children: [],
        expanded: true
      }
      city_item.children.push(county_item)
      // id_list.push(county_item.id)
      // all_id_list.push(county_item.id)
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
          label: communitys[j]
        })
      }
    }
  }
  return {
    "tree": tree,
    "default_id_list": default_id_list,
    "all_id_list": all_id_list
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
  color: #c45656;
}

#middle-risk .num {
  color: #ffa500;
}

.expanded-all {
  margin-left: 20px;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 2em;
  max-height: 100%;
}

</style>