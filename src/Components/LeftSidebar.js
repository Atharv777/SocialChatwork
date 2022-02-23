import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import AuthContext from "../Context/Auth/AuthContext"

import FeedCard from './FeedCard';

export default function LeftSidebar() {

    const auth = React.useContext(AuthContext)
    const history = useHistory()

    const [profilePicLoaded, setProfilePicLoaded] = React.useState(false)
    const [userPosts, setUserPosts] = React.useState([])

    React.useEffect(() => {

        const q = query(collection(db, "posts"), where("userEmail", "==", auth.currentUser.email), orderBy("postedAt", "desc"), limit(2));

        onSnapshot(q, (querySnapshot) => {
            const posts = [];

            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });

            setUserPosts(posts)
        });

    }, [auth.currentUser])

    return (
        <div className="full-h-cont custom-scroll overflow-y-auto w-1/3 px-7 py-10">
            <div className="bg-white dark:bg-dark-darker rounded-lg py-5 mb-10 relative">
                <div className="flex flex-col items-center">
                    <div
                        onClick={() => history.push(`/profile/${auth.currentUser.userId}`)}
                        className="group">
                        <img
                            referrerPolicy="no-referrer"
                            src={auth.currentUser.imgUrl}
                            alt="Profile"
                            className={`w-20 h-20 transition-all duration-500 rounded-full border-4 hover:border-blue-darker ${profilePicLoaded ? 'visible' : 'invisible'}`}
                            onLoad={() => setProfilePicLoaded(true)}
                        />
                        <span className="px-3 py-1 bg-white border-black border absolute opacity-0 font-normal text-xs top-24 left-36 transition-all duration-700 group-hover:opacity-100 text-gray-900">Click to view profile page</span>
                    </div>
                    {!profilePicLoaded && (
                        "Loading"
                    )}

                    <p className="text-2xl font-bold mt-3 dark:text-light-darker">{auth.currentUser.name}</p>
                    <p className="text-sm text-gray-500">{auth.currentUser.email}</p>
                </div>

                <div className="px-14 flex flex-row justify-between items-center">
                    <p className="my-3 text-lg text-gray-600">
                        <span className="font-bold dark:text-light-darker">Followers :</span>
                        <span className="ml-3 text-black dark:text-light-lighter">{auth.currentUser.followers.length}</span>
                    </p>
                    <p className="my-3 text-lg text-gray-600">
                        <span className="font-bold dark:text-light-darker">Following :</span>
                        <span className="ml-3 text-black dark:text-light-lighter">{auth.currentUser.following.length}</span>
                    </p>
                </div>

            </div>

            <div className="bg-white dark:bg-dark-darker rounded-lg flex flex-col items-center py-5">
                <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">Your recent posts</h1>

                {userPosts.length === 0
                    && <p className="mt-5 text-xl">Add your post now!</p>
                }

            </div>

            <div>
                {userPosts.length !== 0
                    && userPosts.map((post) => {
                        return (<FeedCard mb={0} mt={4} data={post} />)
                    })
                }
            </div>

        </div>
    )
}
