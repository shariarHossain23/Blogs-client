import React from 'react';
import Fotter from '../Shared/Fotter';
import Banner from './Banner';
import Blogs from './Blogs';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Blogs/>
            <Fotter></Fotter>
        </div>
    );
};

export default Home;