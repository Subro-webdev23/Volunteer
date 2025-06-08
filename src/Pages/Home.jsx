import React, { useEffect, useState } from 'react';
import HeroSlider from '../Component/HomeComponent/HeroSlider';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [heroData, setHeroData] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/hero")
            .then(res => res.json())
            .then(data => {
                setHeroData(data)
                setLoading(false)
            })
    }, [])
    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <span className="loading loading-spinner min-h-svh loading-xl"></span>
            </div>
        );
    }
    return (
        <div>
            {/* Slider */}
            <HeroSlider data={heroData} />
        </div>
    );
};

export default Home;