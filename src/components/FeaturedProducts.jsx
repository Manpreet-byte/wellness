import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function FeaturedProducts() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-this up">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Discover our bestselling wellness products</p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-this up">
          {products.map((product, index) => (
            <div key={product.id} style={{animationDelay: `${index * 0.1}s`}} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16 animate-this up">
          <button className="btn-primary text-lg px-8 py-4 inline-block hover:shadow-lg transition-all duration-300">
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
}
