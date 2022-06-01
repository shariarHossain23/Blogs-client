import { useEffect, useState } from 'react';
import axiosPrivate from '../Pages/Api/axiosPrivate';

const useToken = user => {
    const [token,setToken] = useState("")
    const email = user?.user?.email;
    const currentUser = {email : email}
    useEffect(()=>{
        if(email){
            axiosPrivate.put(`bloguser/${email}`,currentUser)
            .then(response => {
                const accessToken =response.data.token
                localStorage.setItem("user",accessToken)
                setToken(accessToken)
               
                
            })
        }
    },[user])

    return [token]
};

export default useToken;