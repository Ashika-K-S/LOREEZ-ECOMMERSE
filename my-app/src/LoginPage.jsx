import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login(){
    const[data,setData]=useState(
        {
            email:"",
            password:""
        }
    )
    const navigate = useNavigate();


    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    };
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const result = await axios.get(
           `http://localhost:5000/users?email=${data.email}&password=${data.password}`

            )
            if(result.data.length>0){
                const user=result.data[0];
                localStorage.setItem("user",JSON.stringify(user))
                alert("Login successful")
                if(user.role==="admin"){
                    navigate("/admin")
                }else{
                    navigate("/home")
                }
            }else{
                    alert("Invalid UserName or Password")
                }
            }catch(error){
                console.log("Login error",error);
                alert("Something went wrong please try again")
            }
        
    }
    
    
return (
  <div className="min-h-screen flex items-center justify-center bg-white">
    {/* Form container */}
    <div className="relative z-10 w-full max-w-md p-12 bg-white shadow-2xl rounded-3xl border border-gray-200">
      {/* LOREEZ Heading */}
      <div className="text-center mb-8 relative">
        <h1 className="text-5xl font-serif font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/20 to-white/50 transform -translate-x-full animate-shimmer"></span>
          LOREEZ
        </h1>

        {/* Emerald shimmer line */}
        <div className="mx-auto my-2 w-16 h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 rounded-full relative overflow-hidden shadow-[0_0_10px_rgba(16,185,129,0.6)]">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-30 transform -translate-x-full animate-shimmer"></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">jewellery</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md transition duration-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md transition duration-300"
        />

        {/* Emerald shimmering button */}
        <button
          type="submit"
          className="relative w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 font-semibold py-4 rounded-xl shadow-lg text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/20 to-white/50 transform -translate-x-full animate-shimmer"></span>
          <span className="relative text-white">Login</span>
        </button>
      </form>

      {/* Redirect to register */}
      <p className="text-gray-600 text-center mt-6">
        Don&apos;t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-emerald-700 font-semibold cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  </div>
);

}
export default Login