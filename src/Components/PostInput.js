import React from 'react'

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import AuthContext from "../Context/Auth/AuthContext"

import { MdImage, MdVideoLibrary, MdSend } from "react-icons/md"
import { AiOutlineFileGif } from "react-icons/ai"

export default function PostInput() {

    const auth = React.useContext(AuthContext)

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [postContent, setPostContent] = React.useState("")

    const handleSubmit = async () => {
        setLoading(true)

        try {
            await addDoc(collection(db, "posts"), {
                userId: auth.currentUser.userId,
                userName: auth.currentUser.name,
                userEmail: auth.currentUser.email,
                userImg: auth.currentUser.imgUrl,
                postImg: null,
                postContent: postContent,
                postedAt: serverTimestamp()
            });
        }
        catch {
            alert("Failed to add post. Please try again")
        }

        setPostContent("")
        setLoading(false)
    }

    return (
        <div className="bg-white dark:bg-dark-darker rounded-2xl w-full pt-4 pb-6 px-7 min-h-48 flex flex-col justify-center">
            {loading
                ? <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                </div>
                : <>
                    {error !== "" && <p className="text-red-400 ml-3 mb-1">{error}</p>}
                    <textarea
                        type="text"
                        className="w-full min-h-10 px-7 py-3 rounded-2xl z-0 focus:shadow-md focus:outline-none bg-white dark:bg-dark-lighter dark:text-white border border-black"
                        placeholder="What's happening..."
                        value={postContent}
                        onChange={(e) => {
                            error && setError("")
                            setPostContent(e.target.value)
                        }
                        }
                    />
                    <div className="flex flex-row justify-between items-center px-1 xl:px-10 mt-5 dark:text-gray-300">
                        <div className="flex flex-row">
                            <MdImage size="25px" color="lightblue" />
                            <p className="ml-2">Photo</p>
                        </div>

                        <div className="flex flex-row">
                            <MdVideoLibrary size="25px" color="goldenrod" />
                            <p className="ml-2">Video</p>
                        </div>

                        <div className="flex flex-row">
                            <AiOutlineFileGif size="25px" color="grey" />
                            <p className="ml-2">GIF</p>
                        </div>

                        <div
                            className="flex flex-row text-green-500 hover:text-green-700"
                            onClick={() => {
                                postContent.length <= 3
                                    ? setError("Please write at least 3 characters")
                                    : handleSubmit()
                            }}>
                            <MdSend size="35px" />
                        </div>
                    </div>
                </>}
        </div>
    )
}
