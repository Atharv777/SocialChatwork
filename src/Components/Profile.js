import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"

import AuthContext from "../Context/Auth/AuthContext"

export default function Profile({ tabComponent, whichTab }) {

    const auth = React.useContext(AuthContext)
    const history = useHistory()

    const [currentUser, setCurrentUser] = useState(null)
    const [profilePicLoaded, setProfilePicLoaded] = useState(null)
    const [loading, setLoading] = useState(true)
    const { userId } = useParams()

    const [isCurrentTabPosts, setIsCurrentTabPosts] = useState(null)
    const [isCurrentTabMedia, setIsCurrentTabMedia] = useState(null)
    const [isCurrentTabFollowers, setIsCurrentTabFollowers] = useState(null)
    const [isCurrentTabFollowing, setIsCurrentTabFollowing] = useState(null)

    const getUserDataFromFirestore = async (id) => {
        const q = query(collection(db, "users"), where("userId", "==", id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setCurrentUser(doc.data());
            setLoading(false)
        });
    }

    React.useEffect(() => {
        if (whichTab === "posts") {
            setIsCurrentTabMedia(false)
            setIsCurrentTabFollowers(false)
            setIsCurrentTabFollowing(false)
            setIsCurrentTabPosts(true)
        }
        else if (whichTab === "media") {
            setIsCurrentTabMedia(true)
            setIsCurrentTabFollowers(false)
            setIsCurrentTabFollowing(false)
            setIsCurrentTabPosts(false)
        }
        else if (whichTab === "followers") {
            setIsCurrentTabMedia(false)
            setIsCurrentTabFollowers(true)
            setIsCurrentTabFollowing(false)
            setIsCurrentTabPosts(false)
        }
        else if (whichTab === "following") {
            setIsCurrentTabMedia(false)
            setIsCurrentTabFollowers(false)
            setIsCurrentTabFollowing(true)
            setIsCurrentTabPosts(false)
        }

    }, [tabComponent])

    React.useEffect(() => {
        setLoading(true)

        if (userId === auth.currentUser.userId) {
            setCurrentUser(auth.currentUser)
            setLoading(false)
        }
        else {
            getUserDataFromFirestore(userId)
        }


    }, [userId])


    return (
        <div className="px-2">
            {loading
                ? <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                </div>
                : <>
                    <div className="bg-white dark:bg-dark-darker dark:text-light-lighter pt-5 rounded-xl">
                        <div>
                            <div className="bg-gray-300 w-full h-44"></div>
                        </div>

                        <div className="relative h-20 px-5">
                            <img
                                referrerPolicy="no-referrer"
                                src={currentUser.imgUrl}
                                alt="Profile"
                                className={`absolute bottom-4 w-28 h-28 transition-all duration-500 rounded-full border-4 hover:border-blue-darker ${auth.darkMode ? 'border-dark-darker' : 'border-white'} ${profilePicLoaded ? 'visible' : 'invisible'}`}
                                onLoad={() => setProfilePicLoaded(true)}
                            />
                            {!profilePicLoaded && "Loading"}

                            <div className="flex items-center w-full h-full justify-end">
                                <button className="px-2 py-1 float-right dark:text-light rounded-xl border-2 border-blue-darker hover:bg-blue-lighter dark:hover:bg-blue-darker transition-all duration-300">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="px-5 mb-7">
                            <div className="mb-3">
                                <p className="text-2xl font-bold mt-3 dark:text-light-darker">{currentUser.name}</p>
                                <p className="text-sm text-gray-500">{currentUser.email}</p>
                            </div>
                            <div className="px-1">
                                <p className="text-md text-gray-700 dark:text-gray-300 mb-3">{currentUser.bio}</p>

                                <div className="flex flex-row item-center text-md text-gray-500">
                                    <p className="mr-1">Joined: </p>
                                    <p>{new Date(currentUser.joined?.toDate()).toDateString()}</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex flex-row border-b border-t border-gray-200">
                            <div
                                onClick={() => history.push(`/profile/${userId}`)}
                                className={`transition-all duration-300 flex-1 text-center text-gray-600 dark:text-light-darker py-2 border-r border-gray-200 hover:bg-gray-200 hover:text-black ${isCurrentTabPosts && "bg-gray-200 dark:bg-dark-lighter"}`}>
                                Posts
                            </div>
                            <div
                                onClick={() => history.push(`/profile/${userId}/media`)}
                                className={`transition-all duration-300 flex-1 text-center text-gray-600 dark:text-light-darker py-2 border-r border-gray-200 hover:bg-gray-200 hover:text-black ${isCurrentTabMedia && "bg-gray-200 dark:bg-dark-lighter"}`}>
                                Media
                            </div>
                            <div
                                onClick={() => history.push(`/profile/${userId}/followers`)}
                                className={`transition-all duration-300 flex-1 text-center text-gray-600 dark:text-light-darker py-2 border-r border-gray-200 hov
                        er:bg-gray-200 hover:text-black ${isCurrentTabFollowers && "bg-gray-200 dark:bg-dark-lighter"}`}>
                                Followers
                            </div>
                            <div
                                onClick={() => history.push(`/profile/${userId}/following`)}
                                className={`transition-all duration-300 flex-1 text-center text-gray-600 dark:text-light-darker py-2 hover:bg-gray-200 hover:text-black ${isCurrentTabFollowing && "bg-gray-200 dark:bg-dark"}`}>
                                Following
                            </div>
                        </div></div>

                    {tabComponent}
                </>
            }

        </div >
    )
}
