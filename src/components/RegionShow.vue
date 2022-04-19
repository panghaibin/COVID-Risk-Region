<template>
  <!--  <p>{{ data_url }}</p>-->
  <!--  <p v-if="ok">{{ raw_data.data.highlist }}</p>-->
  <!--  <ul v-if="ok">-->
  <!--    <li v-for="high in raw_data.data.highlist" :key="high">{{ high }}</li>-->
  <!--  </ul>-->
  <template v-if="ok">
    <el-tree :data="high_list"/>
    <br>
    <el-tree :data="middle_list"/>
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
      high_list: null,
      middle_list: null
    }
  },
  mounted() {
    let that = this
    axios
        .get(this.data_url)
        .then(function (response) {
          that.raw_data = response.data
          that.high_list = list2tree(that.raw_data.data.highlist)
          that.middle_list = list2tree(that.raw_data.data.middlelist)

          that.ok = true
          console.log(that.middle_list)
        })
        .catch(function (error) {
          console.log(error)
        })
  },
}

function list2tree(list) {
  /*
  list:
     [{
        "province": "北京市",
        "city": "朝阳区",
        "county": "酒仙桥街道",
        "communitys": [
          "二街坊",
          "三街坊",
          "四街坊",
        ]
      },
      {
        "province": "河北省",
        "city": "廊坊市",
        "county": "安次区",
        "communitys": [
          "葛渔城镇全域",
          "葛渔城镇全域2",
        ]
      },
      ......
      ]
  * */
  let tree = []
  /*
  tree:
     [{
        "label": "北京市",
        "children": [
          {
            "label": "朝阳区",
            "children": [
              {
                "label": "酒仙桥街道",
                "children": [
                  {
                    "label": "二街坊"
                  },
                  {
                    "label": "三街坊"
                  },
                  {
                    "label": "四街坊"
                  }
                ]
              }
            ]
          }
        },
        {
          "label": "河北省",
          "children": [
            {
              "label": "廊坊市",
              "children": [
                {
                  "label": "安次区",
                  "children": [
                    {
                      "label": "葛渔城镇全域"
                    },
                    {
                      "label": "葛渔城镇全域2"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ......
      ]
  * */

  // transform list to tree as the above structure
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
    // let province_index = -1
    // let city_index = -1
    // let county_index = -1
    // let communitys_index = -1
    for (let j = 0; j < tree.length; j++) {
      let tree_item = tree[j]
      if (tree_item.label === province) {
        province_item = tree_item
        // province_index = j
        break
      }
    }
    if (province_item === null) {
      province_item = {
        label: province,
        children: []
      }
      tree.push(province_item)
      // eslint-disable-next-line no-unused-vars
      // province_index = tree.length - 1
    }
    for (let j = 0; j < province_item.children.length; j++) {
      let province_item_child = province_item.children[j]
      if (province_item_child.label === city) {
        city_item = province_item_child
        // city_index = j
        break
      }
    }
    if (city_item === null) {
      city_item = {
        label: city,
        children: []
      }
      province_item.children.push(city_item)
      // eslint-disable-next-line no-unused-vars
      // city_index = province_item.children.length - 1
    }

    for (let j = 0; j < city_item.children.length; j++) {
      let city_item_child = city_item.children[j]
      if (city_item_child.label === county) {
        county_item = city_item_child
        // county_index = j
        break
      }
    }
    if (county_item === null) {
      county_item = {
        label: county,
        children: []
      }
      city_item.children.push(county_item)
      // eslint-disable-next-line no-unused-vars
      // county_index = city_item.children.length - 1
    }
    for (let j = 0; j < county_item.children.length; j++) {
      let county_item_child = county_item.children[j]
      if (county_item_child.label === communitys) {
        communitys_item = county_item_child
        // communitys_index = j
        break
      }
    }
    if (communitys_item === null) {
      // console.log('communitys_item', communitys)
      communitys_item = []
      for (let j = 0; j < communitys.length; j++) {
        county_item.children.push({
          label: communitys[j]
        })
      }
      // communitys_item = {
      //   label: communitys,
      //   children: []
      // }
      // county_item.children.push(communitys_item)
      // eslint-disable-next-line no-unused-vars
      // communitys_index = county_item.children.length - 1
    }
    // communitys_item.children.push({
    //   label: item.name
    // })
  }
  return tree

  // for (let i = 0; i < list.length; i++) {
  //   let item = list[i]
  //   let province = item.province
  //   let city = item.city
  //   let county = item.county
  //   let area_name = item.area_name
  //   let communitys = item.communitys
  //   let province_item = null
  //   let city_item = null
  //   let county_item = null
  //   let area_name_item = null
  //   let communitys_item = null
  //   let province_index = -1
  //   let city_index = -1
  //   let county_index = -1
  //   let area_name_index = -1
  //   let communitys_index = -1
  //   for (let j = 0; j < tree.length; j++) {
  //     let tree_item = tree[j]
  //     if (tree_item.label === province) {
  //       province_item = tree_item
  //       province_index = j
  //       break
  //     }
  //   }
  //   if (province_item === null) {
  //     province_item = {
  //       label: province,
  //       children: []
  //     }
  //     tree.push(province_item)
  //     // eslint-disable-next-line no-unused-vars
  //     province_index = tree.length - 1
  //   }
  //   for (let j = 0; j < province_item.children.length; j++) {
  //     let province_item_child = province_item.children[j]
  //     if (province_item_child.label === city) {
  //       city_item = province_item_child
  //       city_index = j
  //       break
  //     }
  //   }
  //   if (city_item === null) {
  //     city_item = {
  //       label: city,
  //       children: []
  //     }
  //     province_item.children.push(city_item)
  //     // eslint-disable-next-line no-unused-vars
  //     city_index = province_item.children.length - 1
  //   }
  //   for (let j = 0; j < city_item.children.length; j++) {
  //     let city_item_child = city_item.children[j]
  //     if (city_item_child.label === county) {
  //       county_item = city_item_child
  //       county_index = j
  //       break
  //     }
  //   }
  //   if (county_item === null) {
  //     county_item = {
  //       label: county,
  //       children: []
  //     }
  //     city_item.children.push(county_item)
  //     // eslint-disable-next-line no-unused-vars
  //     county_index = city_item.children.length - 1
  //   }
  //   for (let j = 0; j < county_item.children.length; j++) {
  //     let county_item_child = county_item.children[j]
  //     if (county_item_child.label === area_name) {
  //       area_name_item = county_item_child
  //       area_name_index = j
  //       break
  //     }
  //   }
  //   if (area_name_item === null) {
  //     area_name_item = {
  //       label: area_name,
  //       children: []
  //     }
  //     county_item.children.push(area_name_item)
  //     // eslint-disable-next-line no-unused-vars
  //     area_name_index = county_item.children.length - 1
  //   }
  //   for (let j = 0; j < area_name_item.children.length; j++) {
  //     let area_name_item_child = area_name_item.children[j]
  //     if (area_name_item_child.label === communitys) {
  //       communitys_item = area_name_item_child
  //       communitys_index = j
  //       break
  //     }
  //   }
  //   if (communitys_item === null) {
  //     communitys_item = {
  //       label: communitys,
  //       children: []
  //     }
  //     area_name_item.children.push(communitys_item)
  //     // eslint-disable-next-line no-unused-vars
  //     communitys_index = area_name_item.children.length - 1
  //   }
  //   communitys_item.children.push(item)
  // }
  // return tree
}
// function list2tree(that, data_type, data_list) {
//   let data_tree = []
//   if (data_type === 'h') {
//     data_tree.push({'label': "高风险地区", 'children': []})
//   } else if (data_type === 'm') {
//     data_tree.push({'label': "中风险地区", 'children': []})
//   }
//
//   for (let i = 0; i < data_list.length; i++) {
//     let region = data_list[i]
//
//     for (let j = 0; j < data_tree.length; j++) {
//       let province = data_tree[j]
//       if (region.province === province.label) {
//         for (let k = 0; k < province.length; k++) {
//           let city = province[k]
//           if (region.province.city === city.label) {
//             city.children.push({'label': region.province.city, 'children': []})
//           }
//         }
//         // province.children.push({'label': region.area_name, 'children': []})
//         // break
//       } else if (j === data_tree.length - 1) {
//         data_tree.push({'label': region.province, 'children': [{'label': region.province.city, 'children': []}]})
//       }
//     }
//   }
//
//   if (data_type === 'h') {
//     that.high_list = data_tree
//   } else if (data_type === 'm') {
//     that.middle_list = data_tree
//   }
// }

</script>

<style scoped>

</style>