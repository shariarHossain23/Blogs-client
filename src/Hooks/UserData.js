import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';
import axiosPrivate from '../Pages/Api/axiosPrivate';

const UserData = () => {
    const [user] = useAuthState(auth);
    const [users,setUser] = useState({})
    const {data,isLoading,refetch} = useQuery("users",()=>{
        axiosPrivate.get(`userData/${user?.email}`)
        .then(res => {
            setUser(res.data)
            refetch()
        })
    })

   
    return [users]
};

export default UserData;