const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')
const { User } = require("./models/User")


//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//application/json
app.use(express.json())
app.use(cookieParser())


const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...')).catch(err => console.log(err))



app.get('/', (req,res) => res.send('Hello, World! dsasdasdasddsds'))


app.get('/api/hello', (req,res) =>{

    res.send("안녕하세요")
})





app.post('/api/users/register', (req, res) => {
    ///회원 가입 시 필요한 정보를 client 에서 가져오면
    // 그것을 데이터베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) =>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success:true
        })
    })
})

app.post('/api/users/login', (req, res)=>{

    // 요청된 이메일을 DB에서 있는 지 찾는다.
    User.findOne({ email: req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당되는 유저가 없습니다."
            })
        }
        // Email에 매핑되는 비밀번호가 맞는 지 확인.

        user.cmpPassword(req.body.password, (err, isMatch)=>{
            if(!isMatch)
            return res.json({
                loginSuccess : false, message: "비밀번호가 틀렸습니다."
            })

            // 비밀번호까지 맞다면 토큰 생성.
            user.generateToken((err, user) =>{
                if(err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 등등 쿠키에서해보자
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId: user._id,
                })
            })
        })
    })
})


app.get('/api/users/auth', auth, (req, res)=>{
    // 여기 까지 미들웨어를 통과해 왔다 = Authenticaton 이 True 라는 것.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role ===0 ? fasle : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image

    })
})


app.get('/api/users/logout', auth, (req, res) =>{
    // 여기 까지 미들웨어를 통과해 왔다 = Authenticaton 이 True 라는 것.
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""},
        (err, user) =>{
            if(err) return res.json({success:false, err})
            return res.status(200).send({
                success: true
            })
        })

})


const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
