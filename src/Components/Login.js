import React, { useContext, useState, useEffect } from "react"
import AuthContext from "../Context/Auth/AuthContext"
import { useHistory } from "react-router-dom"

import LoginDesign from "../assets/login_design.svg"
import LogoSVG from "../assets/logoLight.svg"

import { FcGoogle } from "react-icons/fc";


export default function Login() {

    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        try {
            await auth.SignIn()
        } catch {
            alert("Failed to log in. Please try again")
        }

        setLoading(false)
    }

    useEffect(() => {
        if (auth.currentUser) {
            history.push("/")
        }
    }, [auth.currentUser])

    return (
        <div className="bg-white dark:bg-dark w-screen h-full flex justify-center align-center">

            {loading
                ? <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                </div>
                : <>
                    <div className="flex-1 p-10 h-full flex justify-center align-center bg-blue-lighter">
                        <img className="absolute h-10 left-10" src={LogoSVG} alt="Chat work" />
                        <img className="w-3/4 mt-14" src={LoginDesign} alt="Login" />
                    </div>

                    <div className="flex-1 p-10 h-full">
                        <h1 className="text-4xl">Hey there!</h1>
                        <button className="px-5 py-3 bg-white border border-black flex flex-row justify-center align-center" onClick={(e) => handleSubmit(e)}>
                            <FcGoogle size="22px" />
                            <span className="ml-4">Sign in with google</span>
                        </button>
                    </div></>
            }


        </div>
    )
}
