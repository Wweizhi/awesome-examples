console.log('hello rxjs!')

import Rx from 'rxjs/Rx'

const $input = document.querySelector('.rxjs-input1')
const $btn = document.querySelector('.rxjs-btn1')
const $input2 = document.querySelector('.rxjs-input2')
const $input3 = document.querySelector('.rxjs-input3')
const $btn2 = document.querySelector('.rxjs-btn2')
const $btn3 = document.querySelector('.rxjs-btn-merge')

const inputStream = Rx.Observable.fromEvent($input, 'input')
const inputStream2 = Rx.Observable.fromEvent($input2, 'input')
const inputStream3 = Rx.Observable.fromEvent($input3, 'input')

const clickStream1 = Rx.Observable.fromEvent($btn, 'click')
const clickStream2 = Rx.Observable.fromEvent($btn2, 'click')
const clickStream3 = Rx.Observable.fromEvent($btn3, 'click')



// flatMap 由开始5开始，每次累加1，输出10个数
Rx.Observable.range(5, 10).flatMap((item, index) => {
	return Promise.resolve(item)
}).subscribe((x) => console.log('由开始5开始，每次累加1: ', x))

// interval 
Rx.Observable.interval(500).map((x) => x * 2).take(4)
	.reduce((sum, nextValue) => sum + nextValue)
	.subscribe((x) => console.log('每隔500ms，输出一个值，输出4次，然后把它们加起来等于：', x))

// merge
const arrStream1 = ['第1次红色警告', '第2次红色警告', '第3次红色警告']
const arrStream2 = ['第1次解除红色警告', '第2次解除红色警告']
Rx.Observable.interval(200).map((index) => arrStream1[index])
	.merge(Rx.Observable.interval(300).map((index) => arrStream2[index])).take(5)
	.subscribe((x) => console.log(x))

// throttle、throttleTime  
// 接收一个observable后，添加观察队列中，throttleTime内，不接受新的observable
inputStream
	.throttle(e => Rx.Observable.interval(1000))
	// .throttleTime(1000)
	.map(e=>e.target.value)
	.subscribe((x) => console.log('click throttle: click ' + x))


// debounce、debounceTime 
// 1. 接收一个observable后, 先缓存但不添加观察队列中，
// 2. debounceTim内，如果有新的observable,则更新缓存值，继续第2个步骤；
// 3. 如果没有新observable，则添加观察队列中
inputStream2
	.debounce(e => Rx.Observable.interval(300))
	// .debounceTime(300)
	.map(e=>e.target.value)
	.distinctUntilChanged()
	.filter(x => !!x)
	.subscribe((x) => console.log('click debounce: click ' + x))

const multiClickStream = clickStream3
    .buffer(clickStream3.debounceTime(200))
    .map(list => list.length)
    .filter(x => x >= 2)
multiClickStream.subscribe((x) => console.log('Throttle: click count ' + x + ' times'))

// 搜索控件事例
// 功能：在搜索框内，输入字符，并发起搜索（输入间隔不超过300ms时，不发起搜索）
setTimeout(()=> console.log('－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－'), 2000)
var searchSum = 0;
inputStream3
	.debounceTime(300)				// 间隔不超过300ms时，以最后的输入事件作为可观察对象
	.map(e => e.target.value)		// 取输入结果
	.distinctUntilChanged()			// 输入结果与上次的不同时触发
	.filter(x => !!x)				// 过滤空的输入结果
	.do(x => console.log('第' + searchSum + '次输入结果为: ' + x))
	.switchMap(x => {
		searchSum++
		const delayTime = searchSum % 2 == 0 ? 1000 : 2000
		const oPromise = new Promise((resolve, reject) => {
			console.log('发起搜索：第' + searchSum + '次')
			setTimeout(() => {
				resolve('第' + searchSum + '次搜索结果为：' + x)
			}, delayTime)
		})
		return Rx.Observable.fromPromise(oPromise)
	})								// 取最新的搜索结果
	.subscribe((x) => console.log('Search Demos Log: ' + x))
