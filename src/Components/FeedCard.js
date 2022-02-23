import React from 'react'
import { useHistory } from 'react-router'

import AuthContext from "../Context/Auth/AuthContext"

export default function FeedCard({ mb, mt, data }) {

    const history = useHistory()
    const auth = React.useContext(AuthContext)

    return (
        <div className={`bg-white dark:bg-dark-darker dark:text-light-lighter py-5 px-5 rounded-xl mb-${mb} mt-${mt}`}>

            <div
                onClick={() => {
                    history.push(`/profile/${data.userId}`)
                }}
                className="flex flex-row items-center group relative">
                <img
                    referrerPolicy="no-referrer"
                    src={data.userImg}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />

                <div className="flex flex-col justify-center ml-2">
                    <p className="text-md dark:text-white">{data.userName}</p>
                    <span className="text-xs text-gray-400">{new Date(data.postedAt?.toDate()).toLocaleString()}</span>
                </div>

                <span className="px-3 py-1 bg-white border-black border absolute opacity-0 font-normal text-xs top-10 left-2 transition-all duration-700 group-hover:opacity-100 text-gray-900">Click to view profile page</span>

            </div>

            <div className="mt-5">
                {data.postImg && <img src={data.postImg} alt="Post" />}
            </div>

            <p>{data.postContent}</p>

        </div>
    )
}
