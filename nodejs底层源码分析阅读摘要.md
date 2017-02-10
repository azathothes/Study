# nodejs底层源码分析阅读摘要

原文开篇链接: [Node源码详解 （一）](https://luzeshu.com/blog/nodesource1)

## **1.运行机制 、整体流程**

Nodejs项目代码结构分为4个，分别为：
1. 原生 js模块，存在于lib文件夹
2. node 源码，存在于src文件夹
3. v8引擎：node用来解析、执行js代码的运行环境。
4. **libuv**：事件循环库，提供最底层的 io操作接口（包括网络io操作的epoll_wait()、文件异步io的线程池管理）、事件循环逻辑。

nodejs事件循环的核心数据结构为：```default_loop_struct```,此为时间循环的核心。 在处理完js的代码后，运行时会调用libuv事件循环的入口函数```uv_run()```,其内部会维持一个循环，循环开始首先会判断```default_loop_struct```中是否有存活的io观察者(也就是绑没有绑定事件啦)，当然有两种情况

1. 没有事件挂起(没有io观察者)，程序退出。
2. 有io观察者，则```uv_run()```进入````epoll_wait()```线程挂起等待，监听对应的io观察者是否有数据到来。有数据到来(事件被触发)调用io观察者里保存着的callback（回调函数），没有数据到来时一直在epoll_wait()进行等待。

![事件循环图](https://dn-cnode.qbox.me/Fkd1LWFQaE9_4Qr727JhfiG6kdKF)

其中，io观察者分为两种：
1. 网络io 
2. 文件io

网络io通过封装io观察者，添加到```loop->watcher_queue```队列中，文件异步io不同于网络io，**文件异步io把请求操作交给线程池处理，所有线程池的异步io操作统一由一个io观察者来管理**，等线程池处理完毕再通过该io观察者告知事件循环（epoll_wait）有异步io操作完成，最后在事件循环的线程中执行回调函数。





