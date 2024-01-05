import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Navigate } from 'react-router'
import NavLogo from '../assets/GugaGram-logos_transparent.png'
import {motion} from 'framer-motion'
import useWindowResize from '@/hooks/UseWindowResize'
import { useAppSelector } from '@/store/store'
import regBackground from '../assets/registration-background.jpg'

const AuthLayout = () => {
  const isAuth = useAppSelector((state) => state.Pagereducer.isAuth)
  const navigate = useNavigate()
  const [ismodul, setismodul] = useState<boolean>(false)
  const {height, width} = useWindowResize()

  return (
    <>
      {isAuth ? (
        <Navigate to={'/'}/>
      ) : (
        <>
         <motion.div className='bg-[rgb(21,28,72)] w-full h-screen overflow-hidden'>
          <nav className='overflow-hidden h-[6vh] w-full flex justify-between px-4 pr-9 items-center'>
            <img className='w-16 h-16' src={NavLogo} alt="" />
            {Number(width) < 980 && (ismodul ?  
            <>
             <motion.i initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}} transition={{duration : .7, delay : .1}} className="fa-solid fa-xmark  text-2xl text[rgb(21,28,72)] cursor-pointer z-10 md:hidden" onClick={() => setismodul(!ismodul)}></motion.i>
             <motion.div initial={{y : -100, x : 100, opacity : 0}} animate={{opacity : 1, y:0, x : 0}} transition={{duration : .9, delay : 0}} className={`absolute ${Number(height) < 700 ? "w-40 h-40 pt-8" : Number(height) < 800 ? "w-48 h-48"  : "w-56 h-56" } rounded-tl-[20%] rounded-bl-full flex justify-center items-center pb-10 pl-10 bg-[rgb(223,204,198)] right-0 top-0 lg:hidden`}>
              <ul className='flex flex-col gap-4'>
                <motion.li onClick={() => navigate('sign-up')}  initial={{opacity : 0, x : -15}} animate={{opacity : 1, x : 0}} transition={{duration : 1, delay : 0.8}} className={`${Number(height) < 700 ? "text-sm" : "text-xl"}`}>Sign up</motion.li>
                <motion.li onClick={() => navigate('sign-in')} initial={{opacity : 0, x : -15}} animate={{opacity : 1, x : 0}} transition={{duration : 1, delay : 1}}className={`${Number(height) < 700 ? "text-sm" : "text-xl"}`}>Sign in</motion.li>
              </ul>
             </motion.div>
            </>
            : 
            <motion.i initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}} transition={{duration : .7, delay : .1}} className="fa-solid fa-bars-staggered text-2xl text-[rgb(223,204,198)] cursor-pointer lg:hidden" onClick={() => setismodul(!ismodul)}></motion.i>
            )
          } 
          </nav>
            <Outlet/>

        </motion.div>
        </>
      )}
    </>
  )
}

export default AuthLayout