<template>
  <template v-if="ok">
    <el-input v-model="filterText" placeholder="请输入区域名称"></el-input>
    <p>高风险</p>
    <el-tree
        :data="high_tree"
        node-key="id"
        :default-expanded-keys="high_id_list"
    />
    <p>中风险</p>
    <el-tree
        :data="middle_tree"
        node-key="id"
        :default-expanded-keys="middle_id_list"
    />
  </template>
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
      raw_data: null,
      ok: false,
      high_tree: null,
      high_id_list: null,
      middle_tree: null,
      middle_id_list: null
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
          that.high_id_list = high["id_list"]
          let middle = list2tree(raw.data.middlelist)
          that.middle_tree = middle["tree"]
          that.middle_id_list = middle["id_list"]

          that.ok = true
          // console.log(that.middle_tree)
        })
        .catch(function (error) {
          console.log(error)
        })
  },
}

function list2tree(list) {
  let tree = []
  let id_count = 0
  let id_list = []
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
        children: []
      }
      tree.push(province_item)
      id_list.push(province_item.id)
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
        children: []
      }
      province_item.children.push(city_item)
      // id_list.push(city_item.id)
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
        children: []
      }
      city_item.children.push(county_item)
      // id_list.push(county_item.id)
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
    "id_list": id_list
  }

}

</script>

<style scoped>

</style>