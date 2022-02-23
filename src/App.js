import React from "react"

import AuthContext from "./Context/Auth/AuthContext"

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Feed from './Components/Feed'
import Profile from './Components/Profile';
import ProfilePosts from './Components/ProfilePosts';
import ProfileMedia from './Components/ProfileMedia';
import ProfileFollowers from './Components/ProfileFollowers';
import ProfileFollowing from './Components/ProfileFollowing';
import SearchPage from './Components/SearchPage';
import Login from './Components/Login';

import Navbar from './Components/Navbar'
import LeftSidebar from './Components/LeftSidebar'
import RightSidebar from './Components/RightSidebar'



function App() {

    const auth = React.useContext(AuthContext)

    const RenderNiceComponent = (component) => {
        return (
            <>
                <Navbar />
                <div className="bg-light-darker dark:bg-dark home flex flex-row">
                    <LeftSidebar />
                    <div className="full-h-cont custom-scroll overflow-y-auto w-1/3 py-10">
                        {component}
                    </div>
                    <RightSidebar />
                </div>
            </>
        )
    }

    return (
        <div className={`${auth.darkMode ? 'dark' : ''} h-screen overflow-x-hidden font-monserrat`}>

            <Router>
                <Switch>

                    <Route
                        exact
                        path="/"
                        render={() => { return auth.currentUser ? RenderNiceComponent(<Feed />) : <Redirect to="/login" /> }}
                    />
                    <Route
                        exact
                        path="/profile/:userId"
                        render={() => { return auth.currentUser ? RenderNiceComponent(<Profile whichTab="posts" tabComponent={<ProfilePosts />} />) : <Redirect to="/login" /> }}
                    />
                    <Route
                        path="/profile/:userId/media"
                        render={() => { return auth.currentUser ? RenderNiceComponent(<Profile whichTab="media" tabComponent={<ProfileMedia />} />) : <Redirect to="/login" /> }}
                    />
                    <Route
                        path="/profile/:userId/followers"
                        render={() => { return auth.currentUser ? RenderNiceComponent(<Profile whichTab="followers" tabComponent={<ProfileFollowers />} />) : <Redirect to="/login" /> }}
                    />
                    <Route
                        path="/profile/:userId/following"
                        render={() => { return auth.currentUser ? RenderNiceComponent(<Profile whichTab="following" tabComponent={<ProfileFollowing />} />) : <Redirect to="/login" /> }}
                    />
                    <Route
                        path="/search"
                        render={() => { return auth.currentUser ? RenderNiceComponent(<SearchPage />) : <Redirect to="/login" /> }}
                    />
                    <Route
                        path="/login"
                        render={() => { return auth.currentUser ? <Redirect to="/" /> : <Login /> }}
                    />
                    <Route
                        render={() => <Redirect to="/" />}
                    />

                </Switch>
            </Router>

        </div>
    );
}

export default App;
