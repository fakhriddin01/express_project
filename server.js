const express = require('express');
const dotenv = require('dotenv');
const fruitsRouter = require('./router/fruits_router')
const animalRouter = require('./router/animal_router')
const carRouter = require('./router/cars_router')
const userRouter = require('./router/users_router')
const authRouter = require('./router/auth_router')
const exphbs = require('express-handlebars')
const session =require('express-session')
const session_variable = require('./middleware/sesson_variable');


const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})

dotenv.config();
let port = process.env.PORT;


const app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))


app.use(authRouter);
app.use(userRouter);
app.use(session_variable);
app.use(fruitsRouter);
app.use(animalRouter);
app.use(carRouter);


app.listen(port, ()=>{
    console.log(port);
})


