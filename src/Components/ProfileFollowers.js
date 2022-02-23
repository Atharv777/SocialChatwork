import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AuthContext from "../Context/Auth/AuthContext"

import { collection, where, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import UserFollowCard from './UserFollowCard'

export default function ProfileFollowers() {

    const { userId } = useParams()
    const auth = React.useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(null)

    const [loading, setLoading] = useState(true)
    const [followers, setFollowers] = useState(null)
    const [noFollowers, setNoFollowers] = useState(true)

    const getFollowersData = async (userFollowers) => {
        const q = query(collection(db, "users"), orderBy("name"), where("userId", "in", userFollowers));

        await onSnapshot(q, (querySnapshot) => {
            const followers = [];

            querySnapshot.forEach((doc) => {
                followers.push(doc.data());
            });
            setFollowers(followers)
            setNoFollowers(false)
            setLoading(false)
        });
    }

    const getUserDataFromFirestore = async (id) => {
        const q = query(collection(db, "users"), where("userId", "==", id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setCurrentUser(doc.data());
            doc.data().followers.length === 0
                ? setNoFollowers(true)
                : getFollowersData(doc.data().followers)
        });
    }

    useEffect(() => {
        setLoading(true)

        if (userId === auth.currentUser.userId) {
            setCurrentUser(auth.currentUser)
            if (auth.currentUser.followers.length === 0) {
                setNoFollowers(true)
                setLoading(false)
            }
            else {
                getFollowersData(auth.currentUser.followers)
            }
        }
        else {
            getUserDataFromFirestore(userId)
        }

    }, [])

    return (
        loading
            ?
            <div className="bg-white dark:bg-dark-darker dark:text-light-lighter pb-5 pt-7 px-5 rounded-xl mt-3">
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full" ></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                </div>
            </div>
            : <div className="mt-3">
                {noFollowers
                    ? <p>No followers found! Adding some posts may help.</p>
                    : followers && followers.map((follower) => {
                        return (
                            <UserFollowCard
                                data={follower}
                                isFollowing={auth.currentUser.followers.includes(follower.userId) ? true : false}
                                mb={10}
                                mt={3} />
                        )
                    })}
            </div>
    )
}
