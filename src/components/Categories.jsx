import CategoryCard from './CategoryCard';
import { categories } from '../data/products';

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-accent to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 animate-this up">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Browse our wide range of wellness products</p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={category.id} className="animate-this up" data-reveal-delay={index * 90}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
