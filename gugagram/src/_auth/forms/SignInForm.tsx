import FormComponent from '@/Components/Form'
import useWindowResize from '@/hooks/UseWindowResize'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const SigninForm = () => {
  const {height, width} = useWindowResize()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState : {errors, isSubmitting},
        reset,
        getValues
    } = useForm()

    const submit = async (data : FieldValues) => {
        console.log(data)
        reset()
    }

  return (
    <div className='flex w-full h-full justify-center items-center'>
      <form onSubmit={handleSubmit(submit)} id='Form' className={`w-5/6 gap-8  bg-[rgb(223,204,198)] h-fit ${Number(height) < 740 ? "py-10 gap-3" : "py-10"} px-10 rounded-md shadow-lg shadow-black flex flex-col justify-center items-center sm:w-[475px]`} >
            <h1 id='reg_txt'>Login</h1>
            <div className='flex flex-col  w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">email</label>
            <input 
            className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 
            ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`}
            type="email" 
            {...register('email', {
                required : "email is required",
            })}
             />
             {errors.email && (
                   <p className={`text-red-500 text-[12px] sm:text-base`}>{errors.email.message}</p>)
              }
            </div>
            <div className='flex flex-col w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">password</label>
            <input 
            className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 
            ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`} 
            type="password"
            {...register('password', {
                required : "password is required",
                minLength : {
                  value : 8,
                  message : "password must be at least 8 characters"
                }
            })}
             />
                {errors.password && (
                   <p className='text-red-500 text-[12px]'>{errors.password.message}</p>)
                }
            </div>
           <button disabled={isSubmitting} className={`w-fit h-fit px-12  rounded-md text-white bg-[rgb(21,28,72)] hover:scale-110 transition-all   ${Number(height) < 700 ? 'py-2 mt-5' : "py-3 mt-8"}`}>Submit</button>
           <Link to={'/sign-up'} onClick={() => navigate('/sign-up')} className={`mt-1 underline text-[rgb(21,28,72)]  ${Number(width) < 300 ? 'text-[10px]' : Number(height) < 870 ? 'text-sm' : "text-lg"}`}>Don't have an account? Sign up</Link>
        </form>
    </div>
  )
}

export default SigninForm