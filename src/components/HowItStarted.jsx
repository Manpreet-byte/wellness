export default function HowItStarted() {
  return (
    <section id="story" className="bg-white">
      <div className="w-full mx-auto px-0 pr-4 sm:pr-6 md:pr-10 lg:pr-12 pt-8 md:pt-10 pb-0 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="animate-this left">
            <div className="relative mt-4">
              <img
                src="/images/img_2.png"
                alt="Our Journey"
                className="w-full h-auto hover-scale"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right: Title + Text */}
          <div className="px-4 sm:px-6 md:px-10 lg:px-0 lg:pl-6">
            <h2 className="wf-display-4 wf-fw-normal text-[#111] mb-10 animate-this right">
              How It All Started?
            </h2>
            <h5 className="text-base md:text-lg font-bold text-[#111] mb-7 max-w-[520px] animate-this up">
              The foundation of Wellness Forever was built on the shared vision of three passionate professionals with deep roots in the healthcare space.
            </h5>

            <p className="text-sm md:text-base wf-text-secondary leading-relaxed mb-7 max-w-[560px] animate-this right">
              In 1980, Ashraf Biran, a pharmacist by heart, opened a humble pharmacy outlet. His in-depth knowledge of pharmaceutical retail operations set the stage for what was to come. He was soon joined by Gulshan Bakhtiani, a science graduate who began his journey as a medical representative.
            </p>

            <p className="text-sm md:text-base wf-text-secondary leading-relaxed mb-7 max-w-[560px] animate-this right">
              Gulshan's passion for sales and customer-centric retail gave the venture momentum and scale. Completing the trio was Mohan Chavan, an expert in pharma distribution, who laid down the logistics framework that would become critical to the company's growth. Together, they created a business built on trust, transparency, and genuine care—a rare combination that helped them set new benchmarks in organized pharmacy retail.
            </p>

            <p className="text-sm md:text-base wf-text-secondary leading-relaxed max-w-[560px] animate-this right">
              What began as a small store is now a movement that reimagines healthcare access with compassion, commitment, and innovation. Their story is not just about entrepreneurship, but about service—a mission to make health and wellness accessible, 24x7.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
