const next = typeof process !== 'undefined' ? process.nextTick : arg => setTimeout(arg, 1)

/**
 * LRU cache
 * 通过想象链表实现Item新近度的管理
 */
class LRU {
  constructor(max) {
    // 最大容量
    this.max = max
    // 是否开启变更通知，默认false
    this.notify = false
    return this.reset()
  }
  /**
   * 清空缓存
   * @param {*} silent
   */
  clear(silent = false) {
    this.reset()
    if (!silent && this.notify) {
      next(this.onchange('clear', this.dump()))
    }
    return this
  }
  /**
   * 删除指定Key
   * @param {*} key
   * @param {*} silent
   */
  delete(key, silent = false) {
    return this.remove(key, silent)
  }
  /**
   * 数据导出（Return Json String）
   */
  dump() {
    return JSON.stringify(this, null, 0)
  }
  /**
   * 淘汰
   */
  evict() {
    if (this.contains(this.last)) {
      this.remove(this.last, true)
    }
    if (this.notify) {
      next(this.onchange('evict', this.dump()))
    }
    return this
  }
  /**
   * 获取指定Key的值
   * @param {*} key
   */
  get(key) {
    let output
    if (this.contains(key)) {
      output = this.cache[key].value
      this.set(key, output)
      if (this.notify) {
        next(this.onchange('get', this.dump()))
      }
    }
    return output
  }
  /**
   * 查询指定Key是否存在
   * @param {*} key
   */
  contains(key) {
    return key in this.cache
  }
  /**
   * Change事件(暂无具体实现)
   */
  onchange() {}
  /**
   * 删除的具体实现方法
   * @param {*} k
   * @param {*} silent
   */
  remove(k, silent = false) {
    const key = typeof k !== 'string' ? k.toString() : k
    const cached = this.cache[key]

    if (cached) {
      delete this.cache[key]
      this.length = this.length - 1
      if (this.contains(cached.previous)) {
        this.cache[cached.previous].next = cached.next

        if (this.first === key) {
          this.first = cached.previous
        }
      } else
      if (this.first === key) {
        this.first = null
      }
      if (this.contains(cached.next)) {
        this.cache[cached.next].previous = cached.previous

        if (this.last === key) {
          this.last = cached.next
        }
      } else if (this.last === key) {
        this.last = null
      }
    } else {
      if (this.first === key) {
        this.first = null
      }
      if (this.last === key) {
        this.last = null
      }
    }
    if (!silent && this.notify) {
      next(this.onchange('remove', this.dump()))
    }
    return cached
  }
  /**
   * 重置缓存
   */
  reset() {
    this.cache = Object.create(null)
    this.first = null
    this.last = null
    this.length = 0
    return this
  }
  /**
   * 设置Key-Value
   * @param {*} key
   * @param {*} value
   */
  set(key, value) {
    let first
    let item
    if (this.contains(key)) {
      item = this.cache[key]
      item.value = value
      item.next = null
      if (this.first !== key) {
        item.previous = this.first
      }
      if (this.last === key && item.previous !== null) {
        this.last = item.previous
      }
    } else {
      this.length = this.length + 1
      if (this.length > this.max) {
        this.remove(this.last, true)
      }
      if (this.length === 1) {
        this.last = key
      }
      this.cache[key] = {
        next: null,
        previous: this.first,
        value
      }
    }
    if (this.first !== key && this.contains(this.first)) {
      first = this.cache[this.first]
      first.next = key
      if (first.previous === key) {
        first.previous = null
      }
    }
    this.first = key
    if (this.notify) {
      next(this.onchange('set', this.dump()))
    }
    return this
  }
  /**
   * 更新
   * @param {Json String} arg
   */
  update(arg) {
    const obj = JSON.parse(arg)
    Object.keys(obj).forEach((i) => {
      this[i] = obj[i]
    })
  }
}
/**
 * 工厂模式
 * @param {*} max //最大容量，默认为1000
 */
function factory(max = 1000) {
  return new LRU(max)
}

export default factory
