###Train
[![build status](https://travis-ci.org/rootslab/train.png?branch=master)](https://travis-ci.org/rootslab/train)
[![NPM version](https://badge.fury.io/js/train.png)](http://badge.fury.io/js/train)

[![NPM](https://nodei.co/npm/train.png?downloads=true&stars=true)](https://nodei.co/npm/train/)

[![NPM](https://nodei.co/npm-dl/train.png)](https://nodei.co/npm/train/)

> _Train_, an implementation of a (FIFO) Queue data structure.

> Behind the scenes, it uses 2 arrays, to simulate and perform fast shifting and popping operations, without using the Array#shift() method.

> __Note:__  

>__*Array#shift*__ method shows an __high loss of performances when the array is very long__; for example, on my cheap laptop the bottleneck occurs when I fill an array with more than 2^17 items.
It implies that for shorter array lengths, is still possible to use _Array#shift_.
>
> _**Test by yourself** [launching benchmarks](#run-benchmarks) or manually tuning_ the power value p in this _[bench file](bench/slow-shift-array-2^17-items-bench.js)_.

###Install

```bash
$ npm install train [-g]
```

> __require__:

```javascript
var Train  = require( 'train' );
```

###Run Tests

```bash
$ cd train/
$ npm test
```

###Run Benchmarks

```bash
$ cd train/
$ npm run-script bench
```

###Constructor

> Create an instance, optionally with an Array of elements and a limit value for the queue size.

```javascript
Train( [ Array elements [, Number xlim ] ] )
// or
new Train( [ Array elements [, Number xlim ] ] )
```

###Properties

```javascript
/*
 * Property to get the queue length.
 *
 * NOTE: Accessors are very slow,
 * use size() method instead.
 */
Train.length : Number

/*
 * Property to set the queue size limit.
 *
 * NOTE: Only #xpush() is affected by this limit.
 */
Train.xlim : Number

/*
 * Property to get current iterator position in the queue.
 *
 * NOTE: manually changing this value directly affects the
 * behaviour of iterator methods like #next() and #curr.
 */
Train.ipos : Number

/*
 * Property that indicates the current head element 
 * position/index in the queue.
 *
 * WARNING: private property, don't change it manually-
 */
Train.hpos : Number


/*
 * An array that represents the current head of the queue.
 *
 * WARNING: private property, don't change it manually.
 */
Train.qhead : Number


/*
 * An array that represents the current tail of queue.
 *
 * NOTE: private property, don't change it manually.
 */
Train.qtail : Number

```

###Methods

> Arguments within [ ] are optional.

```javascript
/*
 * Get an element at certain index.
 */
Train#get( [ Number index ] ) : Object

/*
 * Circular get.
 */
Train#cget( [ Number index ] ) : Object

/*
 * Evict the first (head) element from the queue.
 */
Train#shift() : Object

/* 
 * Evict multiple elements; if a number k was specified, it returns
 * an array of K elements, with K <= k. If k > size(), all elements
 * are returned.
 *
 * NOTE: #pop() k elements is faster than executing #shift() * k times.
 */
Train#pop( [ Number k ] ) : Object

/*
 * Return current element through the circular iterator.
 */
Train#curr() : Object

/*
* Get the current element through a circular iterator, also
* incrementing the iterator counter/position by one; optionally,
* it is possible to specify a number as the next iterator
* position / index in the queue.
*/
Train#next( [ Number index ] ) : Object

/*
 * Push one or multiple objects into the queue. it uses
 * the same signature as Array#push.
 * It returns the current number of items in the queue.
 */
Train#push( [ Object obj1 [, Object obj2 .. ] ] ) : Number

/*
 * Push one or multiple objects into the queue,
 * Unlike #push, if the addition of elements exceed the
 * xlim value, items aren't added but silently dropped.
 * It returns the current number of items in the queue,
 * or -1 if the current arguments/items were dropped.
 */
Train#xpush( [ Object obj1 [, Object obj2 .. ] ] ) : Number

/*
 * Concatenate an Array to the queue.
 * It returns the current Train instance.
 *
 * NOTE: It accepts a single argument, that could be also a generic Object.
 */
Train#concat( [ Array array ] ) : Train

/*
 * Concatenate an Array to the queue.
 * Unlike #concat, if the addition of elements, contained in the array,
 * exceed the xlim value, array is silently dropped.
 * It returns the current number of items in the queue,
 * or -1 if the current array was dropped.
 *
 * NOTE: It accepts a single argument, that could be also a generic Object.
 */
Train#xconcat( [ Array array ] ) : Number

/*
 * Get the queue size.
 */
Train#size() : Number

/*
 * Empty the queue. It returns the number of elements evicted.
 */
Train#flush() : Number

/*
 * Apply a fn to every element of the queue, like Array#forEach;
 * fn will get 3 arguments: ( Object element, Number index, Number qsize ).
 *
 * NOTE: on iteration, the size is fixed to the current queue size,
 * then it is possible to push other elements to the tail, these
 * added elements are not affected by iteration.
 */
Train#forEach( Function fn [, Object scope ] ) : Train

/*
 * Apply a fn to every element of the queue;
 * fn will get 3 arguments: Object element, Number index, Function done.
 * After that every fn will have called done(), the callback will be launched
 * with an err argument ( if any has occurred ) and a number, representing
 * the total processed / iterated elements in the queue.
 *
 * Passing true as the last parameter, implies the eviction of the current
 * item on every iteration, soon after that the fn has called done().
 *
 * NOTE: when queue size is 0, the callback will be immediately executed
 * with arguments: ( null, 0 ).
 *
 * NOTE: on iteration, the size is fixed to the current queue size,
 * then it is possible to push other elements to the tail, these
 * added elements are not affected by iteration.
 */
Train#iterate( Function fn [, Object scope, [, Function cback [, Boolean evict ] ] ] ) : Train

```

### MIT License

> Copyright (c) 2013 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
