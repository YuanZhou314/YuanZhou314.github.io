---
title: Python asyncio基本使用
categories:
  - Dev
tags:
  - Python
abbrlink: ce418c79
date: 2023-03-13 11:25:50
index_img:
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、导购
 -->
`asyncio`(读做：A-'Sing-K-IO) 是 Python3.4 引入的标准库，内置了对异步的支持。它的编程模型就是一个消息循环（事件循环），从`asyncio`模块中获取一个`eventLoop`，然后把需要执行的协程放进去，就实现了异步IO。

## 主要概念

* 协程函数：定义函数时用的函数名
* 协程对象：执行协程函数得到的协程对象，如`result=func()`，`result`即协程对象。

## 协程代码demo

在函数前面添加`async`，该函数类型就变成了协程函数，类型为`coroutine`，协程函数的特点是执行的时候可以暂停，交出执行权。

当执行引擎遇到下面的`await`命令时，线程不会等待这个 IO，而是直接中断并执行下一个消息循环，当 IO 阻塞结束，再回来继续往下运行。即：**遇到 IO 阻塞时自动切换其他任**务。

注：直接调用协程函数是不运行内部代码的，必须放入事件循环才能运行。

* `asyncio.gather()`需要所有任务都执行结束，如某个携程函数崩了，就会抛出异常
* `asyncio.wait()`可以定义函数返回的时机。FIRST_COMPLETED(第一个结束的), FIRST_EXCEPTION(第一个出现异常的), ALL_COMPLETED(全部执行完，默认的)

```
async def count():
    print('one')
    await asyncio.sleep(2)
    print('two')

async def main():
    await asyncio.gather(count(), count(), count())

asyncio.run(main())  # Python3.7后写法

# 该代码输出：
one
one
one
two
two
two
```



## 事件循环Eventloop

asyncio内部执行大致流程

1. 首先建立一个需要运行的任务列表，列表中有多个任务
2. 循环检查列表中所有任务，将 可执行 和 已完成 的任务返回
3. 进行任务处理：
   * **执行** 可执行 状态的任务
   * 将 已完成 的任务从任务列表中**移除**
4. 如果 任务列表中的任务都已完成，则终止循环

```
# 手动或获取一个时间循环
asyncio.get_event_loop()

# 将任务手动放到 任务列表
loop.run_unitl_complete(任务)
```



## await关键字

`await`后面可以接三种类型的对象，均为 IO 等待：

1. **协程对象**：如：`await asyncio.sleep(1)`、`await func()`等不同写法。

注意，当一个协程函数中有多段`await`修饰的代码时，会等第一个`await`操作完了（等待对象的值得到结果后）才会继续往下执行。因为代码由上而下执行，交换执行权只在阻塞时的协程函数中进行。

也就是说，`await`的作用就是处理执行权交错导致的数据混乱。由`await`修饰的代码，必须有结果了才会继续执

2. **Task 对象**：允许立即将任务添加至事件循环中。

`await`后面接协程对象时，将会直接进行 IO 阻塞。而`asyncio.create_task(func())`只会将`func()`添加到事件循环中，等出现 IO 阻塞时才会去轮询执行。如下是一个demo

```python
async def nested():
    print(1)
    await asyncio.sleep(2)
    print(2)
    return 'return'

async def main():
    task_list = [
        asyncio.create_task(nested(), name='n1'),
        asyncio.create_task(nested(), name='n2')
    ]
     # done为获取所有任务执行完成后的结果集，pending存放了超时后的结果集，一般不用
    done, pending = await asyncio.wait(task_list, timeout=None,return_when=asyncio.tasks.ALL_COMPLETED)

# 输出
1
1
2
2
{<Task finished name='n2' coro=<nested() done, defined at d:/z-bank/bank/temp2.py:4> result=8>, <Task finished name='n1' coro=<nested() done, defined at d:/z-bank/bank/temp2.py:4> result=8>}
```

注意，上述代码中事件循环在`asyncio.run()`运行时已经创建好了，所以在协程函数main的内部可以直接创建任务列表。而如果在协程函数外部，是无法先创建任务列表的，因为事件循环尚未创建。

如果需要在外部创建任务列表（即不使用main函数），参考如下写法。（这种写法使用较少，一般都是用一个`main()`代替 ）

```python
async def nested():
    print(1)
    await asyncio.sleep(2)
    print(2)
    return 'return'
    
task_list = [
        nested(),
        nested()
    ]
done, pending = asyncio.run(asyncio.wait(task_list))
```



3. **Future 对象**：更底层、一般不会直接用，是Task类的基类，强调的是等待处理。

```
async def after(fut):
    await asyncio.sleep(2)
    fut.set_result('1')

async def main():
    loop = asyncio.get_running_loop()
    fut = loop.create_future()
    await loop.create_task(after(fut)) # 将给 fut 赋值的函数添加到任务列表等待执行
    # 开始 IO 等待，切换其他任务，即after()函数，执行完成后，fut已经有结果了，就直接赋值给data
    # 如果 fut 一直没有获得值，那么就会一直等待下去。
    data = await fut
```

## 应用场景

异步编程的使用场景一般是 IO 密集应用，包括网络读取、数据库读取。计算密集应用下没有太多优势，异步优势在于高效使用CPU处理缓慢的IO。

因此，最佳的使用场景是**IO密集**且IO操作较慢，需要多任务协同实现。如下爬虫爬取100个页面，当程序运行时，Python 会自动调度这100个协程，当一个协程在等待网络 IO 返回时，切换到第二个协程并发起请求，在这个协程等待返回时，继续切换到第三个协程并发起请求……。程序充分利用了网络 IO 的等待时间，从而大大提高了运行速度。

```
import asyncio
import aiohttp

template = 'http://exercise.kingname.info/exercise_middleware_ip/{page}'


async def get(session, queue):
    while True:
        try:
            page = queue.get_nowait()
        except asyncio.QueueEmpty:
            return
        url = template.format(page=page)
        resp = await session.get(url)
        print(await resp.text(encoding='utf-8'))

async def main():
    async with aiohttp.ClientSession() as session:
        queue = asyncio.Queue()
        for page in range(1000):
            queue.put_nowait(page)
        tasks = []
        for _ in range(100):
            task = get(session, queue)
            tasks.append(task)
        await asyncio.wait(tasks)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```
