import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { db, auth, provider } from "../../firebase"


const AuthState = (props) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [darkMode, setDarkMode] = useState(false)

    function SignIn() {

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                console.log(token)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorCode)
                alert(errorMessage, "Email used: " + email, "Your Google credential: " + credential)
            });
    }

    function Logout() {
        signOut(auth)
            .then(() => {
                console.log("user logged out");
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const getUserDataFromFirestore = async (email) => {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setCurrentUser(doc.data());
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            user && getUserDataFromFirestore(user.email)
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, SignIn, Logout, darkMode, setDarkMode }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;