class Particle {
  constructor (ctx, options) {
    this.ctx = ctx
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
    this.radius = options.radius
    this.speed = options.speed
    this.color = options.color
  }

  draw () {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.ctx.closePath()
  }
}

class Simulator {
  constructor (ctx, count) {
    this.tick = 0
    this.count = count
    this.particles = []
    this.ctx = ctx
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
    if (this.tick % 10 == 0) {
      if (this.particles.length < count) {
        this.particles.push(new Particle(this.ctx, {
          x: Math.random() * this.ctx.canvas.width,
          y: 0,
          speed: 2 + Math.random() * 3,
          radius: 5 + Math.random() * 5,
          color: 'white'
        }))
      }
    }
  }

  updateParticles () {
    for (let i in this.particles) {
      let particle = this.particles[i]
      particle.y += particle.speed
    }
  }

  killParticles () {
    for (let i in this.particles) {
      let particle = this.particles[i]
      if (particle.y > this.ctx.canvas.height) {
        particle.y = 0
      }
    }
  }

  drawParticles () {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    for (let i in this.particles) {
      let particle = this.particles[i]
      this.ctx.beginPath()      
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false)
      this.ctx.closePath()
      this.ctx.fillStyle = particle.color
      this.ctx.fill()
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
    new Simulator(this.ctx, 100)
  }
}