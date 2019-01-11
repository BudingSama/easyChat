# react-easychat
- **version**
```
verison 1.2.1
```

- **quick start**

```
$ npm install react-easychat -S
```
- **options**

```
  const options = {
    nickname:'',//可选 助手名称
    defaultTalk:[],//可选 默认发送信息列表 maxlengh <= 3
    status:'',//可选 助手在线状态 在线/离线/忙碌/离开
    chatStatus:'',//可选 助手聊天状态
    placeholder:'',//可选 输入框 placeholder
    offsetTop:20,//必填 按钮高度
    position:'left'//必填 助手定位[包括动画方向] left/right
  }
      
      
  <EasyChat options={options} />
```
- **example**

![](https://raw.githubusercontent.com/BudingSama/easyChat/master/demo.png)

![](https://raw.githubusercontent.com/BudingSama/easyChat/master/GIF.gif)
