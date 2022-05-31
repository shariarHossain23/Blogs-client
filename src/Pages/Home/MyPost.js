import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import axiosPrivate from '../Api/axiosPrivate';
import Spinner from '../Shared/Spinner';
import MypostCard from './MypostCard';
import PostDelteModal from './PostDelteModal';

const MyPost = () => {
    const [user] = useAuthState(auth)
    
    const [posts,setPost] = useState([])
    const [deleteUser,setDelete] = useState(null)
    const {data,isLoading,refetch} = useQuery('my-post',()=> {
        axiosPrivate.get(`blogsuserspost/${user?.email}`)
        .then(response => {
            setPost(response.data)
            console.log(response);
        },(err => {
           console.log(err.response);
        })
        )
    })

    if(isLoading){
        return <Spinner/>
    }
    return (
       <div>
            <div>
            {
                posts.map(post => <MypostCard key={post._id} post={post}
                setDelete={setDelete}
                ></MypostCard>)
            }
        </div>
        <PostDelteModal deleteUser={deleteUser} setDelete={setDelete} refetch={refetch}></PostDelteModal>
       </div>
    );
};

export default MyPost;