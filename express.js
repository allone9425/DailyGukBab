const express = require('express');
const app = express()
const port = 4000

// body json 파싱
app.use(express.json());


app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`);
})