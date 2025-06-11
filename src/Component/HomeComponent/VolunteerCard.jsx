import React from 'react';

const VolunteerCard = ({ data }) => {
    const { thumbnail, title, category, deadline } = data;
    const formattedDeadline = new Date(deadline).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300 max-w-sm">
            <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
                    {category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Deadline: <span className="font-medium">{formattedDeadline}</span>
                </p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default VolunteerCard;