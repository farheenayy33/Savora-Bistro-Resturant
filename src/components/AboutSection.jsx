import React from 'react'
import { Link } from 'react-router-dom';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedSection from '../components/AnimatedSection';

const AboutSection = () => {
    return (
        <div>
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <AnimatedSection animation="slideLeft">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                About Savora Bistro
                            </h2>
                            <p className="text-gray-600 mb-4 text-lg">
                                Welcome to Savora Bistro, where culinary excellence meets warm hospitality.
                                Our chefs craft each dish with passion, using only the finest ingredients
                                sourced locally and globally.
                            </p>
                            <p className="text-gray-600 mb-6 text-lg">
                                Whether you're celebrating a special occasion or simply enjoying a meal
                                with loved ones, we're here to make your dining experience unforgettable.
                            </p>
                            <Link to="/contact">
                                <AnimatedButton variant="primary">Learn More</AnimatedButton>
                            </Link>
                        </AnimatedSection>
                        <AnimatedSection animation="slideRight" delay={0.2}>
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
                                    alt="Restaurant interior"
                                    className="rounded-xl shadow-2xl"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AboutSection
