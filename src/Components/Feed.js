import React from 'react'

import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import AuthContext from "../Context/Auth/AuthContext"

import PostInput from './PostInput'
import FeedCard from './FeedCard'


export default function Feed() {

    const auth = React.useContext(AuthContext)

    const [userPosts, setUserPosts] = React.useState([])

    React.useEffect(() => {

        const q = query(collection(db, "posts"), where("userEmail", "!=", auth.currentUser.email));

        onSnapshot(q, (querySnapshot) => {
            const posts = [];

            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            posts.sort((a, b) => (a.postedAt < b.postedAt) ? 1 : ((b.postedAt < a.postedAt) ? -1 : 0))
            setUserPosts(posts)
        });

    }, [auth.currentUser])

    return (
        <div className="h-80 px-2">
            <PostInput />
            {userPosts.length === 0
                ? <div className="bg-white text-gray-700 dark:bg-dark-darker dark:text-light-lighter py-5 px-5 rounded-xl mt-5">
                    <p className="text-lg text-center">Oops! no posts found. Follow more people to see their posts.</p>
                </div>
                : userPosts.map((post) => {
                    return (
                        <FeedCard mb={3} mt={7} data={post} />
                    )
                })}
        </div>
    )
}
