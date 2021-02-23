import React, { useState, useEffect, Suspense } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const FrontComponent = React.lazy(() => import('../components/FrontComponent'));
const SignupSteps = React.lazy(() => import("./SignupSteps"));
const AddImage = React.lazy(() => import("../components/AddImage"));
const Newsfeed = React.lazy(() => import("./Newsfeed"));

function finishSetup() {
    window.location.reload();
}

export default function Front() {

    const [ userState, setUserState ] = useState({ new_user: true });
    const [ SQLImages, setSQLImages ] = useState([]);
    const [ imageName, setImageName ] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {
        if (isAuthenticated) {
            axios.get('/api/user/' + user.email)
            .then(res => {
                if (res.data.email !== null) {
                    setUserState({
                        ...userState,
                        new_user: false,
                        handle: res.data.handle
                    });
                }
            }).catch(err => {
                console.log(err);
                setUserState({
                    ...userState,
                    new_user: true,
                    uploadedPic: false,
                });
            });
        }
    }, [isAuthenticated]);
    
    useEffect(() => {
        if (isAuthenticated && !isLoading && !userState.new_user) {
            axios.get('/api/image/' + user.email)
                .then(response => {
                    if (response.data.data === null) {
                        setUserState({...userState, uploadedPic: false });
                    } else {
                        setUserState({...userState, uploadedPic: true});
                        setSQLImages(response.data.data);
                        setImageName(response.data.fileName);
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
    }, [userState.new_user]);

    if (!isLoading && !isAuthenticated) {
        return (
            <Suspense fallback={<Loading/>}>
                <FrontComponent/>
            </Suspense>
        );
    }
    if (!isLoading && isAuthenticated && userState.new_user === true && userState.uploadedPic === false) {
        return (
            <Suspense fallback={<Loading/>}>
                <SignupSteps/>
            </Suspense>
        );
    }
    if (!isLoading && isAuthenticated && userState.new_user === false && userState.uploadedPic === false) {
        return ( // refactor
            <Suspense fallback={<Loading/>}>
                <AddImage email={user.email} finishSetup={finishSetup}/>
            </Suspense>    
        );
    }
    if (!isLoading && isAuthenticated && userState.new_user === false && userState.uploadedPic === true) {
        return (
            <Suspense fallback={<Loading/>}>
                <Newsfeed 
                    images={SQLImages} 
                    imageName={imageName} 
                    handle={userState.handle}
                />
            </Suspense>
        );
    }
    return <Loading/>;
}