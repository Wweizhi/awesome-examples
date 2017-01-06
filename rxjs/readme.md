- ### FRP (Functionial Reactive Programming)，函数响应式编程
- ### rxjs（Reactive Extension For Javascript），Js的响应式扩展，FRP于Js中的一种实现；
1. #### 定义：RxJS = Observables + Operators + Schedulers；一个Js库，其使用可观测的集合和数组来编写异步的和基于事件的程序。

2. #### 核心思想：把随时间不断变化的数据、状态、事件等等转成可被观察的序列(Observable Sequence)，然后订阅序列中那些Observable对象的变化，一旦变化则执行相应的操作。

3. #### 适用场景：
    1. 异步操作和事件组合多（如Dom事件、ajax）
    2. 一时间段内处理多个数据源

4. #### 作用：
    1. 可链式调用，简洁且可读性强
    2. 提高代码复用性、降低耦合性
    3. 解决复杂的异步编程问题

5. #### 可用marble diagram来描述Observables，如
    --a---b-c--d-----e--|-->  
    `-` 表示时间轴，`a ~ e` 表示 emit 的值，`|` 则表示这个 stream 已经结束了。
比方说，click 事件用上图来表示：a 表示第 1 次点击，b 表示第 2 次点击，如此类推。

6. Promise vs Observable：http://yuyang041060120.github.io/2016/05/16/observable-vs-promise/

7. 核心Api：`Observable`，Rx 提供了一种叫 Observable 的数据类型，兼容 ECMAScript 的 Observable Spec Proposal 草案标准。他是 Rx 最核心的数据类型，结合了 Observer Pattern（观察者模式），Iterator Pattern（迭代器模式）。