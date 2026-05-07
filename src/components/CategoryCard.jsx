export default function CategoryCard({ category }) {
  return (
    <div className="group">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-2 cursor-pointer hover-lift">
        <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-3 transition-transform duration-300">{category.icon}</div>
        <h3 className="text-xl font-bold text-dark mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm">{category.description}</p>
        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-primary font-semibold hover:underline wf-btn">Explore →</button>
        </div>
      </div>
    </div>
  );
}
