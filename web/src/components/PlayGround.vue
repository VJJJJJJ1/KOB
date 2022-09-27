<template>
    <div class="playground">
        <GameMap />
    </div>
</template>



<script>
    import GameMap from './GameMap.vue'
    
    export default {
        components: {
            GameMap,
        }
    }
    </script>
    


<style scoped>
div.playground{
    width:60vw;    /*占比60的宽度 */
    height: 70vh;  /* 占比70的高度 */
    background: rgb(196, 251, 255);
    margin: 40px auto;    /*距离上40px,auto是居中*/
}
</style>