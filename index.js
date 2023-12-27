const express = require("express");
const{pool} = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport =require("./passportConfig")

const port = process.env.PORT||5500;
const app = express();

initializePassport(passport);

app.use(express.static("Public"));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: "secret",

    resave: false,

    saveUninitialized: false,
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/users/register",checkAuthenticated,(req,res)=>{
    res.render("register.ejs");
})
app.post("/users/register",async(req,res)=>{
    let{name,email,password,password2}= req.body;
    console.log({
        name,
        email,
        password,
        password2
    });

    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({message:"Please enter all the fields"});
    }
    if(password.length<6){
        errors.push({message:"Password should be atleast 6 characters"});
    }
    if(password != password2 ){
        errors.push({message:"Password do not match"});
    }
    if(errors.length>0){
        res.render("register.ejs",{errors});
    }
    else{
        // Form validation is done

        let hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM users
            WHERE email = $1`,
            [email],
            (err,results)=>{
                if(err){
                    throw err;
                }
                console.log(results.rows);

                if(results.rows.length > 0){
                    errors.push({message: "Email already registered"});
                    res.render("register.ejs",{errors});
                }else{
                    pool.query(
                        `INSERT INTO users (name,email,password)
                        VALUES($1,$2,$3)
                        RETURNING id, password`,
                        [name,email,hashedPassword],
                        (err,results)=>{
                            if(err){
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash("success_msg","You are now registered. Please log in");
                            res.redirect("/users/login");
                        }
                    )
                }
            }
        )

    }
})
app.get("/users/login",checkAuthenticated,(req,res)=>{
    res.render("login.ejs");
})

app.post("/users/login",passport.authenticate("local",{
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
}) ,(req,res)=>{
    res.redirect("/users/dashboard");
})

app.get("/users/dashboard",checkNotAuthenticated,(req,res)=>{
    res.render("resume.ejs");
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        res.redirect("/users/dashboard");
    }
    return next();
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/users/login");
}

app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
})

app.get("/users/resume",checkNotAuthenticated,(req,res)=>{
    res.render("resume.ejs");
})