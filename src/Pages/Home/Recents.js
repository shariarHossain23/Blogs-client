import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axiosPrivate from '../Api/axiosPrivate';
import Recent from './Recent';

const Recents = () => {
    const [recents,setRecent] = useState([])
    useEffect(()=>{
        axiosPrivate.get('/recent')
        .then(response => {
            setRecent(response.data)
           
        })
    },[])
    return (
        <div className='lg:mt-48'>
            <h1 className='text-center text-4xl mb-4'>Recent post</h1>
          
             <Carousel>
                 {
                     recents.slice(0,6).map(recent => <Recent key={recent._id} recent={recent}></Recent>)
                 }
             </Carousel>
           
        </div>
    );
};

export default Recents;