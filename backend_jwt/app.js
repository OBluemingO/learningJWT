const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const users = [
  {
    id:"1",
    username:"arm",
    password:"arm0908",
    isAdmin: true,
  },
  {
    id:"2",
    username:"ward",
    password:"ward0908",
    isAdmin: false,
  }
]

let refreshTokens = []

app.get(`/`, (req, res) => {
  res.send('on port : 5000')
})

app.post(`/api/refresh`, (req, res) => {
  // ! step 1 take the refresh token from the user  
  const refreshToken = req.body.token

  // ! step 2  send error  if there is no token or it's invalid
  if(!refreshToken) res.status(401).json("You are not authenticated! ")
  if(!refreshTokens.includes(refreshToken)) res.status(403).json("Refresh token is not valid!")

  jwt.verify(refreshToken, "myRefreshSecretKey",(err, userData) => {
    if(err) console.log(err, 'myRefreshSecretKey')

    refreshTokens = refreshTokens.filter(token => token !== refreshToken)

    const newAccessToken = generateAccessToken(userData, "mySecretKey")

    // * เราไม่จำเป็นต้องสร้างใหม่ก็ได้ , เเต่ ถ้าสร้างขึ้นมาใหม่ก็จะทำให้มัน มีความปลอดภัยขึ้น 
    const newRefreshAccessToken = generateAccessToken(userData, "myRefreshSecretKey")

    refreshTokens.push(newRefreshAccessToken)
  // ! step 3 if everything is ok, create new access token, refresh token and send to user 

    res.status(200).json({
      accessToken: newAccessToken,
      refreshAccessToken: newRefreshAccessToken,
    })
  })
})

const generateAccessToken = (payload_data, secret_key) => { 
  if(secret_key === 'myRefreshSecretKey') return jwt.sign(payload_data, secret_key)
  return jwt.sign(payload_data, secret_key, {expiresIn: "2m"})
}

app.post(`/api/login`, (req, res) =>{
  const {username:u, password:p} = req.body
  const user = users.find(({username, password}) => username === u && password === p )

  if(user){
    const payload_data = {
      id: user.id,
      isAdmin: user.isAdmin
    } 

    //* generate an access token
    const accessToken = generateAccessToken(payload_data, "mySecretKey")
    const refreshToken = generateAccessToken(payload_data, "myRefreshSecretKey")
    refreshTokens.push(refreshToken)

    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken
    })

  }
  else{
    res.status(400).json("Username or password incorrect! ")
  }
})

// middle ware , jwt 
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if(authHeader){
    const token = authHeader.split(" ")[1]
    jwt.verify(token, 'mySecretKey' , (err,userData) => {
      if(err) res.status(403).json("Token is not valid!")

      req.user = userData

      // * เป็น func ที่บอก middle ว่าเราทำ process เสร็จแล้วก็ให้ callback กลับไปหา endpoint ที่เราได้ทำการเรียกใช้ middle ware ตัวนี้
      next()

    })
  }
  else{
    res.status(401).json("You are not authenticated!")
  }
}

app.post(`/api/logout`, verify, (req, res) =>{
  const refreshToken = req.body.token 
  refreshTokens = refreshTokens.filter(token => token !== refreshToken)
  res.status(200).json("You logged out successfully.")
  
})

// * เข้าใจง่ายคือ ก่อนที่จะ respone ให้กับ clicent เราได้ทำการเรียก middle ware ตัวอื่นก่อนที่จะ respone กลับไป
app.delete("/api/users/:userId", verify, (req, res) => {
  if(req.user.id === req.params.userId || req.user.isAdmin){
    res.status(200).json("User has been deleted.")
  }
  else{
    res.status(403).json("You are not allow to delete this user!")
  }
})

app.listen(5000,() => console.log('on port 5000'))
