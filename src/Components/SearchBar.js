import React from 'react'
import { useHistory } from 'react-router'

export default function SearchBar() {

    const history = useHistory()
    const [searchTerm, setSearchTerm] = React.useState(null)

    return (
        <div className="container flex justify-center items-center">
            <div className="relative">
                <div className="absolute top-4 left-3">
                    <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                </div>
                <input
                    type="text"
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        history.push(`/search?q=${e.target.value}`)
                    }}
                    value={searchTerm}
                    className="h-14 w-96 pl-5 pr-24 rounded-lg z-0 focus:shadow-md focus:outline-none bg-light-darker"
                    placeholder="Search users"
                />
                <div className="absolute top-2 right-2">
                    <button
                        onClick={() => history.push(`/search?q=${searchTerm}`)}
                        className="h-10 w-20 text-white rounded-lg bg-blue-darker hover:bg-blue-600">
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}
