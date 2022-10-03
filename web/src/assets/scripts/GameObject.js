const GAME_OBJECTS = [];

export class GameObject{
    constructor(){
        GAME_OBJECTS.push(this);
        this.timedelta = 0;   //这一帧执行的时刻距离上一帧执行的时刻的时间间隔
        this.has_called_start = false;   //是否为第一次执行

    }

    start(){ //只执行一次

    }
    update(){ //每一帧执行一次，除了第一帧之外

    }

    on_destroy(){  //删除之前执行

    }

    destroy(){  //从GAME_OBJECTS里删除对象
        this.on_destroy();

        for(let i in GAME_OBJECTS){
            const obj = GAME_OBJECTS[i];
            if(this === obj){
                GAME_OBJECTS.splice(i);  //删除数组元素
                break;
            }
        }
    }

}
let last_timestamp; //上一次执行的时刻
const step = timestamp =>{
    for(let obj of GAME_OBJECTS){  //of遍历的是值，in遍历的是下标
        if(!obj.has_called_start){
            obj.has_called_start = true;
            obj.start();
        }
        else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp =  timestamp

    requestAnimationFrame(step)  //迭代，让每一帧都执行一遍step函数
}

requestAnimationFrame(step)  //在下一帧的时候执行step函数