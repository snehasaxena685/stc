import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

export default function Login() {
  return (
    <>
      <Navbar />

      <section className="py-20">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">Login</h2>

          <form>
            <label className="block mb-2 font-semibold">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2 mb-4" />

            <label className="block mb-2 font-semibold">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2 mb-6" />

            <button className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-900">
              Login
            </button>
          </form>

        </div>
      </section>

      <Footer />
    </>
  );
}
