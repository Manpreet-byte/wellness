import TestimonialCard from './TestimonialCard';
import { testimonials } from '../data/products';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-this up">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Join thousands of happy wellness enthusiasts</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 animate-this up">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} style={{animationDelay: `${index * 0.1}s`}} className="animate-fade-in">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Testimonials Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center animate-this up">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-4xl font-bold text-primary mb-2">98%</p>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-4xl font-bold text-primary mb-2">50K+</p>
            <p className="text-gray-600">Verified Reviews</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-4xl font-bold text-primary mb-2">4.9★</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
