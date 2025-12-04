import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Available Courses
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <CourseCard 
            id="1"
            title="Food Processing & Preservation"
            fee="12,500"
            duration="2 Weeks"
          />

          <CourseCard 
            id="2"
            title="Chocolate Technology"
            fee="8,000"
            duration="1 Week"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
