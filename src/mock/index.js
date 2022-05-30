// 导入 express模块
const express = require('express')

// 创建 web服务器
const app = express()

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())

//配置解析 application/json 格式数据的内置中间件
app.use(express.json())

//配置中间件解析post application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

app.get('/mock', (req, res) => {
  console.log(req.body, '-->从前台获取的数据')
  res.send({
    status: 200,
    msg: 'get成功',
    RESULT_MES: '成功'
  })
})

app.post('/mock', (req, res) => {
  console.log(req.body, '-->从前台获取的数据')
  res.send({
    status: 200,
    msg: 'post成功',
    RESULT_MES: '成功'
  })
})

// 启动服务器
app.listen(3000, () => {
  console.log('💙💛 服务在3000端口启动')
})
