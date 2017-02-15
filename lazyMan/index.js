/*
1. 链式调用
2. 订阅发布模式
3. 由左到右按顺序同步执行
4. 执行前置，执行延迟
*/

const log = console.log.bind(console)

function throttle (fn, interval, context){
	const args = Array.prototype.slice.call(arguments).slice(3)
	clearTimeout(fn.id)
	fn.id = setTimeout(()=>{ fn.apply(context, args) }, interval)
}

function insertItem (list, adjustArr, item){
	var isInsert = false
	for(let i = 0; i < adjustArr.length; i++){
		let { behavior, index } = adjustArr[i]
		if(item.behavior == behavior){
			list.splice(index, 0, item)
			adjustArr[i].index = index + 1
			isInsert = true
		}
	}
	if(!isInsert) list.push(item)
}

class LazyMan {
	constructor (man){
		this.man = man
		this.list = []
		this.adjustArr = [{ behavior: 'sleepFirst', index: 0 }]

		this.subscribe = function (behavior, callback){
			insertItem(this.list, this.adjustArr, { behavior, callback })
			throttle(this.publish, 0, this)
		}

		this.publish = function (){
			if(!this.list.length) return 
			this.list.shift().callback().then(()=>{
				this.publish()
			})
		}
		this.sayHi()
	}

	sayHi (){
		this.subscribe('sayHi', () => {  
			return new Promise((resolve, reject)=>{
				log(this.man, ': Hi, this is ' + this.man + '!') 
				resolve()
			})
		}) 
	}

	eat (what) {
		this.subscribe('eat', () => { 
			return new Promise((resolve, reject) => {
				log(this.man, ': Eat ' + what + '~') 
				resolve()
			})
		}) 
		return this
	}

	sleep (interval){
		this.subscribe('sleep', () => { 
			return new Promise((resolve, reject) => {
				log(this.man, ': Wake up after ' + interval) 
				setTimeout(()=>{
					resolve()
				}, interval * 1000)
			})		
		}) 
		return this
	}

	sleepFirst (interval){
		this.subscribe('sleepFirst', () => { 
			return new Promise((resolve, reject) => {
				log(this.man, ': Wake up after ' + interval)
				setTimeout(()=>{
					resolve()
				}, interval * 1000) 
			})
		}) 
		return this
	}
}

function lazyMan (man){
	return new LazyMan(man)
}

console.log('Test Test, Wei Wei Wei')
const oMan = lazyMan('wz').sleepFirst(3).eat('lunch').sleep(2).eat('dinner')

oMan.eat('fruit').sleep(1).eat('xiaoye')

lazyMan('sb').eat('fruit').sleepFirst(2).sleepFirst(3)