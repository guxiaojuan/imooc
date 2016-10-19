# imooc
Express+MongoDB

npm install express
npm install jade
npm install mongoose

npm install -g bower
bower install bootstrap
npm install body-parser
npm install underscore


#mongodb的开启及配置
对于第一次使用mongodb这个非关系型数据库的人来说，这个数据库服务的开启真不是那么容易的
简单记录下过程：
1. 上mongodb官网下载解压后安装mongodb,我装到了G:\mongodb文件夹下
2. 在mongodb文件夹下建立两个空文件夹data（数据库数据存放）和log（日志存放），将G:\mongodb\bin
   路径加入环境变量中，成为全局变量
3. cmd进入G:\mongodb\bin中，输入mongod --dbpath "G:\mongodb\data"
4. 上边命令的意思是修改数据存储路径，至此mongodb服务开启
5. 可以在浏览器中输入localhost:27017,显示It looks like you are trying to access MongoDB 
    over HTTP on the native driver port.
6. 在别的shell中进入G:\mongodb\bin(刚才开启的服务不能关闭)，可以在客户端对mongodb进行操作
7. 我们的项目中用到的数据库名叫movies，可以自己手动建立一个
8. 输入mongo 127.0.0.1:27017, 出现 MongoDB shell version: 3.2.10
                                   connecting to: 127.0.0.1:27017/
                                   Welcome to the MongoDB shell.
9. use movies (此时该数据库并不真正存在，还需要对其添加数据)
     >use movies
       switched  to db movies
       
10.db.movies.save({'id':1}) 
     >db.movies.save({'id':1})
     WriteResult({"nInserted"1}) 
11.此时就可以使用show dbs来查看都有什么数据库了
      >show dbs
      local  0.000GB
      movies  0.000GB

                              
