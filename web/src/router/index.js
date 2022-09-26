import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView'
import RecordIndexView from '../views/record/RecordIndexView'
import UserBotIndexView from '../views/user/list/UserBotIndexView'
import NotFoundView from '../views/error/NotFoundView'
import RankListView from '../views/ranklist/RankListView'
const routes = [
  {
    path:"/",
    name:"home",
    redirect:"pk"
  },
  {
    path:"/pk/",
    name:"pk_index",
    component:PkIndexView
  },
  {
    path:"/record",
    name:"record_index",
    component:RecordIndexView
  },
  {
    path:"/userbot/",
    name:"user_bot_index",
    component:UserBotIndexView
  },
  {
    path:"/404/",
    name:"404",
    component:NotFoundView
  },
  {
    path:"/ranklist/",
    name:"rank_list",
    component:RankListView
  },
  {
    path:"/:catchAll(.*)",
    redirect:"404"
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
