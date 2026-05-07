export default function HowItStarted() {
  return (
    <section id="story" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: Title + Image */}
          <div className="animate-this up">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#111] mb-10 leading-none tracking-tight">
              How It All Started?
            </h2>
            <img
              src="/images/how-it-started.png"
              alt="Our Journey"
              className="w-full h-[460px] md:h-[560px] object-cover object-top bg-[#f3fbf7]"
            />
          </div>

          {/* Right: Text */}
          <div className="animate-this up md:pt-6">
            <h5 className="text-base md:text-lg font-bold text-[#111] mb-7 max-w-[520px]">
              The foundation of Wellness Forever was built on the shared vision of three passionate professionals with deep roots in the healthcare space.
            </h5>

            <p className="text-sm md:text-base text-[#6b7a75] leading-relaxed mb-7 max-w-[560px]">
              In 1980, Ashraf Biran, a pharmacist by heart, opened a humble pharmacy outlet. His in-depth knowledge of pharmaceutical retail operations set the stage for what was to come. He was soon joined by Gulshan Bakhtiani, a science graduate who began his journey as a medical representative.
            </p>

            <p className="text-sm md:text-base text-[#6b7a75] leading-relaxed mb-7 max-w-[560px]">
              Gulshan's passion for sales and customer-centric retail gave the venture momentum and scale. Completing the trio was Mohan Chavan, an expert in pharma distribution, who laid down the logistics framework that would become critical to the company's growth. Together, they created a business built on trust, transparency, and genuine care—a rare combination that helped them set new benchmarks in organized pharmacy retail.
            </p>

            <p className="text-sm md:text-base text-[#6b7a75] leading-relaxed max-w-[560px]">
              What began as a small store is now a movement that reimagines healthcare access with compassion, commitment, and innovation. Their story is not just about entrepreneurship, but about service—a mission to make health and wellness accessible, 24x7.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
