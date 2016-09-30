var express=require('express')
var path=require('path')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var _=require('underscore')
var Movie=require('./models/movie')
var port=process.env.PORT || 3000
var app=express()

mongoose.connect('mongodb:localhost/imooc');
app.set('views','./views/pages'); //设置视图根目录
app.set('view engine','jade');//设置模板引擎
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment=require('moment')
app.listen(port); //监听端口
console.log('immoc started on port 3000');

//编辑路由
//index page
app.get('/', function(req, res) {
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render('index',{
            title:'imooc首页',
            movies:movies
        })
    })

});

//detail page
app.get('/movie/:id', function(req, res) {
    var id=req.params.id;
    Movie.findById(id,function (err,movie) {
        res.render('detail',{
            title:'imooc'+movie.title,
            movie:movie
        })
    })
});

//后台录入页
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
});

//记录提交数据库
app.post('/admin/movie/new',function(req,res){
    var id=req.body.movie._id;
    var movieObj=req.body.movie;
    var _movie;
    if(id!=='undefined'){ //数据库中存在，只需要更新即可
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            _movie=_.extend(movie,movieObj);//调用underscore插件中的extend方法来替换对象字段,即用movieObj来覆盖movie
            _movie.save(function(err,movie){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+movie._id);
            })
        })
    }
    else {
        _movie = new Movie({
            title:movieObj.title,
            doctor:movieObj.doctor,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            flash:movieObj.flash,
            poster:movieObj.poster,
            summary:movieObj.summary
        });
        _movie.save(function (err,movie) {
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+movie._id);
        })
    }
});
//后台更新页
app.get('/admin/update/:id',function(req,res){
    var id=req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            res.render({
                title:'imooc后台更新页',
                movie:movie
            })

        })
    }
});
//list page
app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render({
            title:'immooc列表页',
            movies:movies
        })
    })
})

app.delete('/admin/list',function(req,res){
    var id=req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }
            else{
                res.json({
                    success:1
                })
            }
        })
    }
})
