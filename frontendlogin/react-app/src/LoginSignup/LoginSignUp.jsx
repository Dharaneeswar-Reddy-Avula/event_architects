import React,{useState} from 'react'
import './LoginSignUp.css'
const LoginSignUp = () => {
  const[state,setState]=useState("Login");
  const[dataform,setformdata]=useState({
    name:"",
    email:"",
    password:"",
  })

const changehandler=(e)=>{
setformdata({...dataform,[e.target.name]:e.target.value})
}
const login=async ()=>{
let responsedata;
await fetch('http://localhost:4000/login',{
 method:"POST",
 headers:{
   "Content-Type":"application/json",
},
body:JSON.stringify(dataform)
}).then((res)=>res.json()).then((data)=>responsedata=data);
if(responsedata.success){
 // here we are setting in the localstorage in the key auth-token and value is generated token
 localStorage.setItem('auth-token',responsedata.token);
 // here it is used to go to home page
 window.location.replace('http://localhost:5500/event_architects/')
}
else{
alert(responsedata.errors) 
}
}
const signup=async ()=>{
  let responsedata;
  await fetch('http://localhost:4000/signup',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(dataform)
  }).then((res)=>res.json()).then((data)=>responsedata=data);
  if(responsedata.success){
    localStorage.setItem('auth-token',responsedata.token);
    // here it is used to go to home page
    window.location.replace('http://localhost:5500/event_architects/')
  }
  else{
   alert(responsedata.errors) 
  }
}
  return (

    <div className='loginsignup'>
      <a href='http://localhost:5500/event_architects/'><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000080" className='but' ><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg></a>
      <div className="loginsignup-container">
        <h1 className='forfont'>
          {state}
        </h1>
        <div className="loginsignup-fields">
         {state==="Register"?<input type="text" name="name" value={dataform.name} placeholder="enter your name" onChange={changehandler}/>:<></>}
          <input type="email" name="email" value={dataform.email}  onChange={changehandler} placeholder="Enter your Email"/>
          <input type="password" name="password"  onChange={changehandler} value={dataform.password} placeholder="Enter your Password"/>
        </div>
        <button onClick={()=>(state==="Login")?login():signup()}>Continue</button>
        {state==="Register"?<p className='loginsignup-login'>Already have an account?<span onClick={()=>setState("Login")}>Login here</span></p>:<></>}
       {state==="Login"?<p className='loginsignup-login'>Create an account?<span onClick={()=>setState("Register")}>Click here</span></p>:<></>}
      </div>
    </div>
  )
}

export default LoginSignUp
