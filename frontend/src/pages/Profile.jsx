import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  return (
    <>
      <Navbar />

      <section className="max-w-3xl mx-auto px-4 py-12 bg-white shadow rounded-lg mt-6">
        <h2 className="text-3xl font-bold text-green-900">My Profile</h2>

        <div className="mt-6">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
          <p><strong>Courses Applied:</strong> 3</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
