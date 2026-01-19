export const themeData = JSON.parse("{\"encrypt\":{},\"author\":{\"name\":\"NAN\",\"url\":\"https://github.com/open-nan\"},\"repo\":\"export-nan/nan-blogs\",\"docsBranch\":\"docs\",\"docsDir\":\"src\",\"blog\":{\"name\":\"NAN\",\"avatar\":\"/avatar.JPG\",\"description\":\"一个前端开发者\",\"intro\":\"/intro.html\",\"roundAvatar\":true},\"locales\":{\"/\":{\"lang\":\"en-US\",\"navbarLocales\":{\"langName\":\"English\",\"selectLangAriaLabel\":\"Select language\"},\"metaLocales\":{\"author\":\"Author\",\"date\":\"Writing Date\",\"origin\":\"Original\",\"views\":\"Page views\",\"category\":\"Category\",\"tag\":\"Tag\",\"readingTime\":\"Reading Time\",\"words\":\"Words\",\"toc\":\"On This Page\",\"prev\":\"Prev\",\"next\":\"Next\",\"contributors\":\"Contributors\",\"editLink\":\"在 GitHub 上编辑此页\",\"print\":\"Print\"},\"blogLocales\":{\"article\":\"Articles\",\"articleList\":\"Article List\",\"category\":\"Category\",\"tag\":\"Tag\",\"timeline\":\"Timeline\",\"timelineTitle\":\"Yesterday Once More!\",\"all\":\"All\",\"intro\":\"Personal Intro\",\"star\":\"Star\",\"empty\":\"No $text\"},\"paginationLocales\":{\"prev\":\"Prev\",\"next\":\"Next\",\"navigate\":\"Jump to\",\"action\":\"Go\",\"errorText\":\"Please enter a number between 1 and $page !\"},\"outlookLocales\":{\"themeColor\":\"Theme Color\",\"darkmode\":\"Theme Mode\",\"fullscreen\":\"Full Screen\"},\"routerLocales\":{\"skipToContent\":\"Skip to main content\",\"notFoundTitle\":\"Page not found\",\"notFoundMsg\":[\"There’s nothing here.\",\"How did we get here?\",\"That’s a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"back\":\"Go back\",\"home\":\"Take me home\"},\"navbar\":[\"/\",{\"text\":\"学习笔记\",\"icon\":\"edit\",\"link\":\"/note/\"},{\"text\":\"建站日志\",\"icon\":\"any\",\"link\":\"/site-log/\"},{\"text\":\"其他\",\"icon\":\"any\",\"link\":\"/other/\"}],\"sidebar\":{\"/\":[\"\",{\"text\":\"学习笔记\",\"icon\":\"edit\",\"prefix\":\"note/\",\"children\":\"structure\"},{\"text\":\"建站日志\",\"icon\":\"log\",\"prefix\":\"site-log/\",\"children\":\"structure\"}]},\"displayFooter\":true}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
