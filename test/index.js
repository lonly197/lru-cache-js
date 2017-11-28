import test from 'ava'
import LRUCache from '../src/index'

const lru = LRUCache(2)

test('LRU Cache Test Max', (t) => {
  t.is(lru.max, 2)
})

test('LRU Cache Test Set Key', (t) => {
  lru.set('python', 'python')
  lru.set('java', 'java')
  t.true(lru.contains('python'))
})

test('LRU Cache Test Get Key', (t) => {
  t.is(lru.get('python'), 'python')
})

test('LRU Cache Test Evict Key', (t) => {
  lru.set('js', 'js')
  lru.set('scala', 'scala')
  t.is(lru.length, 2)
})

test('LRU Cache Test Dump Data', (t) => {
  t.log(lru.dump())
  t.pass()
})

test('LRU Cache Delete Key', (t) => {
  lru.delete('js')
  t.false(lru.contains('js'))
})

test('LRU Cache Delete Key', (t) => {
  lru.reset()
  t.is(lru.length, 0)
})
