<template>
    <!-- 让下面函数返回的parent和canvas与html部分产生关联 -->
    <div ref = "parent" class = "gamemap">   
        <canvas ref = "canvas"></canvas>
    </div>
</template>


<script>
import {  GameMap  } from '@/assets/scripts/GameMap';
import {  ref, onMounted  } from 'vue'


export default{
    setup(){
        let parent = ref(null);
        let canvas = ref(null);
        
        //组件挂载完后需要执行以下操作
        onMounted(() =>{ 
            // 就是ctx和parent
            new GameMap(canvas.value.getContext('2d'), parent.value)
        });

        return{
            parent,
            canvas
        }
    }
}
</script>

<style scoped>
div.gamemap{
    width: 100%;;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

