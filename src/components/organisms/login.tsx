

import React, {useState, ChangeEvent, FormEvent} from 'react';
import axios from 'axios'
import { UserLogin } from '../../interfaces/appInterface';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { BASE_DOMAIN, SECURE_COOKIES, apiBase, appBase } from "../../config";




const Login = () => {
  const [data, setData] = useState<UserLogin>({
     email: "",password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e : ChangeEvent< HTMLInputElement | HTMLSelectElement>) => {
    const {id, value} = e.target
    setData({...data, [id]:value})
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try{
      const response = await axios.post(
        `${apiBase()}/login`,
        {user: data}
      );

      const token = response.headers['authorization'];

      if(token){
        
        Cookies.set("jwtToken", token, {
          domain: BASE_DOMAIN, 
          sameSite: "Lax", 
          secure: SECURE_COOKIES,
        });
        const user = response.data.status.data.user;

        if (user.role === "company") {
          const subdomain = user.id;
          window.location.href = `${appBase(subdomain)}/home`;
        }
        else if(user.role === "candidate"){
          window.location.href = `${appBase()}/home`;
        }
        else 
          window.location.href = `${appBase("admin")}/jobs`;
      }
    }
    catch(e){
      toast.error("Email or Password incorrect");
    }

  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="text-center my-4">Welcome Back!</h2>
          
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Enter your email" 
                value={data.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Enter your password" 
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-success w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}



export default Login;