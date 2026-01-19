import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/Users/nan/code/nan-dome/nan-blogs/node_modules/vuepress-theme-hope/lib/client/exports/base.js";

import { defineCatalogInfoGetter } from "/Users/nan/code/nan-dome/nan-blogs/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { Blog, BloggerInfo, SocialMedias, setupBlog } from "/Users/nan/code/nan-dome/nan-blogs/node_modules/vuepress-theme-hope/lib/client/exports/blog.js";
import "/Users/nan/code/nan-dome/nan-blogs/node_modules/vuepress-theme-hope/lib/client/styles/blog/layout.scss";

import "/Users/nan/code/nan-dome/nan-blogs/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "/Users/nan/code/nan-dome/nan-blogs/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "/Users/nan/code/nan-dome/nan-blogs/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "/Users/nan/code/nan-dome/nan-blogs/node_modules/vuepress-theme-hope/lib/client/styles/index.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("SocialMedias", SocialMedias);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    Blog,
  }
};
