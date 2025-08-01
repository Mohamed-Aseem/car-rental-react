import React from 'react'
import Title from './Title';
import { assets } from '../assets/assets';

const Testimonial = () => {
    const testimonials = [
        {
            name: "Emma Rodriguez",
            location: "Barcelona, Spain",
            image: assets.testimonial_image_1, 
            testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional."
        },
        {
            name: "John Smith",
            location: "New York, USA",
            image: assets.testimonial_image_2, 
            testimonial: "CarRental made my trip so much easier. The car was delivered right to my door, and customer service was fantastice!"
        },
        {
            name: "Ava Johnson",
            location: "Sydney, Australia",
            image: assets.testimonial_image_1, 
            testimonial: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service."
        },
    ];

    const Star = ({ filled }) => (
        <svg className="w-4 h-4 text-yellow-400" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
        </svg>
    );

    return (
        <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

            <Title title={"What Our Customers Say"} subTitle={"Discover why discerning travelers choose StayVenture for their luxury accommondations around the world."} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt='Star Icon'/>
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testimonial