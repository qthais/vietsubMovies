const express= require('express')
const Routes= require('./routes/routes')
const path= require('path')
const {loadOphimMovies}=require('./config/init')
const ENV_VARS = require('./config/vars')
const db=require('./config/db')
const cookieParser = require('cookie-parser')
const app=express()
const cors = require('cors')
const port=ENV_VARS.PORT
db.connect()
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173', 'https://cinestream.onrender.com'], // ✅ Allow only specific domains
    credentials: true,
}));
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
});

app.use('/api/avatarImages', express.static(path.join(__dirname, 'public/avatarImages')));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
Routes(app)
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
loadOphimMovies(100)
//czJMSeHQEl6MeBie