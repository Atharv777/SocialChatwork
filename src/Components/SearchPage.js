import React from 'react'
import { useLocation, useHistory } from 'react-router';

import { collection, startAt, endAt, where, query, orderBy, onSnapshot, } from "firebase/firestore";
import { db } from "../firebase";

import UserFollowCard from "./UserFollowCard";


export default function SearchPage() {

    const history = useHistory();
    const URLquery = new URLSearchParams(useLocation().search);
    const SearchTerm = URLquery.get("q")

    const [users, setUsers] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    const NiceText = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const searchUsersInFirestore = async (srchQuery) => {
        const q = query(collection(db, "users"), orderBy("name"), where('name', '>=', srchQuery), where('name', '<=', srchQuery + '\uf8ff'));

        await onSnapshot(q, (querySnapshot) => {
            const users = [];

            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUsers(users)
            setLoading(false)
        });
    }

    React.useEffect(() => {
        if (!SearchTerm) {
            history.push("/")
        }
        else {
            searchUsersInFirestore(NiceText(SearchTerm))
        }

    }, [SearchTerm]);

    return (
        <div>
            <div className="h-80 px-2">
                {
                    loading
                        ? <div className="bg-white dark:bg-dark-darker dark:text-light-lighter pb-5 pt-7 px-5 rounded-xl mt-3">
                            <div className="flex items-center justify-center space-x-2 animate-bounce">
                                <div className="w-8 h-8 bg-blue-400 rounded-full" ></div>
                                <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                            </div>
                        </div>
                        : users && users.length === 0
                            ? <div className="bg-white text-gray-700 dark:bg-dark-darker dark:text-light-lighter py-5 px-5 rounded-xl mt-5">
                                <p className="text-lg text-center">No user Found!</p>
                            </div>
                            : users.map((user) => {
                                return (
                                    <UserFollowCard mb={3} mt={7} data={user} />
                                )
                            })}
            </div>
        </div>
    )
}
