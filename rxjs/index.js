console.log('hello rxjs!')

import Rx from 'rxjs'

const $input = document.querySelector('.rxjs-input1')
const $btn = document.querySelector('.rxjs-btn1')
const $btn_merge = document.querySelector('.rxjs-btn-merge')

const inputStream = Rx.Observable.fromEvent($input, 'input').map(e => e.target.value)

var sum = 0;
const clickStream1 = Rx.Observable.fromEvent($btn, 'click')
	.map(() => { 
		sum++
		return '第' + sum + '次点击提交：' 
	})

const clickStream2 = Rx.Observable.fromEvent($btn_merge, 'click')

const combinedStream = clickStream1.combineLatest(
	inputStream, (click, input)=>{
		return click + input
	}
)

inputStream.subscribe((x) => console.log('subscribe inputStream:' + x))

combinedStream.subscribe(
	(str) => { console.log('output subscribe: ' + str) },
	(error) => { console.error(error) },
	() => { console.log('completed!') }
)

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

// throttle
clickStream2
	.map()
	.subscribe((x) => console.log('click thottle: click ' + x + ' times'))