import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { collection, where, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import FeedCard from './FeedCard'

export default function ProfilePosts() {

    const { userId } = useParams()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null)

    const getPosts = async (ID) => {
        const q = query(collection(db, "posts"), orderBy("postedAt", "desc"), where("userId", "==", ID));

        await onSnapshot(q, (querySnapshot) => {
            const posts = [];

            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            setPosts(posts)
        });
    }

    useEffect(() => {
        setLoading(true)

        getPosts(userId)

        setLoading(false)
    }, [userId])

    return (
        loading
            ? <div className="flex items-center justify-center space-x-2 animate-bounce">
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
            </div>
            :
            <div className="mt-3">
                {posts &&
                    posts.length > 0
                    ? posts.map((post) => {
                        return (
                            <FeedCard mb={5} mt={0} data={post} />
                        )
                    })
                    : <div className="bg-white text-gray-700 dark:bg-dark-darker dark:text-light-lighter py-5 px-5 rounded-xl mt-3">
                        <p className="text-lg text-center">Oops! no posts found. Add some posts now.</p>
                    </div>

                }
            </div>

    )
}
