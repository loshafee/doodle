# Doodle

## an easy usage canvas Javascript library with effections

## API
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