import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const VolunteerCard = ({ data }) => {
    const { _id, thumbnail, title, category, deadline } = data;
    const formattedDeadline = new Date(deadline).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    return (
        <motion.div

            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}

            className="rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300 max-w-sm">
            <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
                    {category}
                </span>
                <h3 className="mt-2 text-lg font-semibold ">{title}</h3>
                <p className="text-sm text-gray-500 my-3">
                    Deadline: <span className="font-medium">{formattedDeadline}</span>
                </p>
                <Link to={`/postDetails/${_id}`} className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default VolunteerCard;