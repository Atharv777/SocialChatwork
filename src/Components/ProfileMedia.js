import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { collection, where, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import FeedCard from './FeedCard'

export default function ProfileMedia() {

    const { userId } = useParams()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null)

    const getPosts = async (ID) => {
        const q1 = query(collection(db, "posts"), where("userId", "==", ID), where("postImg", "!=", null));

        await onSnapshot(q1, (querySnapshot) => {
            const posts = [];

            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });

            posts.sort((a, b) => (a.postedAt < b.postedAt) ? 1 : ((b.postedAt < a.postedAt) ? -1 : 0))
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
            : <div className="mt-3">
                {posts &&
                    posts.length > 0
                    ? posts.map((post) => {
                        return (
                            <FeedCard mb={5} mt={0} data={post} />
                        )
                    })
                    : <div className="bg-white dark:bg-dark-darker dark:text-light-lighter py-5 px-5 rounded-xl mt-3">
                        <p className="text-lg ">Oops! no media found. Add some posts with media</p>
                    </div>
                }
            </div >
    )
}
