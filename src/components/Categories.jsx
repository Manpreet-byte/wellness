import CategoryCard from './CategoryCard';
import { categories } from '../data/products';

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-accent to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-this up">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Browse our wide range of wellness products</p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-this up">
          {categories.map((category, index) => (
            <div key={category.id} style={{animationDelay: `${index * 0.1}s`}} className="animate-fade-in">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
