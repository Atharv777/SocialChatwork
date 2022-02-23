import React from 'react'
import { useHistory } from 'react-router'

export default function UserFollowCard({ data, isFollowing, mb, mt }) {

    const history = useHistory()

    return (
        <div className={`bg-white dark:bg-dark-darker dark:text-light-lighter py-5 px-5 rounded-xl mb-${mb} mt-${mt}`}>

            <div className="flex flex-row justify-between items-center">

                <div
                    onClick={() => {
                        history.push(`/profile/${data.userId}`)
                    }}
                    className="flex flex-row items-center group relative">
                    <img
                        referrerPolicy="no-referrer"
                        src={data.imgUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />

                    <div className="flex flex-col justify-center ml-2">
                        <p className="text-lg ml-2 dark:text-white">{data.name}</p>
                    </div>

                    <span className="px-3 py-1 bg-white border-black border absolute opacity-0 font-normal text-xs top-10 left-2 transition-all duration-700 group-hover:opacity-100 text-gray-900">Click to view profile page</span>
                </div>

                {isFollowing
                    ? <div className="mr-2">
                        <p className="text-sm italic text-gray-500 dark:text-gray-400 transition-all duration-300">
                            Following
                        </p>
                    </div>
                    : <div className="mr-2">
                        <button className="px-2 py-1 text-md dark:text-light rounded-xl border-2 border-blue-darker hover:bg-blue-lighter dark:hover:bg-blue-darker transition-all duration-300">
                            Follow
                        </button>
                    </div>
                }

            </div>

        </div>
    )
}
