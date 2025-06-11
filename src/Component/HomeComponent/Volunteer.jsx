import React, { useEffect, useState } from 'react';
import VolunteerCard from './VolunteerCard';

const Volunteer = () => {
    const [loading, setLoading] = useState(true);
    const [volunteers, setVolunteers] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/allPost')
            .then(res => res.json())
            .then(data => {
                setVolunteers(data)
                setLoading(false)
            })
    })
    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <span className="loading loading-spinner min-h-svh loading-xl"></span>
            </div>
        );
    }
    return (
        <div className='grid grid-cols-3 gap-5'>
            {
                volunteers.map(volunteer => (
                    <div >

                        <VolunteerCard data={volunteer}></VolunteerCard>
                    </div>
                ))
            }
        </div>
    );
};

export default Volunteer;