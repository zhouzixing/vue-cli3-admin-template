### 引用
本项目是基于大神“花衩裤” [vue-admin-template](https://note.youdao.com/) 项目进行延伸进行延伸。如果你有缘使用本项目做模板，请不忘给[vue-admin-template](https://note.youdao.com/)一个star
### 使用

```bash
1. $ git clone https://github.com/zhouzixing/vue-cli3-admin-template.git web-admin(web-admin可以你自己相要的项目名代替)

2. cd web-admin

// 如果没有淘宝镜像建议安装一个，要不然使用npm会非常慢
3. $ npm install --registry=https://registry.npm.taobao.org

4. cnpm install

5. npm run serve
```
如果跑成功界面应该是这样
![登录界面](https://github.com/zhouzixing/vue-cli3-admin-template/images/vue-cli3-admin-template/login)

### 不同点或改进

> 1. 使用了vue-cli3 替换了原来的vue-cli2  
     -- 具体有点可以查看[vue-cli3](https://cli.vuejs.org/)
> 1. 添加了页签  
>    -- 个人觉得后面管理系统页签还是非常有价值的  
>    -- 页签模板引用[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 的页签，同时修复了嵌套页面keep-alive不缓存问题 
> 1. 在global.scss加了少许全局共用的css
> 1. 增加了一个“账号管理”模板  
>    -- 因为后台管理大部分是雷同操作，所以为了方便提供了一个简易模板，如果样式不和胃口可以在global.scss中进行调整
>

### 补充
#### 页签使用：

```javascript
1. 如果有嵌套页面，需要在子页面的路由的meta中加入redirectedFrom属性，值就是父级路由的name
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'equipment'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1', redirectedFrom: 'Nested' },
     }
    ]
   }
2. 以上这样改的，是把父页面下的所有子页面进行缓存，所以会引发一个问题，就是你在meta中设置了noCache=true是无效的，这个问题也是keep-alive本身的bug。不过该问题通常只要在新增的时候需要解决
   解决办法：每次新增时候，写一个clearForm方法，然后把form置空即可 具体代码可以查https://github.com/zhouzixing/vue-cli3-admin-template/blob/master/src/views/account/index.vue
```
