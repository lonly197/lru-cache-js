# lru-cache-js

A JavaScript Library About Least Recently Used Cache, Which Can Use In Client or Server.

[![build status](https://secure.travis-ci.org/avoidwork/tiny-lru.svg)](http://travis-ci.org/avoidwork/tiny-lru)

## Installation:

```JavaScript
npm install lru-cache-js --save
```

## Usage

```JavaScript
import lru from 'lru-cache-js'
const cache = lru(500)
```

Lodash provides a `memoize` function with a cache that can be swapped out as long as it implements the right interface.
See the [lodash docs](https://lodash.com/docs#memoize) for more on `memoize`.

#### Example
```JavaScript
_.memoize.Cache = lru().constructor;
const memoized = _.memoize(myFunc);
memoized.cache.max = 10;
```

## API

### clear
#### Method

Clears the contents of the cache

	return {Object} LRU instance

**Example**

```JavaScript
cache.clear();
```

### evict
#### Method

Evicts the least recently used item from cache

	return {Object} LRU instance

**Example**

```JavaScript
cache.evict();
```

### first
#### Property

Item in "first" or "top" position

**Example**

```JavaScript
const cache = lru();

cache.first; // null - it's a new cache!
```

### get
#### Method

Gets cached item and moves it to the front

	param  {String} key Item key
	return {Mixed}      Undefined or Item value

**Example**

```JavaScript
const item = cache.get("myKey");
```

### items
#### Property

Hash of cache items

**Example**

```JavaScript
const cache = lru();

cache.items; // {}
```

### max
#### Property

Max items to hold in cache (1000)

**Example**

```JavaScript
const cache = lru(500);

cache.max; // 500
```

### notify
#### Property

Executes `onchange(eventName, serializedCache)` on the next tick when the cache changes

**Example**

```JavaScript
const cache = lru();

cache.notify = true;
cache.onchange = (event, serializedCache) => {
	console.log(event, serializedCache);
};
```

### onchange
#### Method

Accepts `eventName` & `serializedCache` arguments

**Example**

```JavaScript
const cache = lru();

cache.notify = true;
cache.onchange = (event, serializedCache) => {
	console.log(event, serializedCache);
};
````

### last
#### Property

Item in "last" or "bottom" position

**Example**

```JavaScript
const cache = lru();

cache.last; // null - it's a new cache!
```

### length
#### Property

Number of items in cache

**Example**

```JavaScript
const cache = lru();

cache.length; // 0 - it's a new cache!
```

### remove
#### Method

Removes item from cache

	param  {String} key Item key
	return {Object}     Item

**Example**

```JavaScript
const staleItem = cache.remove("myKey");
```

### reset
#### Method

Resets the cache to it's original state

	return {Object} LRU instance

**Example**

```JavaScript
cache.reset();
```

### set
#### Method

Sets item in cache as `first`

	param  {String} key   Item key
	param  {Mixed}  value Item value
	return {Object}       LRU instance

**Example**

```JavaScript
cache.set("myKey", {prop: true});
```

## Contact me
- Email: <lonly197@gmail.com>