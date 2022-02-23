import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AuthContext from "../Context/Auth/AuthContext"

import { collection, where, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import UserFollowCard from './UserFollowCard'

export default function ProfileFollowing() {

    const { userId } = useParams()
    const auth = React.useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(null)

    const [loading, setLoading] = useState(true)
    const [followingUsers, setFollowingUsers] = useState(null)
    const [noFollowing, setNoFollowing] = useState(false)

    const getFollowingUsersData = async (userFollowingUsers) => {
        try {
            const q = query(collection(db, "users"), orderBy("name"), where("userId", "in", userFollowingUsers));

            await onSnapshot(q, (querySnapshot) => {
                const following = [];

                querySnapshot.forEach((doc) => {
                    following.push(doc.data());
                });
                setFollowingUsers(following)
                setLoading(false)
            });
        } catch (err) { console.error(err) }
    }

    const getUserDataFromFirestore = async (id) => {
        try {
            const q = query(collection(db, "users"), where("userId", "==", id));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setCurrentUser(doc.data());
                if (doc.data().following.length === 0) {
                    setNoFollowing(true)
                    setLoading(false)
                }
                else {
                    getFollowingUsersData(doc.data().following)
                }
            });
        }
        catch (err) { console.error(err) }
    }


    useEffect(() => {
        setLoading(true)

        if (userId === auth.currentUser.userId) {
            setCurrentUser(auth.currentUser)
            if (auth.currentUser.following.length === 0) {
                setNoFollowing(true)
                setLoading(false)
            }
            else {
                getFollowingUsersData(auth.currentUser.following)
            }
        }
        else {
            getUserDataFromFirestore(userId)
        }

    }, [])

    return (
        loading
            ?
            <div className="bg-white dark:bg-dark-darker dark:text-light-lighter py-5 px-5 rounded-xl mb-10 mt-3">
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full" ></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                </div >
            </div>
            : <div className="mt-3">
                {noFollowing
                    ? <div className="bg-white dark:bg-dark-darker dark:text-light-lighter py-5 px-5 rounded-xl mt-3">
                        <p className="text-lg ">No following found! Adding some posts may help.</p>
                    </div>
                    : followingUsers && followingUsers.map((followingUser) => {
                        return (
                            <UserFollowCard
                                data={followingUser}
                                isFollowing={auth.currentUser.following.includes(followingUser.userId) ? true : false}
                                mb={10}
                                mt={3} />
                        )
                    })
                }
            </div>


    )
}
