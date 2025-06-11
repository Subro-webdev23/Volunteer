import React, { useEffect, useState } from 'react';
import HeroSlider from '../Component/HomeComponent/HeroSlider';
import Volunteer from '../Component/HomeComponent/Volunteer';

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
            {/* Volunteer Needs Now Section */}
            <section className='max-w-6xl mx-auto'>
                <div className='py-20'>
                    <h2 className='text-4xl font-bold'>Volunteer Needs Now</h2>

                    <Volunteer></Volunteer>

                </div>
                <div className='py-20'>

                    <h2 className='text-4xl font-bold'>Volunteer of the Month</h2>
                </div>

            </section>
        </div>
    );
};

export default Home;