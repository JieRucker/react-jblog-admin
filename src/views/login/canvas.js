export class Circle {
  //创建对象
  //以一个圆为对象
  //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.random() * 10;
    this._mx = Math.random();
    this._my = Math.random()

  }

  //canvas 画圆和画直线
  drawCircle(ctx) {
    ctx.beginPath()
    //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
    ctx.arc(this.x, this.y, this.r, 0, 360)
    ctx.closePath()
    ctx.fillStyle = 'rgba(204, 204, 204, 0.3)'
    ctx.fill()
  }

  drawLine(ctx, _circle) {
    let dx = this.x - _circle.x
    let dy = this.y - _circle.y
    let d = Math.sqrt(dx * dx + dy * dy)
    if (d < 150) {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y) //起始点
      ctx.lineTo(_circle.x, _circle.y) //终点
      ctx.closePath()
      ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)'
      ctx.stroke()
    }
  }

  // 圆圈移动
  // 圆圈移动的距离必须在屏幕范围内
  move(w, h) {
    this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx)
    this._my = (this.y < h && this.y > 0) ? this._my : (-this._my)
    this.x += this._mx / 2
    this.y += this._my / 2
  }
}
//鼠标点画圆闪烁变动
export class currentCirle extends Circle {
  drawCircle(ctx) {
    ctx.beginPath()
    //注释内容为鼠标焦点的地方圆圈半径变化
    this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
    ctx.arc(this.x, this.y, this.r, 0, 360);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
    ctx.fill();

  }
}
