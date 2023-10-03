import { createRouter, createWebHistory } from 'vue-router'
import { useRouterLoadingStore } from "@/stores/routerLoadingStore.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'preloader',
      component: () => import('../views/PreloaderView.vue'),
      meta: { oneWay: true }
    },
    {
      path: '/baseline',
      name: 'baseline',
      component: () => import('../views/BaselineView.vue'),
      meta: { oneWay: true }
    },       
    /*{
      path: '/experiment',
      name: 'experiment',
      component: () => import('../views/ExperimentView.vue'),
      meta: { oneWay: true }
    },*/
    {
      path: '/end',
      name: 'end',
      component: () => import('../views/EndView.vue'),
      meta: { oneWay: true }
    },
  ]
})

//"oneWay" routes are only allowed to move forward, back button is efffectively disabled
router.beforeEach(async (to, from, next) => {
  window.onbeforeunload = function () {
    return "Are you sure you want to leave?";
  };
  if (from.meta.oneWay == true) {
    let routes = router.getRoutes();
    let currentRoutePos;
    for (let r = 0; r < routes.length; r++) {
      if (routes[r].path == from.path) {
        currentRoutePos = r;
        break;
      }
    }
    if (routes[currentRoutePos + 1] != null && routes[currentRoutePos + 1].path == to.path) {
      const routerLoadingStore = useRouterLoadingStore();
      routerLoadingStore.routerLoading = true;
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
})

router.afterEach(() => {
  const routerLoadingStore = useRouterLoadingStore();
  routerLoadingStore.routerLoading = false;
})

export default router
