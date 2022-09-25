<template>
  <div>
    <div> Bot 昵称：{{ bot_name }}</div>
    <div> Bot 战力：{{ bot_rating }}</div>
  </div>
  <router-view/>
</template>

<script>

import { ref } from "vue";
import $ from "jquery";

export default{
  name:"App",
  setup: () =>{
    let bot_name = ref("");
    let bot_rating = ref("");

    $.ajax({
      url:"http://localhost:3000/pk/getBotinfo/",
      type: "get",
      success: resp => {
        // console.log(resp);
        bot_name.value = resp.name;
        bot_rating.value = resp.rating;
      }
    });

    return{
      bot_name,
      bot_rating
    }
  }
}
</script>

<style>
body{
  background-image: url("@/assets/background.png");
  background-size : cover; 
}
</style>
