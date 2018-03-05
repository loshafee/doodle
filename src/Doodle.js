class Doodle {
  constructor (container = null, options) {
    container = document.querySelector(container)
    let canvas = document.createElement('canvas')
    let initState = []
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
    container.appendChild(canvas)
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.config = this.currentConfig = options

    this.__init = function () {
      for (let i in this.ctx) {
        if (this.config.hasOwnProperty(i)) {
          if (typeof this.ctx[i] === 'function') {
            initState.push(this.ctx[i].bind(this.ctx, ...this.config[i]))
          } else {
            this.ctx[i] = this.config[i]
          }
        }
      }
      while (initState.length) {
        initState.pop()()
      }
    }
    this.__init()
  }

  next (options) {
    this.config = options
    this.currentConfig = Object.assign(this.currentConfig, options)
    this.__init()
  }
}