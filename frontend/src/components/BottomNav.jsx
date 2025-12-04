import { Link } from "react-scroll";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#063f17] text-white py-3 px-6 flex justify-around md:hidden shadow-xl rounded-t-2xl">

      <Link to="home" smooth duration={500} className="text-center">
        <p className="text-sm">Home</p>
      </Link>

      <Link to="courses" smooth duration={500} className="text-center">
        <p className="text-sm">Courses</p>
      </Link>

      <Link to="login" smooth duration={500} className="text-center">
        <p className="text-sm">Login</p>
      </Link>

      <Link to="register" smooth duration={500} className="text-center">
        <p className="text-sm">Register</p>
      </Link>

    </div>
  );
}
