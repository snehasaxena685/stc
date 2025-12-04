import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
import PartnersSlider from "../components/PartnersSlider";
import UpcomingBox from "../components/UpcomingBox";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroCarousel />

      {/* Why Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-green-900 mb-8 text-center">
          Why Choose CFTRI?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h4 className="text-lg font-semibold text-green-900">Hands-on Training</h4>
            <p className="text-gray-600 mt-2">
              Practical food-tech training conducted inside CFTRI laboratories.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h4 className="text-lg font-semibold text-green-900">Govt Certification</h4>
            <p className="text-gray-600 mt-2">
              Certificates recognized by food industries across India.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h4 className="text-lg font-semibold text-green-900">Global Access</h4>
            <p className="text-gray-600 mt-2">
              International students welcome — payment gateway enabled.
            </p>
          </div>

        </div>
      </section>

      <UpcomingBox />

      <PartnersSlider />

      <Footer />
    </>
  );
}
