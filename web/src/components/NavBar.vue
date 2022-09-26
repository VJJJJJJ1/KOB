<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <!-- <a class="navbar-brand" href="#">King of Bot</a> -->
      <router-link class="navbar-brand" :to="{name:'home'}">King of Bot</router-link>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <a class="nav-link" aria-current="page" href="#">对战</a> -->
            <router-link :class="route_name == 'pk_index'?'nav-link active':'nav-link'" aria-current="page" :to="{name:'pk_index'}">对战</router-link>
          </li> 
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">对局列表</a> -->
            <router-link :class="route_name == 'record_index'?'nav-link active':'nav-link'" :to="{name:'record_index'}">对局列表</router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">排行榜</a> -->
            <router-link :class="route_name == 'rank_list'?'nav-link active':'nav-link'" :to="{name:'rank_list'}">排行榜</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            VJJJJJJ
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- <li><a class="dropdown-item" href="#">我的Bot</a></li> -->
            <li><router-link class="dropdown-item" :to="{name:'user_bot_index'}">我的Bot</router-link></li>
            <!-- <li><hr class="dropdown-divider"></li> -->
            <li><a class="dropdown-item" href="#">退出</a></li>
          </ul>
        </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed  } from 'vue'

export default{
    setup() {
        const route = useRoute();
        let route_name = computed(() => route.name);
        return {
            route_name
        }
    }
}
</script>

<style scoped>

</style>