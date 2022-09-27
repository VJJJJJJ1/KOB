//每一文件只能有一个default，如果不是default的画就加大括号
import { GameObject } from "./GameObject"; 

export class GameMap extends GameObject{
    //画布和画布的父元素，父元素用来动态修改画布的长宽
    constructor(ctx, parent){
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;   //一个单位的长度，整个地图为13*13

        this.rows = 13;
        this.cols = 13;
    }

    start(){
        
    }
    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update(){
        this.update_size();
        this.render();
    }
    render(){    //每一帧都需要渲染，即把当前游戏对象画到地图上
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}

