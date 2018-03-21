let initialEffect = {
  snow: function (ctx) {
    return {
      type: 'circle',
      x: Math.random() * ctx.canvas.width,
      y: 0,
      speedX: 0,
      speedY: 2 + Math.random() * 3,
      radius: 5 + Math.random() * 5,
      deltaRaduis: 0,
      opacity: 0,
      color: 'white'
    }
  },
  launch: function (ctx) {
    return {
      type: 'circle',
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
      speedX: Math.random() * 8 - 4,
      speedY: Math.random() * 8 - 4,
      radius: 5,
      deltaRaduis: 0.1,
      opacity: 0.01,
      color: 'white'
    }
  },
  bubble: function (ctx) {
    return {
      type: 'circle',
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
      speedX: Math.random() * 8 - 4,
      speedY: Math.random() * 8 - 4,
      radius: 20,
      deltaRaduis: -0.2,
      opacity: 0.01,
      color: 'white'
    }
  },
  boom: function (ctx) {
    return {
      type: 'circle',
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
      speedX: Math.random() * 8 - 4,
      speedY: Math.random() * 8 - 4,
      radius: 4,
      deltaRaduis: -0.2,
      velocity: 4,
      opacity: 1,
      color: 'white'
    }
  }
}
class Particle {
  constructor (ctx, options) {
    this.ctx = ctx
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
    this.radius = options.radius
    this.speedX = options.speedX
    this.speedY = options.speedY
    this.color = options.color
    this.deltaRaduis = options.deltaRaduis
    this.opacity = options.opacity
    this.type = options.type || 'circle'
  }

  draw (path) {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    if (typeof path === 'function') {
      path()
    } else {
      switch (this.type) {
      case 'circle':
        this.radius += this.deltaRaduis
        if(this.radius < 0) {
          this.radius = 0
        }
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        break
      case 'rect':
        this.ctx.rect(this.x, this.y, this.width, this.height)
        break
      }
    }
    this.ctx.closePath()
    this.ctx.fill()
  }
}

class Simulator {
  constructor (ctx, count, effect) {
    this.tick = 0
    this.count = count
    this.particles = []
    this.ctx = ctx
    this.effect = effect
    this.loop()
  }

  loop () {
    requestAnimationFrame(this.loop.bind(this))
    this.createParticles(this.count)
    this.updateParticles()
    this.killParticles()
    this.drawParticles()
  }

  createParticles (count) {
    this.tick++
    if (this.tick % 5 == 0) {
      if (this.particles.length < count) {
        this.particles.push(new Particle(this.ctx, initialEffect[this.effect](this.ctx)))
      }
    }
  }

  updateParticles () {
    for (let i in this.particles) {
      let particle = this.particles[i]
      particle.x += particle.speedX
      particle.y += particle.speedY
    }
  }

  killParticles () {
    for (let i in this.particles) {
      let particle = this.particles[i]
      if (particle.y > this.ctx.canvas.height || particle.y < -10 || particle.x > this.ctx.canvas.width || particle.x < 0) {
        particle.hitable = true
        particle.index = i
      }
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if(this.particles[i].hitable) {
        this.particles.splice(i, 1)
      }
    }
  }

  drawParticles () {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    for (let i in this.particles) {
      let particle = this.particles[i]
      particle.draw()
    }
  }
}

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
    return this
  }

  fillCircle () {
    this.ctx.beginPath()
    this.ctx.arc.apply(this.ctx, arguments)
    this.ctx.closePath()
    this.ctx.fill()
  }

  strokeCircle () {
    this.ctx.beginPath()
    this.ctx.arc.apply(this.ctx, arguments)
    this.ctx.closePath()
    this.ctx.stroke()
  }

  fillPolygon () {
    if (typeof arguments[0] !== 'string') {
      throw new Error('please input a string parameter')
    }
    let args = arguments[0].split(' ')
    this.ctx.beginPath()
    args.forEach(function (point, index) {
      let coordinate = point.split(',')
      if (index === 0) {
        this.ctx.moveTo(coordinate[0], coordinate[1])
      } else {
        this.ctx.lineTo(coordinate[0], coordinate[1])
      }
    }, this)
    this.ctx.closePath()
    this.ctx.fill()
  }

  strokePolygon () {
    if (typeof arguments[0] !== 'string') {
      throw new Error('please input a string parameter')
    }
    let args = arguments[0].split(' ')
    this.ctx.beginPath()
    args.forEach(function (point, index) {
      let coordinate = point.split(',')
      if (index === 0) {
        this.ctx.moveTo(coordinate[0], coordinate[1])
      } else {
        this.ctx.lineTo(coordinate[0], coordinate[1])
      }
    }, this)
    this.ctx.closePath()
    this.ctx.stroke()
  }

  fillText () {
    this.ctx.fillText.apply(this.ctx, arguments)
  }

  strokeText () {
    this.ctx.strokeText.apply(this.ctx, arguments)
  }

  drawImage () {
    this.ctx.drawImage.apply(this.ctx, arguments)
  }
  
  effectParticle () {
    
    return {
      snow: function () {
        new Simulator(this.ctx, 100, 'snow')
      }.bind(this),
      launch: function () {
        new Simulator(this.ctx, 100, 'launch')
      }.bind(this),
      bubble: function () {
        new Simulator(this.ctx, 100, 'bubble')
      }.bind(this),
      boom: function () {
        new Simulator(this.ctx, 100, 'boom')
      }.bind(this)
    }
  }
}