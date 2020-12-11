# React关联至Keycloak

## 博客《keycloak学习》
[keycloak学习](https://www.cnblogs.com/weschen/p/9530044.html)

## 第一步：提取当前代码
```
git clone https://github.com/ChenWes/keycloak-demo
```

## 第二步：启动keycloak应用
下载应用后，进入至bin目录，使用powershell，运行命令
```
.\standalone.bat -b 0.0.0.0
```
在keycloak运行后，浏览器打开地址：http://localhost:8080,
在第一次登陆需要创建用户名和密码，创建帐号后登陆至keycloak
## 第三步：在keycloak中创建一个realm
在系统菜单左侧，在realm的下拉菜单中创建一个realm，只需要输入realm的名称即可

## 第三步：在keycloak中创建一个client
在刚创建的realm中创建一个client，
* 指定相应的client名称，
* 指定client的Root URL，例如本例为：http://localhost:3000/
* 指定client的Valid Redirect URIs，例如本例为：http://localhost:3000/*
* 指定client的Admin URL，例如本例为：http://localhost:3000/
* 指定Web Origins，例如本例为：http://localhost:3000

## 第四步：在keycloak中创建一个用户
在刚创建的realm中创建一个user，并创建一个用户口令

## 第五步：在react应用中指定相应的参数
在本示例中\src\auth.js中第3-7行中指定相应的参数
* url: keycloak的URL地址（本地运行的地址为http://localhost:8080/auth）
* realm: 刚刚创建的realm（例如TestProject）
* clientId: 刚刚创建的client名称（例如'democlient'）

## 第六步：运行react应用测试
在本示例中，在命令行运行yarn start或npm start，会自动打开http://localhost:3000