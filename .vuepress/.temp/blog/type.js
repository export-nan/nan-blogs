export const typesMap = JSON.parse("{\"article\":{\"/\":{\"path\":\"/article/\",\"indexes\":[20,21,0,1,2,3,4,5,14,26,27,28,29,30,31,32,7,8,9,10,11,12,13,33,22,23,24,25,34,35,6,36,15,16,17,18,19]}},\"star\":{\"/\":{\"path\":\"/star/\",\"indexes\":[20,21]}},\"timeline\":{\"/\":{\"path\":\"/timeline/\",\"indexes\":[0,1,2,3,20,4,5,21,14]}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

