import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseDetails() {
  const { id } = useParams();

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 py-10 bg-white mt-6 shadow rounded-lg">
        <h2 className="text-3xl font-bold text-green-900">
          Course Title #{id}
        </h2>

        <p className="mt-2 text-gray-600">
          Full course description goes here…
        </p>

        <div className="mt-6">
          <p><strong>Duration:</strong> 2 Weeks</p>
          <p><strong>Fee:</strong> ₹12,500</p>
          <p><strong>Mode:</strong> Offline (CFTRI Mysore)</p>
        </div>

        <Link
          to={`/apply/${id}`}
          className="mt-6 inline-block bg-green-800 text-white px-5 py-3 rounded"
        >
          Apply Now
        </Link>
      </section>

      <Footer />
    </>
  );
}
