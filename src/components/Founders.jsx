import { useState, useEffect } from 'react';
import { founders } from '../data/company';

export default function Founders() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  return (
    <section id="founders" className="py-24 md:py-32 bg-gradient-to-b from-white via-white to-accent/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 animate-slide-in-up">
          <p className="text-primary font-bold text-lg mb-3">OUR TEAM</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-4 overflow-hidden">
            <span className="inline-block animate-slide-in-up delay-100">Founders</span>
          </h2>
        </div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {founders.map((founder, index) => (
            <div
              key={founder.id}
              className="group animate-slide-in-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-gray-200">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 animate-scale-up"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-dark mb-2 group-hover:text-primary transition-colors duration-300 overflow-hidden">
                    <span className="inline-block animate-slide-in-up delay-300">{founder.name}</span>
                  </h3>
                  <p className="text-sm text-gray-600 animate-slide-in-up delay-400">Founder</p>
                  <div className="mt-4 pt-4 border-t border-gray-200 group-hover:border-primary transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
