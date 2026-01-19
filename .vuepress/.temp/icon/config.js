import { hasGlobalComponent } from "/Users/nan/code/nan-dome/nan-blogs/node_modules/@vuepress/helper/lib/client/index.js";
import { h } from "vue";
import { VPIcon } from "/Users/nan/code/nan-dome/nan-blogs/node_modules/@vuepress/plugin-icon/lib/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "unknown",
            prefix: "",
            ...props,
          })
      )
    }
  },
  setup: () => {

  },
}
