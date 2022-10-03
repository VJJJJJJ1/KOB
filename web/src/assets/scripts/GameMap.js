//每一文件只能有一个default，如果不是default的画就加大括号
import { GameObject } from "./GameObject"; 
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends GameObject{
    //画布和画布的父元素，父元素用来动态修改画布的长宽
    constructor(ctx, parent){
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;   //一个单位的长度，整个地图为13*13

        this.rows = 13;
        this.cols = 14;

        this.walls = [];

        //假设这个正方形内有20个障碍物
        this.inner_walls_count = 20;


        this.snakes = [
            new Snake({id: 0, color: "#4876EC", r: this.rows - 2, c: 1}, this),
            new Snake({id: 1, color: "#F94848", r: 1, c: this.cols - 2}, this),
        ];
    }

    //输入起点和终点坐标，判断是否联通
    //这里使用Flood fill算法
    check_connnected(g, sx, sy, tx, ty){
        if(sx == tx && sy == ty) return true;
        //(sx, sy)标记为true,再继续前进
        g[sx][sy] = true; 

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1]; 
        for(let i = 0; i < 4; i ++){
            let x = sx + dx[i], y = sy + dy[i];
            if(!g[x][y] && this.check_connnected(g, x, y, tx, ty)){
                return true;
            }
        }
        return false;
    }

    creat_walls(){
        const g = [];
        for(let r = 0; r < this.rows; r ++){
            g[r] = [];
            for(let c = 0; c < this.cols; c ++){
                g[r][c] = false;
            }
        }
        //给四周加上障碍物
        for(let r = 0; r < this.rows; r ++){
            g[r][0] = g[r][this.cols - 1] = true;
        }

        for(let c = 0; c < this.cols; c ++){
            g[0][c] = g[this.rows - 1][c] = true;
        }

        //创建随机障碍物
        for(let i = 0; i < this.inner_walls_count / 2; i ++){
            //怕random到重复值，所以重复1000次，找到没重复的为止
            for(let j = 0; j < 1000; j ++){ 
                let r = parseInt(Math.random() * this.rows);  //先乘再取int
                let c = parseInt(Math.random() * this.cols);
                //中心对称
                if(g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
                if(r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2)
                    continue;   //左下和右上不能有障碍物

                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;  //注意地图是中心对称
                break;
            }
        }


        //check_connnected函数判断左下右上是否联通
        const copy_g = JSON.parse(JSON.stringify(g));
        if(!this.check_connnected(copy_g, this.rows - 2, 1, 1, this.cols - 2)){
            return false;
        }



        for(let r = 0; r < this.rows; r ++){
            for(let c = 0; c < this.cols; c ++){
                if(g[r][c]){
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        //左下和右上可以联通，返回true
        return true;

    }


    add_listening_events(){
        this.ctx.canvas.focus();

        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e =>{
            if (e.key === 'w') snake0.set_direction(0);
            else if (e.key === 'd') snake0.set_direction(1);
            else if (e.key === 's') snake0.set_direction(2);
            else if (e.key === 'a') snake0.set_direction(3);
            else if (e.key === 'ArrowUp') snake1.set_direction(0);
            else if (e.key === 'ArrowRight') snake1.set_direction(1);
            else if (e.key === 'ArrowDown') snake1.set_direction(2);
            else if (e.key === 'ArrowLeft') snake1.set_direction(3);

        });
    }


    start(){
        //随机循环1000次，如果创建的地图是连通的，就退出
        for(let i = 0; i < 1000; i ++){
            if(this.creat_walls()){
                break;
            }
        }
        this.add_listening_events();
    }
    update_size(){
        //防止出现墙之间有缝隙的问题，将L取整（原本是浮点数）
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_ready(){   //判断两条蛇是否都准备好下一回合了
        for(const snake of this.snakes){
            if(snake.status !== "idle") return false;
            if(snake.direction === -1) return false;
        }
        return true;
    }

    next_step(){
        for(const snake of this.snakes){
            snake.next_step();
        }
    }

    // 检测目标位置是否合法：没有撞到两条蛇的身体和障碍物
    check_valid(cell){
        for(const wall of this.walls){
            if(wall.r === cell.r && wall.c === cell.c){
                return false;
            }
        }
        for(const snake of this.snakes){
            let k = snake.cells.length;
            if(!snake.check_tail_increasing()){ // 当蛇尾会前进的时候，蛇尾不要判断
                k --;
            }
            for(let i = 0; i < k; i ++){
                if(snake.cells[i].r === cell.r && snake.cells[i].c === cell.c){
                    return false;
                }
            }
        }
        return true;
    }



    update(){
        this.update_size();
        if(this.check_ready()){
            this.next_step();
        }
        this.render();
    }
    render(){    //每一帧都需要渲染，即把当前游戏对象画到地图上
        // this.ctx.fillStyle = 'green';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // 定义奇数格和偶数格的颜色（横纵坐标相加），用QQ开截图，ctrl+shift+c即可复制当前所指颜色色号
        const color_even = "#AAD751", color_odd = "#A2D149"; 
        for(let r = 0; r < this.rows; r ++){
            for(let c = 0; c < this.cols; c ++){
                if((r + c) % 2 == 0){
                    //填充颜色
                    this.ctx.fillStyle = color_even;  
                }
                else{
                    this.ctx.fillStyle = color_odd;
                } 
                // canvas的坐标不同，左上原点，右边X，下面Y，所以r行c列的坐标为c,r
                //x,y,长,宽
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}

