import Vue from 'vue';
import Router from 'vue-router';
import Seller from 'components/seller/Seller';
import Goods from 'components/goods/Goods';
import Ratings from 'components/ratings/Ratings';

Vue.use(Router);
const routes = [
  {path: '/', component: Goods},
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings},
  {path: '/seller', name: 'seller', component: Seller}
];

export default new Router({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active' // 配置路由active样式class
});
