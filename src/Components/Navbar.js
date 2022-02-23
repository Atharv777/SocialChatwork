import React from "react";
import { Link } from "react-router-dom";

import AuthContext from "../Context/Auth/AuthContext"

import { MdLogout } from "react-icons/md";
import LogoSVGDark from "../assets/logoDark.svg"
import LogoSVGLight from "../assets/logoLight.svg"

import SearchBar from "./SearchBar";

export default function Navbar() {

    const auth = React.useContext(AuthContext)

    async function handleLogout(e) {
        e.preventDefault()

        try {
            await auth.Logout()
        } catch {
            alert("Failed to logout. Please try again")
        }
    }

    return (
        <div className="bg-white dark:bg-dark-darker w-screen h-20 flex flex-row items-center justify-between px-7 shadow-md">

            <Link to="/" className="py-5 flex-1">
                {auth.darkMode ?
                    <img className="h-10 inline" src={LogoSVGDark} alt="Chat work" />
                    : <img className="h-10 inline" src={LogoSVGLight} alt="Chat work" />
                }
            </Link>

            <div className="flex-1">
                <SearchBar />
            </div>

            <div className="flex-1 flex justify-end align-center">
                <button
                    className=" group font-bold px-2 py-1 mx-5 text-white rounded-lg bg-blue-darker hover:bg-blue-600"
                    onClick={(e) => handleLogout(e)}>

                    <MdLogout size="1.5em" />
                    <span className="px-3 py-1 bg-white border-black border absolute opacity-0 font-normal text-xs top-16 right-16 transition-all duration-700 group-hover:opacity-100 text-gray-900">Logout</span>

                </button>

                <button className="text-dark-darker dark:text-light text-2xl group" onClick={() => auth.setDarkMode(!auth.darkMode)}>
                    {auth.darkMode ? "☀" : "🌙"}
                    <span className="px-3 py-1 bg-white border-black border absolute opacity-0 font-normal text-xs top-16 right-5 transition-all duration-700 group-hover:opacity-100 text-gray-900">{auth.darkMode ? "Light" : "Dark"}</span>
                    <span className="px-3 py-1 bg-white border-black border absolute opacity-0 font-normal text-xs top-16 right-5 transition-all duration-700 group-hover:opacity-100 text-gray-900">{auth.darkMode ? "Light" : "Dark"}</span>
                </button>
            </div>
        </div>
    );
}
