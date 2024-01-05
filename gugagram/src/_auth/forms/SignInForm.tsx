import useWindowResize from '@/hooks/UseWindowResize'
import { zodResolver } from '@hookform/resolvers/zod'
import isEmail from 'validator/lib/isEmail'
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import IsEmail from 'isemail'
import {motion} from 'framer-motion'


const SigninForm = () => {

  const { height, width } = useWindowResize()
  const navigate = useNavigate()

  type TsignSchema = z.infer<typeof SignInSchema>

  const SignInSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8, 'Password must be at least 8 characters')
  }).refine((data) => isEmail(data.email) == true, {
    message : "enter valid email",
    path : ['email']
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TsignSchema>({
    resolver : zodResolver(SignInSchema)
  })

  const submit = async (data: FieldValues) => {
    reset()
  }


  return (
    <div className='flex w-full h-full justify-center items-center'>
      <motion.form
        initial={{scale : .9, opacity : 0, y:-10}}
        animate={{scale : 1, opacity : 1, y : 0}}
        transition={{duration : .5, delay : .1}}
        onSubmit={handleSubmit(submit)}
        id='Form'
        className={`w-5/6 gap-8  bg-[rgb(223,204,198)] h-fit ${Number(height) < 740 ? "py-10 gap-3" : "py-10"} px-10 rounded-md shadow-lg shadow-black flex flex-col justify-center items-center sm:w-[475px]`}
      >
        <h1 id='reg_txt'>Login</h1>
        <div className='flex flex-col  w-full'>
          <motion.label 
          initial={{opacity : 0, y : -20}}
          animate={{opacity : 1, y : 0}}
          transition={{duration : .8, delay : .2}}
          className='text-[rgb(21,28,72)] font-bold' htmlFor=''>
            email
          </motion.label>
          <motion.input
            initial={{width : 0,}}
            animate={{width : '100%'}}
            transition={{duration : .8, delay : .3, ease: "easeOut"}}
            className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 
            ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`}
            {...register('email')}
          />
          {errors.email && (
            <p className={`text-red-500 text-[12px] sm:text-base`}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='flex flex-col w-full'>
          <motion.label 
          initial={{opacity : 0, y : -20}}
          animate={{opacity : 1, y : 0}}
          transition={{duration : .8, delay : .3}}
          className='text-[rgb(21,28,72)] font-bold' htmlFor=''>
            password
          </motion.label>
          <motion.input
          transition={{duration : .8, delay : .3, ease : 'easeOut'}}
            initial={{width : 0,}}
            animate={{width : '100%'}}
            className={`w-full  pl-2 pb-1 outline-none border-none bg-transparent border-b-2 
            ${Number(height) < 800 ? "mt-2" : "mt-5"} border-black font-semibold`}
            type='password'
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red-500 text-[12px]'>
              {errors.password.message}
            </p>
          )}
        </div>
        <motion.button
        initial={{opacity : 0, scale : .9, y : -20}}
        animate={{opacity : 1, scale : 1, y : 0}}
        transition={{duration : .5, delay : .4, type : "spring",}}
          disabled={isSubmitting}
          className={`w-fit h-fit px-12  rounded-md text-white bg-[rgb(21,28,72)] hover:scale-110 transition-all   ${
            Number(height) < 700 ? 'py-2 mt-5' : "py-3 mt-8"
          }`}
        >
          Submit
        </motion.button>
        <Link
          to={'/sign-up'}
          onClick={() => navigate('/sign-up')}
          className={`mt-1 underline text-[rgb(21,28,72)]  ${
            Number(width) < 300 ? 'text-[10px]' : Number(height) < 870 ? 'text-sm' : "text-lg"
          }`}
        >
          Don't have an account? Sign up
        </Link>
      </motion.form>
    </div>
  );
};

export default SigninForm;