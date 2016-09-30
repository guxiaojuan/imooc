var mongoose=require('mongoose')

var movieSchema=new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createAt:{                //创建时候的时间
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

//为Schema（模式）添加方法
movieSchema.pre('save',function(next){    //每次存储数据前，都会调用该方法
    if(this.isNew){  //判断是否是新增加的数据
        this.meta.createAt=this.meta.updateAt=Date.now();
    }
    else{
        this.meta.updateAt=Date.now();
    }
    next();
});
//添加一个静态方法
movieSchema.statics={
    fetch:function (db) { //取出目前数据库中的所有数据
        return this
            .find({})
            .sort(this.meta.updateAt)
            .exec(db);
    },
    findById:function(id,db){  //用来查询单条数据
        return this
            .findOne({_id:id})
            .exec(db);
    }
};

module.exports=movieSchema;