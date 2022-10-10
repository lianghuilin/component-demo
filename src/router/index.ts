import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/bar-chart',
    component: () => import('../views/bar-chart/index.vue'),
  },
  {
    path: '/line-chart',
    name: 'line-chart',
    component: () => import('../views/line-chart/index.vue'),
  },
  {
    path: '/bar-chart',
    name: 'bar-chart',
    component: () => import('../views/bar-chart/index.vue'),
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/table/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes, // 路由规则
});


export default router;
