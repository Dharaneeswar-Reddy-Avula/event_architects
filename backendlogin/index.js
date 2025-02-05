const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const app=express();
app.use(express.json());
app.use(cors())

app.listen(4000,()=>{
    console.log("server started")
})


mongoose.connect("mongodb://localhost:27017/Project")
.then(()=>{
    console.log("Db connected")
})
.catch((err)=>{
    console.log(err)
})

// we create this to find the user
const fetchUser  = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate token" });
    } else {
        try {
            // HERE after token given thing should be same in both should give the secret_ecom if different we cannot get correct output
            const data = jwt.verify(token, "secret_ecom");
            // { use: { id: '679bbda88b2688b510878f50' }, iat: 1738306622 } here the id is present in use key so we should use data.use
            // here in login we save our id in use 
            req.use = data.use; // Assuming 'users' is a property in the token payload
            next(
                
             );
            // When you call next(), it tells Express to move on to the next middleware function in the stack. If you don't call next(), the request will hang, and the response will not be sent, as Express will not know to continue processing.
        } catch (error) {
            console.error("Token verification error:", error); // Log the error
            return res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};


const Users=mongoose.model("User",{
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
})


app.post('/signup',async (req,res)=>{
    let check=await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,errors:'existing user found'})
    }
    const users=new Users(
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        }
    )
    await users.save();
    // here by using object data we create token for the jwt
    const data={
        users:{
            id:users.id,
        }
    }
    const token=jwt.sign(data,"secret_ecom");
    // here in json we should pass name,password,email so that we get the token with keys success and token
    res.json({success:true,token})
})



app.post('/login',async(req,res)=>{
    // here we are checking whether we have already have an account for that we check them in Users
    let use=await Users.findOne({email:req.body.email})
    if(use){
        const passCompare=req.body.password===use.password;
        if(passCompare){
            const data={
                // here while login it store the mail id in use so we are already login completed so it is stored in use
                use:{
                    id:use.id
                }
            }
            const token=jwt.sign(data,"secret_ecom")
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Wrong Password"})
        }
    }
    else{
        res.json({success:false,errors:"Wrong email"})
    }
})


