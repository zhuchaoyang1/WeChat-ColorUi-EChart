/** 自定义Bar路由管理文件 */
let app = getApp();

let routerArr = new Array();

/**
 * 路由进入
 */
let setPage = path => {
  let pageCount = app.globalData.pageCount;
  routerArr[pageCount] = path;
  app.globalData.pageCount += 1;
  console.log(routerArr);
}

/**
 *  取栈顶元素
 */
let getLastPage = () => {
  let pageCount = app.globalData.pageCount;
  let topPage = routerArr[pageCount - 1];
  app.globalData.pageCount -= 1;
  return topPage;
}

module.exports = {
  setPage: setPage,
  getLastPage: getLastPage
}