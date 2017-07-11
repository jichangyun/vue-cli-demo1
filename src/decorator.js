let log = (type) => {
  return (target, name, descriptor) => {
    const method = descriptor.value
    descriptor.value = (...args) => {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`)
      let ret
      try {
        ret = method.apply(target, args)
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`)
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`)
      }
      return ret
    }
  }
}

function xx (target) {
  target.prototype.dooo = function () {
    console.log('dooo')
  }
}

@xx
class IronMan {
  @log('IronMan 自检阶段')
  check () {
    return '检查完毕'
  }
  @log('IronMan 攻击阶段')
  attack () {
    return '击倒敌人'
  }
  @log('IronMan 机体报错')
  error () {
    let err = { msg: 'Something is wrong!' }
    throw err
  }
}

export function run () {
  var tony = new IronMan()
  tony.check()
  tony.attack()
  tony.error()
  tony.dooo()
}

// 输出：
// (IronMan 自检阶段) 正在执行: check() = ?
// (IronMan 自检阶段) 成功 : check() => 检查完毕
// (IronMan 攻击阶段) 正在执行: attack() = ?
// (IronMan 攻击阶段) 成功 : attack() => 击倒敌人
// (IronMan 机体报错) 正在执行: error() = ?
// (IronMan 机体报错) 失败: error() => Something is wrong!
