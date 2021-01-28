const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8880;

// 设定静态文件目录
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// 启动服务器
app.listen(port, function () {
  console.log(`Server start on: http://127.0.0.1:${port}`)
})