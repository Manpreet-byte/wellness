export default function MissionVision() {
  return (
    <section id="mission" className="mission-vision-section py-20 md:py-28 bg-[#d9efe3] relative overflow-hidden">
      <div className="section-animated-bg">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <circle className="blob-light-1" cx="100" cy="200" r="150" />
          <circle className="blob-light-2" cx="900" cy="300" r="130" />
          <circle className="blob-light-3" cx="500" cy="500" r="180" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="wf-display-4 wf-fw-normal text-[#1e2b26] mb-0 animate-this up">Mission & Vision</h2>
          <div className="divider-line mx-auto my-6 animate-this up" />
          <p className="text-base md:text-lg wf-text-secondary max-w-2xl mx-auto leading-relaxed animate-this up">
            Redefining healthcare access through compassion, expertise, and modern retail excellence, ensuring trusted, reliable, and seamless care for every community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 justify-center mt-10 md:mt-14">
          <div className="animate-this left">
            <div className="vision-card text-center">
              <div className="icon-square-white mx-auto mb-4">
                <img src="/images/vision.svg" alt="Vision" />
              </div>
              <h3 className="fw-bold mb-3">Our Vision</h3>
              <p className="mb-0">
                To be India's most trusted and accessible pharmacy retail chain, setting the benchmark for reliable healthcare delivery and customer experience across every community we serve.
              </p>
            </div>
          </div>

          <div className="animate-this right">
            <div className="mission-card text-center">
              <div className="icon-square-green mx-auto mb-4">
                <img src="/images/mission.svg" alt="Mission" />
              </div>
              <h3 className="fw-bold mb-3">Our Mission</h3>
              <div className="card-scroll-box">
                <p className="mb-0">
                  To make quality healthcare easily accessible through a strong network of stores operating day and night, ensuring the availability of genuine medicines and wellness products whenever they are needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
