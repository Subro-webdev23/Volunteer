import React from 'react';
import logo1 from './../../assets/Companylogo/adobe.png';
import logo2 from './../../assets/Companylogo/adp.png';
import logo3 from './../../assets/Companylogo/apple.png';
import logo4 from './../../assets/Companylogo/cisco.png';
import logo5 from './../../assets/Companylogo/bosch.png';

const PartnersSponsors = () => {
    const partners = [
        { name: "Adobe", logo: logo1 },
        { name: "ADP", logo: logo2 },
        { name: "Apple", logo: logo3 },
        { name: "CISCO", logo: logo4 },
        { name: "BOSCH", logo: logo5 },
    ];
    return (
        <section className=" py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold ">Our Partners & Sponsors</h2>
                    <p className="mt-2 text-gray-500">
                        We are proud to collaborate with these amazing organizations who support our mission.
                    </p>
                </div>

                {/* Logos */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="max-h-16 object-contain grayscale hover:grayscale-0 transition"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSponsors;