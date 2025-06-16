import React, { useEffect, useState } from 'react';
import HeroSlider from '../Component/HomeComponent/HeroSlider';
import Volunteer from '../Component/HomeComponent/Volunteer';
import { Helmet } from 'react-helmet';
import VolunteerCard from '../Component/HomeComponent/VolunteerCard';
import { Link } from 'react-router';
import { FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [heroData, setHeroData] = useState([])
    const [upCommingPost, setUpCommingPost] = useState([])
    const [volunteerOfMonth, setVolunteerOfMonth] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/hero")
            .then(res => res.json())
            .then(data => {
                setHeroData(data)
                setLoading(false)
            })
    }, [])
    useEffect(() => {
        fetch("http://localhost:3000/upcomingPost")
            .then(res => res.json())
            .then(data => {
                setUpCommingPost(data)
                setLoading(false)
            })
    }, [])


    useEffect(() => {
        fetch("http://localhost:3000/volunteerOfTheMonth")
            .then(res => res.json())
            .then(data => {
                setVolunteerOfMonth(data)
                setLoading(false)
            });
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <span className="loading loading-spinner min-h-svh loading-xl"></span>
            </div>
        );
    }
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            {/* Slider */}
            <HeroSlider data={heroData} />
            {/* Volunteer Needs Now Section */}
            <section className='max-w-6xl mx-auto'>
                <div className='py-20'>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className='text-4xl ml-3 lg:ml-0 font-bold my-5'>
                        Volunteer Needs Now
                    </motion.h2>
                    <div className='ml-3 lg:ml-0 md:ml-0 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>

                        {
                            upCommingPost.map((signlePost, index) => <VolunteerCard key={index} data={signlePost}></VolunteerCard>)
                        }
                    </div>
                    <div className='flex justify-center my-5'>
                        <Link to={'/allPost'} className="  py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 px-10">See All</Link>
                    </div>
                </div>

                <div className='py-20'>

                    <h2 className='text-4xl font-bold'>Volunteer of the Month</h2>
                    {volunteerOfMonth ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.9 }}
                            className=" p-6 rounded-xl shadow-lg text-center mt-10">
                            <h2 className="text-2xl flex items-center gap-2 justify-center font-bold text-indigo-600 mb-2"> <FaTrophy className='text-[#e7aa00]' /> Volunteer of the Month</h2>
                            <img src={`https://i.ibb.co/r2Htqr67/portfolio-5.png`} className="w-24 h-24 mx-auto rounded-full mb-4" alt="volunteer" />
                            <h3 className="text-xl font-semibold">{volunteerOfMonth.name}</h3>
                            <p className="text-gray-600">{volunteerOfMonth.email}</p>
                            <p className="mt-3 text-gray-700">Volunteered {volunteerOfMonth.count} times this month. Great job!</p>
                        </motion.div>
                    ) : <p> Volunteer of the Month Yet Coocking </p>}
                </div>

                <div className="py-20">
                    <h2 className="ml-3 lg:ml-0 text-4xl font-bold  mb-10">
                        Volunteer Moments
                    </h2>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.9 }}
                            className="p-6 rounded-lg shadow-2xl text-center">
                            <img
                                src="https://i.ibb.co/r2Htqr67/portfolio-5.png"
                                alt="Volunteer"
                                className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-indigo-500 mb-4"
                            />
                            <h3 className="font-semibold">Subrota Roy</h3>
                            <p className="text-sm text-gray-600 mt-2 italic">
                                “It was a great experience helping out during the health camp!”
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.9 }}
                            className="p-6 rounded-lg shadow-2xl text-center">
                            <img
                                src="https://i.ibb.co/RG52tNPH/portfolio-7.png"
                                alt="Volunteer"
                                className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-indigo-500 mb-4"
                            />
                            <h3 className="font-semibold">Farhan Ahmed</h3>
                            <p className="text-sm text-gray-600 mt-2 italic">
                                “Helping at the animal shelter and caring for rescued pets was truly heartwarming.”
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.9 }}
                            className=" p-6 rounded-lg shadow-2xl text-center">
                            <img
                                src="https://i.ibb.co/9krw0NFW/portfolio-12.png"
                                alt="Volunteer"
                                className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-indigo-500 mb-4"
                            />
                            <h3 className="font-semibold">Nusrat Jahan</h3>
                            <p className="text-sm text-gray-600 mt-2 italic">
                                “Loved reading books with the children at the learning center.”
                            </p>
                        </motion.div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Home;