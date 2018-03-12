# Doodle

## an easy usage canvas Javascript library with effections

## examples

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