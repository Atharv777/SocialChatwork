import React, { useEffect, useState } from 'react'

import AuthContext from "../Context/Auth/AuthContext"

import { collection, where, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../firebase";

import UserFollowCard from './UserFollowCard'


export default function RightSidebar() {

    const auth = React.useContext(AuthContext)

    const [mutualLoading, setMutualLoading] = useState(true)
    const [topLoading, setTopLoading] = useState(true)
    const [topUsers, setTopUsers] = useState(null)
    const [mutualUsers, setMutualUsers] = useState(null)

    const LoadingComponent = () => {
        return (
            <div className="bg-white dark:bg-dark-darker rounded-lg flex flex-col items-center py-5 mt-3 mb-5">
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full" ></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                </div>
            </div>
        )
    }

    const getTopUsersData = async () => {
        const q = query(collection(db, "users"), where("noOfFollowers", ">=", "1"), orderBy("noOfFollowers", "desc"), limit(5));

        await onSnapshot(q, (querySnapshot) => {
            const users = [];

            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setTopUsers(users)
            setTopLoading(false)
        });
    }

    const getFollowingUsersFollowing = (followingUsers) => {

        const mutualUsers = [];

        followingUsers.forEach(async (user) => {

            const q = query(collection(db, "users"), where("userId", "in", user.following), where("noOfFollowers", "!=", 0), orderBy("noOfFollowers", "desc"), limit(3));

            await onSnapshot(q, (querySnapshot) => {

                querySnapshot.forEach((doc) => {
                    if (doc.data().userId !== auth.currentUser.userId) {
                        mutualUsers.push(doc.data());
                    }
                });
            });
        })

        setMutualUsers(mutualUsers)
        setTimeout(() => {
            setMutualLoading(false)
        }, 1000);
    }

    const getMutualUsersData = async (following) => {
        const q = query(collection(db, "users"), where("userId", "in", following), where("noOfFollowers", "!=", 0), orderBy("noOfFollowers", "desc"), limit(3));

        await onSnapshot(q, (querySnapshot) => {
            const followingUsers = [];

            querySnapshot.forEach((doc) => {
                followingUsers.push(doc.data());
            });
            getFollowingUsersFollowing(followingUsers)
        });
    }

    useEffect(() => {
        setTopLoading(true)
        setMutualLoading(true)

        getTopUsersData()
        if (auth.currentUser.following.length === 0) {
            setMutualUsers([])
            setMutualLoading(false)
        }
        else {
            getMutualUsersData(auth.currentUser.following)
        }

    }, [])


    return (
        <div className="full-h-cont custom-scroll overflow-y-auto w-1/3 px-7 py-10">

            <div>
                <div className="bg-white dark:bg-dark-darker rounded-lg flex flex-col items-center py-5 ">
                    <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">People to follow</h1>
                </div>

                {
                    topLoading
                        ? <LoadingComponent />
                        : topUsers.length > 0
                            ? topUsers.map((user) => {
                                return (
                                    <UserFollowCard data={user} mb={0} mt={3} isFollowing={true} />
                                )
                            })
                            : <div className="bg-white  dark:bg-dark-darker py-5 px-5 rounded-xl mt-3">
                                <p className="dark:text-light-lighter text-gray-700 text-lg text-center">
                                    Let our Chatwork family grow big.
                                </p>
                            </div>
                }

            </div>

            <div>

                <div className="bg-white dark:bg-dark-darker rounded-lg flex flex-col items-center py-5 mt-10 ">
                    <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">People you may know</h1>
                </div>

                {
                    mutualLoading
                        ? <LoadingComponent />
                        : mutualUsers.length > 0
                            ? mutualUsers.map((user) => {
                                return (
                                    <UserFollowCard data={user} mb={0} mt={3} isFollowing={false} />
                                )
                            })
                            : <div className="bg-white  dark:bg-dark-darker py-5 px-5 rounded-xl mt-3">
                                <p className="dark:text-light-lighter text-gray-700 text-lg text-center">
                                    Follow more people for recommendation.
                                </p>
                                <p className="text-red-300 text-md text-center">
                                    Tip: You can search your known people
                                </p>
                            </div>
                }

            </div>
        </div >
    )
}
