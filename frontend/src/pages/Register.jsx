import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  return (
    <>
      <Navbar />

      <section className="py-12">
        <div className="max-w-lg mx-auto bg-white shadow p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
            Register
          </h2>

          <form>
            <label className="block mb-1">Full Name</label>
            <input className="w-full border rounded px-3 py-2 mb-4" />

            <label className="block mb-1">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2 mb-4" />

            <label className="block mb-1">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2 mb-4" />

            <label className="block mb-1">Confirm Password</label>
            <input type="password" className="w-full border rounded px-3 py-2 mb-6" />

            <button className="w-full bg-green-800 text-white py-2 rounded">
              Register
            </button>
          </form>

        </div>
      </section>

      <Footer />
    </>
  );
}
