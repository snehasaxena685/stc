import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Apply() {
  const { id } = useParams();

  return (
    <>
      <Navbar />

      <section className="max-w-xl mx-auto bg-white shadow p-8 mt-10 rounded-lg">
        <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
          Apply for Course #{id}
        </h2>

        <form>

          <label className="block mb-1">Full Name</label>
          <input className="w-full border rounded px-3 py-2 mb-4" />

          <label className="block mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2 mb-4" />

          <label className="block mb-1">Address</label>
          <input className="w-full border rounded px-3 py-2 mb-4" />

          <label className="block mb-1">Upload ID Proof</label>
          <input type="file" className="w-full mb-6" />

          <button className="w-full bg-green-800 text-white py-3 rounded">
            Submit Application
          </button>
        </form>
      </section>

      <Footer />
      <BottomNav />
    </>
  );
}
