///数据操作文件模块(设计api)
var fs = require('fs')

var dbPath = './db.json'

//获取学生列表
exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function(err,date){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(date))
    })
}
// find(function(err,date){})

//根据id获取学生信息
exports.findByid = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,date){
        if(err){
            return callback(err)
        }

        //先读取数据，转为对象
        var students  = JSON.parse(date).students
        //find方法遍历
        var result = students.find(function(item){
            return item.id === parseInt(id)
        })
        callback(null,result)
    })
}

//添加保存学生
exports.save = function(stu,callback){
    fs.readFile(dbPath,'utf8',function(err,date){
        if(err){
            return callback(err)
        }

        //先读取数据，转为对象
        var students  = JSON.parse(date).students

        //增加id,使id不重复
        stu.id = students[students.length-1].id + 1

        //再往对象里面push数据
        students.push(stu)

        //接着，再把对象转为字符串
        var result =JSON.stringify({
            students : students
        })

        //然后把字符串写入文件
        fs.writeFile(dbPath,result,function(err){
            if(err){
                //如果写入有错，把错误传给错误对象
                return callback(err)
            }
            //如果保存成功，错误对象为null
            callback(null)
        })
    })
}

// save({
//     name : 'xdd',
//     age :13
// },function(err){
//     if(err){
//         console.log("保存失败...")
//     }else{
//         console.log("保存成功...")
//     }
// })


//更新学生
exports.updateByid = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,date){
        if(err){
            return callback(err)
        }
        // console.log(student)
        //先读取数据，转为对象
        var students  = JSON.parse(date).students
        //转换id数字类型
         student.id =parseInt(student.id)
        // console.log(students)
        //find方法遍历
        var stu = students.find(function(item){
            // console.log('item的输出为：'+item)
            return item.id === student.id
            
        })
        // console.log(stu)
        //遍历拷贝对象
        for(var key in student){
            // console.log(student)
           stu[key] = student[key] 
        //    console.log(stu[key])
        }
        //   console.log("stu【key】的输出是："+stu[key])
         //接着，再把对象转为字符串
         var ret =JSON.stringify({
            students : students
        })
        console.log("结果输出："+ret)
        //然后把字符串写入文件
        fs.writeFile(dbPath,ret,function(err){
            if(err){
                //如果写入有错，把错误传给错误对象
                return callback(err)
            }
            // console.log(result)
            //如果保存成功，错误对象为null
            callback(null)
        })
})
}


//删除学生
exports.deleteById = function(id,callback){
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
          return callback(err)
        }
        var students = JSON.parse(data).students
    
        // findIndex 方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function (item) {
          return item.id === parseInt(id)
        })
    
        // 根据下标从数组中删除对应的学生对象
        students.splice(deleteId, 1)
    
        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
          students: students
        })
    
        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
          if (err) {
            // 错误就是把错误对象传递给它
            return callback(err)
          }
          // 成功就没错，所以错误对象是 null
          callback(null)
        })
      })
}