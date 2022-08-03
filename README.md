## Views中放路由组件
  - Data
  - Event
  - Director
  - ...

## Pages中放一级路由组件
  - login
  - home

## component 中放公用组件（复用组件）
  - Loading
  - Auth
  - Header
  - 甚至可以放Menu（这个项目没必要）
  - （鼓励多抽离服用组建）

## utils自定义的工具包
  - token相关
  - （后期可能会增加，鼓励多写工具函数）

## 使用craco修改antD的默认颜色以及样式的按需引入
  - [借鉴文章1](https://blog.csdn.net/HL477/article/details/122570061)
  - [借鉴文章2](https://blog.csdn.net/weixin_45526332/article/details/123722429)
  - 遇到的问题：配置之后重新运行非常慢

## 解决手动刷新页面，菜单重置到默认选项的bug：
  ```bash
      # 修改菜单List中的key对呀pathname
      const items = [
        { label: <Link to={"/home/data"} className='item' >数据概览</Link> , key: "/home/data", },
        { 
            label: "角色管理",
            key: "/home/manage",
            children: [
                { label: <Link to={"/home/manage/station"} className='item itemc'>站长管理</Link>, key: "/home/manage/station", },
                { label: <Link to={"/home/manage/director"} className='item itemc'>儿童主任管理</Link>, key: "/home/manage/director", },
            ]
        },
        { label: <Link to={"/home/event"} className='item'>事件管理</Link>, key: "/home/event", },
        { label: <Link to={"/home/set"} className='item'>设置</Link>, key: "/home/set", },
      ]
      # 每次页面刷新都会得到目前页面的的pathname
      let { pathname } = useLocation()

      # 菜单的默认选项设置为pathname
  ```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

