import useWindowResize from '@/hooks/UseWindowResize'
import { zodResolver } from '@hookform/resolvers/zod'
import isEmail from 'validator/lib/isEmail'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { INewUser, IUser } from '@/types'
import { usecreateNewUserMutation } from '@/lib/react-query/queriesandmutations'


const SignUpForm = () => {
  const {height, width} = useWindowResize()
    const navigate = useNavigate()
    const { mutateAsync:createUserAccount} = usecreateNewUserMutation()

    type TsignUpSchema = z.infer<typeof SignUpSchema>

    const SignUpSchema = z.object({
      email : z.string().email(),
      password : z.string().min(8, 'Password must be at least 8 characters'),
      ConfirmPassword : z.string().min(8,'Confirm Password must be at least 8 characters' ),
      UserName : z.string().min(5, 'UserName must be at least 5 characters'),
    }).refine((data) => isEmail(data.email) == true, {
      message : "enter valid email",
      path : ['email']
    }).refine((data) => data.ConfirmPassword == data.password, {
      message : "Passwords doesn't match",
      path : ['ConfirmPassword']
    })
  
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<TsignUpSchema>({
      resolver : zodResolver(SignUpSchema),
    })
  
    const submit: SubmitHandler<TsignUpSchema> = async (data: TsignUpSchema) => {
      const { email, password, ConfirmPassword, UserName } = data
      const newUser: INewUser = {
        name: UserName, 
        email,
        username: UserName,
        password,
        confirmPassword: ConfirmPassword,
      }
    
      createUserAccount(newUser)
      navigate('/sign-in')
    };

  return (
    <form onSubmit={handleSubmit(submit)} className='flex w-full h-full justify-center items-center'>

        <div id='Form' className={`w-5/6 gap-8  bg-[rgb(223,204,198)] h-fit ${Number(height) < 740 ? "py-1 gap-3" : "py-10"} px-10 rounded-md shadow-lg shadow-black flex flex-col justify-center items-center sm:w-[475px]`} >
            <h1 id='reg_txt'>Sign up</h1>
            <div className='flex flex-col  w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">Username</label>
            <input 
            className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 
            ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`} 
            type="text"
            {...register('UserName')}
             />
              {errors.UserName && (
            <p className={`text-red-500 text-[12px] sm:text-base`}>
              {errors.UserName.message}
            </p>
          )}
            </div>
            <div className='flex flex-col  w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">email</label>
            <input 
            className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 
            ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`} 
            type="email" 
            {...register('email')}
            />
             {errors.email && (
            <p className={`text-red-500 text-[12px] sm:text-base`}>
              {errors.email.message}
            </p>
          )}
            </div>
            <div className='flex flex-col w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">password</label>
            <input 
            className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 
            ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`}
            type="password" 
            {...register('password')}
            />
             {errors.password && (
            <p className={`text-red-500 text-[12px] sm:text-base`}>
              {errors.password.message}
            </p>
          )}
            </div>
            <div className='flex flex-col w-full'>
            <label className='text-[rgb(21,28,72)] font-bold' htmlFor="">Confirm password</label>
            <input 
            className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 
            ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`} 
            type="password" 
            {...register('ConfirmPassword')}
            />
             {errors.ConfirmPassword && (
            <p className={`text-red-500 text-[12px] sm:text-base`}>
              {errors.ConfirmPassword.message}
            </p>
          )}
            </div>
           
           <button className={`w-fit h-fit px-12  rounded-md text-white bg-[rgb(21,28,72)] ${Number(height) < 700 ? 'py-2 mt-0' : "py-3"}`}>Submit</button>
           <Link to={'/sign-in'} onClick={() => navigate('/sign-in')} className={`underline text-[rgb(21,28,72)] ${Number(width) < 300 ? 'text-[10px]' : Number(height) < 870 ? 'text-sm mb-4' : "text-lg"}`}>Already have an account? Login</Link>
        </div>
    
      
       
    </form>
  )
}

export default SignUpForm