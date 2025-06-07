import React, { useEffect, useState } from 'react';
import HeroSlider from '../Component/HomeComponent/HeroSlider';

const Home = () => {
    const [heroData, setHeroData] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/hero")
            .then(res => res.json())
            .then(data => {
                setHeroData(data)

            })

    }, [])
    return (
        <div>
            {/* Slider */}
            <HeroSlider data={heroData} />
        </div>
    );
};

export default Home;