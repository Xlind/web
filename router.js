var fs = require("fs")
var express = require("express")
var Students = require("./students.js")

//创建一个路由
var router = express.Router()
//把路由都挂载到router路由容器中

//首页，读取json数据
router.get('/students',function(req,res){
    
    // fs.readFile('./db.json','utf8',function(err,date){
    //     if(err){
    //         return res.status(500).send("server err.")
    //     }
    //  var students = JSON.parse(date).students 
    //  var fruits = JSON.parse(date).fruits  
    //  res.render('index.html',{
    //     fruits: fruits,
    //     students: students
    // })   
    // })  
    Students.find(function(err,stu){
        if(err){
            return res.status(500).send("server err.")
        }
        res.render('index.html',{
            fruits: stu.fruits,
            students: stu.students
        }) 
    })
})
//添加form页面
router.get('/students/form',function(req,res){
   res.render('form.html')
   
})
//获取form页面表单的提交的数据
router.post('/students/form',function(req,res){
//    console.log(req.body)
    Students.save(req.body,function(err){
        if(err){
            return res.status(500).send("server err.")
        }
        res.redirect('/students')
    })
})
//渲染edit编辑页面
router.get('/students/edit',function(req,res){
  Students.findByid(parseInt(req.query.id),function(err,student){
    if(err){
        return res.status(500).send("server err.")
    } 
    res.render('edit.html',{
        student:student
    })   
  })    
})
//处理edit页面
router.post('/students/edit',function(req,res){
    // console.log(req.body)
    Students.updateByid(req.body,function(err){
        if(err){
            return res.status(500).send("server err.")
        }
        // console.log(req.body)
        res.redirect('/students')
    })
})
//处理delete删除请求
router.get('/students/delete',function(req,res){
  // 1. 获取要删除的 id
  // 2. 根据 id 执行删除操作
  // 3. 根据操作结果发送响应数据
  Students.deleteById(req.query.id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

//把router导出
module.exports = router
