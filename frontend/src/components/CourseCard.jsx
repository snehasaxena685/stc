import { Link } from "react-router-dom";

export default function CourseCard({ id, title, duration, fee }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-lg font-bold text-green-900">{title}</h3>
      <p className="text-gray-600 mt-2">Duration: {duration}</p>
      <p className="text-gray-600">Fee: ₹{fee}</p>

      <Link
        to={`/course/${id}`}
        className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
    </div>
  );
}
