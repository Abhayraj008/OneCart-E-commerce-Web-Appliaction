
import React, { useState, useContext } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/authContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Registration() {

    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { serverUrl } = useContext(authDataContext)
    const { getCurrentUser } = useContext(userDataContext)

    const navigate = useNavigate()


    const handleSignup = async (e) => {

        e.preventDefault()

        // Remove extra spaces
        const cleanName = name.trim()
        const cleanEmail = email.trim()

        // Username validation
        if (!cleanName) {
            toast.error("Please enter your username")
            return
        }

        if (cleanName.length < 3) {
            toast.error("Username must be at least 3 characters")
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(cleanEmail)) {
            toast.error("Please enter a valid email address")
            return
        }

        // Password validation
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters")
            return
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter")
            return
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter")
            return
        }

        if (!/[0-9]/.test(password)) {
            toast.error("Password must contain at least one number")
            return
        }

        setLoading(true)

        try {

            const result = await axios.post(
                serverUrl + '/api/auth/registration',
                {
                    name: cleanName,
                    email: cleanEmail,
                    password
                },
                {
                    withCredentials: true
                }
            )

            console.log("Registration:", result.data)

            await getCurrentUser()

            toast.success("User Registration Successful")

            navigate("/")

        } catch (error) {

            console.log("STATUS:", error.response?.status)
            console.log("BACKEND RESPONSE:", error.response?.data)

            const message =
                error.response?.data?.message ||
                "User Registration Failed"

            toast.error(message)

        } finally {

            setLoading(false)

        }
    }


    const googleSignup = async () => {

        try {

            setLoading(true)

            const response = await signInWithPopup(auth, provider)

            const user = response.user

            const name = user.displayName
            const email = user.email

            const result = await axios.post(
                serverUrl + "/api/auth/googlelogin",
                {
                    name,
                    email
                },
                {
                    withCredentials: true
                }
            )

            console.log(result.data)

            await getCurrentUser()

            toast.success("User Registration Successful")

            navigate("/")

        } catch (error) {

            console.log("Google Signup Error:", error)

            toast.error(
                error.response?.data?.message ||
                "Google Registration Failed"
            )

        } finally {

            setLoading(false)

        }
    }


    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>

            {/* Header */}

            <div
                className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'
                onClick={() => navigate("/")}
            >

                <img
                    className='w-[40px]'
                    src={Logo}
                    alt="OneCart Logo"
                />

                <h1 className='text-[22px] font-sans'>
                    OneCart
                </h1>

            </div>


            {/* Heading */}

            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>

                <span className='text-[25px] font-semibold'>
                    Registration Page
                </span>

                <span className='text-[16px]'>
                    Welcome to OneCart, Place your order
                </span>

            </div>


            {/* Registration Box */}

            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>

                <form
                    onSubmit={handleSignup}
                    className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'
                >

                    {/* Google Registration */}

                    <div
                        className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'
                        onClick={googleSignup}
                    >

                        <img
                            src={google}
                            alt="Google"
                            className='w-[20px]'
                        />

                        Registration with Google

                    </div>


                    {/* OR */}

                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>

                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div>

                        OR

                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div>

                    </div>


                    {/* Inputs */}

                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>

                        {/* Username */}

                        <input
                            type="text"
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            placeholder='UserName'
                            required
                            autoComplete="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />


                        {/* Email */}

                        <input
                            type="email"
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            placeholder='Email'
                            required
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />


                        {/* Password */}

                        <input
                            type={show ? "text" : "password"}
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            placeholder='Password (8+ characters)'
                            required
                            autoComplete="new-password"
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />


                        {/* Password Eye */}

                        {!show && (
                            <IoEyeOutline
                                className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]'
                                onClick={() => setShow(prev => !prev)}
                            />
                        )}

                        {show && (
                            <IoEye
                                className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]'
                                onClick={() => setShow(prev => !prev)}
                            />
                        )}


                        {/* Create Account Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-[100%] h-[50px] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold ${
                                loading
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-[#6060f5] cursor-pointer"
                            }`}
                        >

                            {loading
                                ? <Loading />
                                : "Create Account"
                            }

                        </button>


                        {/* Login */}

                        <p className='flex gap-[10px]'>

                            You have any account?

                            <span
                                className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </span>

                        </p>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default Registration
