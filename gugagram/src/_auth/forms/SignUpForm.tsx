import FormComponent from '@/Components/Form'
import useWindowResize from '@/hooks/UseWindowResize'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const SignUpForm = () => {
  const {height, width} = useWindowResize()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState : {errors, isSubmitting},
        reset,
        getValues
    } = useForm()
  return (
    <div className='flex w-full h-full justify-center items-center'>
       <div id='Form' className={`w-5/6 gap-8  bg-[rgb(223,204,198)] h-fit ${Number(height) < 740 ? "py-5 gap-3" : "py-10"} px-10 rounded-md shadow-lg shadow-black flex flex-col justify-center items-center sm:w-[475px]`} >
            <h1 id='reg_txt'>Sign up</h1>
            <div className='flex flex-col  w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">Username</label>
            <input className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`} type="text" />
            </div>
            <div className='flex flex-col  w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">email</label>
            <input className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`} type="email" />
            </div>
            <div className='flex flex-col w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">password</label>
            <input className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`} type="password" />
            </div>
            <div className='flex flex-col w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">Confirm password</label>
            <input className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`} type="password" />
            </div>
           
           <button className={`w-fit h-fit px-12  rounded-md text-white bg-[rgb(21,28,72)] ${Number(height) < 700 ? 'py-2 mt-3' : "py-3"}`}>Submit</button>
           <Link to={'/sign-in'} onClick={() => navigate('/sign-in')} className={`underline text-[rgb(21,28,72)] ${Number(width) < 300 ? 'text-[10px]' : Number(height) < 870 ? 'text-sm' : "text-lg"}`}>Already have an account? Login</Link>
        </div>
    </div>
  )
}

export default SignUpForm