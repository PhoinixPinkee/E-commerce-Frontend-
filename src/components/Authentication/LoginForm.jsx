import React  ,{useState}from 'react'

import {useForm} from 'react-hook-form'
import './LoginForm.css'
import z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { getUser, login } from '../../Service/userService'
import { Navigate, useLocation } from 'react-router-dom'
const schema=z.object({
email: z.string().email({message:"Please enter valid email address"}).min(3),
password:z.string().min(8,{message:"Password should be atleast 8 characters"})
})
const LoginForm = () => {
  const [formerror, setformerror] = useState("")
 const location=useLocation()
 const {register, handleSubmit, formState:{errors}}= useForm({resolver:zodResolver(schema)})
 const onSubmit=async (formData)=>{
  try{
 await  login(formData);
 const {state}=location
  window.location=state?state.from:"/"
  }
  catch(error){
      if(error.response && error.response.status==400){
          setformerror(error.response.data.message)
      }
  }
}
if(getUser()){
  return  <Navigate to="/" />
}
  return (
   <section className="align_center form_page">
    <form className='authentication_form' onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email"  id='email' className='form_text_input' placeholder='Enter your email address' 
                {...register("email")}
                />
              { errors.email && <em className='form_error'>{errors.email.message}</em>}
         
                </div>
    
        <div>
                <label htmlFor="password">Password</label>
                <input type="password"  id='password' className='form_text_input' placeholder='Enter your password' 
               {...register("password")}/>
               { errors.password&& <em className='form_error'>{errors.password.message}</em>}
                </div>
                {formerror && <em className="form_error">{formerror}</em>}
                <button type='submit' className='search_button form_submit'>Submit</button>
        </div>
    </form>
   </section>
  )
}

export default LoginForm
