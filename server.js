const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server');

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:3be4b8e5-6304-4024-bb13-3200d767ba6f",
  key: "e94fb2c0-85b3-4415-9013-d8737f005002:VcaOH2kLt18jgWcY8n0L3iZte6+S3r82JqUYS5ljHqM=",
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post("/users", (req,res) =>{
  const {username} = req.body

  chatkit.createUser({
    id: username,
    name: username,
  })
    .then(() => {
      console.log('User created successfully');
    }).catch((err) => {
      if(err.error==="services/chatkit/user_already_exists"){
        res.sendStatus(200)
      }
      else{
        res.status(err.statusCode).json(err)
      }
      console.log(err);
    });

    
})


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
