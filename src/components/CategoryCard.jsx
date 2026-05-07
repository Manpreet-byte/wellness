export default function CategoryCard({ category }) {
  return (
    <div className="group">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
        <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">{category.icon}</div>
        <h3 className="text-xl font-bold text-dark mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm">{category.description}</p>
        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-primary font-semibold hover:underline">Explore →</button>
        </div>
      </div>
    </div>
  );
}
