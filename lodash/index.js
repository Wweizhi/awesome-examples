// 返回一个多一个维度的数组
var arr = _.chunk([
	[231,12,312],
	{ name: 'faj', id: '12' },
])

console.log(arr, 'chunk: 返回一个多一个维度的数组')

var arr1 = _.compact([1, undefined, 2, null, 3, 0])
console.log(arr1, 'compact: remove falsy values, including false, undefined, null, 0, \'\', NaN')

var arr2 = _.difference([3,2], [4,5])

console.log(arr2, 'difference: 返回第一个数组中的第二个数组不包含的项')

var arr3 = _.differenceBy([{ 'y': 1 }, { 'y': 2 }, { 'x': 2 }, { 'x': 3 }], [{ 'x': 3 }], 'x')
var arr4 =_.differenceBy([{ 'x': 2 }, { 'y': 1 }], [{ 'x': 2 }], 'x'); 
console.log(arr3, arr4, 'differenceBy: 第三个参数为筛选器, 筛选与第二个数组中x属性的值不相等的项')

var arr5 = _.drop([1,2,3,4], 3)
var arr6 = _.dropRight([1,2,3,4], 1)
console.log(arr5, arr6, 'drop: _.drop(arr) => arr.slice(1) _.drop(arr, n) => arr.slice(n)，dropRight即从右边开始')

var arr7 = _.dropWhile([3,1,2,3,4], function(value){ return value == 3})
console.log(arr7, 'dropWhile:  Elements are dropped until predicate returns falsey，返回断言错误之后的数组')

var arr8 = _.fill([1,2,3,4,5], '$', 3, 4)
console.log(arr8, 'fill: _.fill(array, value, [start=0], [end=array.length])')