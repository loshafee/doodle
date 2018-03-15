# Doodle

## an easy usage canvas Javascript library with effections

## API
class `Doodle`

    let doodle = new Doodle('#box', {})

Doodle 实例 `doodle`
* `Property`
    * `canvas` canvas 画布元素
    * `ctx` 2d上下文
    * `config` 配置项

* `method`
    * `next(options)` 下一步操作，返回 `function`
    * `fillCircle(x, y, radius, startAngle, endAngle, clockwise)` 填充圆
    * `strokeCircle(x, y, radius, startAngle, endAngle, clockwise)` 描边圆
    * `fillPolygon(x1,y1,x2,y2,...)` 填充多边形
    * `strokePolygon(x1,y1,x2,y2,...)` 描边多边形
    * `fillText(text, x, y)` 填充文本
    * `strokeText(text, x, y)` 描边文本
    * `drawImage()` 绘制图像

class `Simulator`

    let simulator = new Simulator(ctx, 100)

Simulator 实例 `simulator`
* `Property`
    * `tick` 计数器
    * `count` 粒子树
    * `particles` 粒子集合
    * `ctx` canvas 2D上下文

* `method`
    * `loop` 粒子循环函数
    * `createParticles` 创建粒子
    * `updateParticles` 更新粒子
    * `killParticles` 消除粒子
    * `drawParticles` 绘制粒子


## 例子examples

    let doodle = new Doodle('#box', {
        font: '32px Microsoft Yahei',
        fillStyle: 'green'
    })

    doodle.next({
        fillRect: [100, 100, 100, 100]
    }).next({
        fillStyle: 'red',
        fillText: ['Hello world ...', 50, 50]
    })

## canvas电子书
[深入理解 HTML Canvas](https://loshafee.github.io/canvasdeepdive-book/zh-cn/text/title.html)