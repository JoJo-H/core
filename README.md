# core
核心库

目录结构：
    UI          ui基类
    cache       缓存数据
    mvc         mediator、proxy、notifaction 参考puremvc观察者模式
    animation   动画
    network     网络通信
    util        工具类
    platform    平台
    behavior    行为








Egret相关：
通过FrameEventCenter替代帧循环监听
通过TimerManager替代new Timer
尽量用序列帧代替透明度渐变及遮罩实现的动画
少用get、set语法糖，如需使用子类在调用父类的get、set需采用egret自身封装的方法
图片资源尽量合并为大图
文本文件采用zip压缩
常用UI面板关闭时尽量缓存
减少频繁的实例化，请使用对象池
在适当的时候销毁实例化对象及Resource加载的资源
根据变量的使用频率决定它是否为临时变量
注意UI与逻辑分离，逻辑与数据分离，
谨慎的选择需要使用的容器类型，显示类尽量从Component和EUIComponent继承