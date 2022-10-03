//根据矩形左上角坐标(r, c)求矩形中心的坐标（相对坐标）
export class Cell{
    constructor(r, c){
        this.r = r;
        this.c = c;
        this.x = c + 0.5;
        this.y = r + 0.5;
    }
}