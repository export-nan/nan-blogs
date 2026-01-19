import CodeDemo from "/Users/nan/code/nan-dome/nan-blogs/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/nan/code/nan-dome/nan-blogs/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import Playground from "/Users/nan/code/nan-dome/nan-blogs/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("Playground", Playground);
  },
};
