# Doodle

## an easy usage canvas Javascript library with effections

## API
* `Property`
    * `canvas` canvas 画布元素
    * `ctx` 2d上下文
    * `config` 配置项

* `method`
    * `next(options)`
    * `fillCircle(x, y, radius, startAngle, endAngle, clockwise)` 填充圆
    * `strokeCircle(x, y, radius, startAngle, endAngle, clockwise)` 描边圆

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