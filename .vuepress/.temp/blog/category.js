export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Javascript/Typescript\":{\"path\":\"/category/javascripttypescript/\",\"indexes\":[0,1,2,3,4,5,6]},\"GO\":{\"path\":\"/category/go/\",\"indexes\":[7,8,9,10,11,12,13]},\"操作系统\":{\"path\":\"/category/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/\",\"indexes\":[14]},\"graphics\":{\"path\":\"/category/graphics/\",\"indexes\":[15,16,17,18,19]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"vuepress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[20,21]},\"markdown\":{\"path\":\"/tag/markdown/\",\"indexes\":[20,21]},\"es6\":{\"path\":\"/tag/es6/\",\"indexes\":[4]},\"vue\":{\"path\":\"/tag/vue/\",\"indexes\":[0,5]},\"源码\":{\"path\":\"/tag/%E6%BA%90%E7%A0%81/\",\"indexes\":[5]},\"harmonyOS\":{\"path\":\"/tag/harmonyos/\",\"indexes\":[22,23,24,25]},\"Webgl\":{\"path\":\"/tag/webgl/\",\"indexes\":[1,2,3,6]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

