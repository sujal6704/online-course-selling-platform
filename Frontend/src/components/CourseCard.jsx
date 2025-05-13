import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, deleteCourse }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
      <p className="text-gray-600 mt-2">Duration: {course.duration}</p>
      <p className="text-gray-600">Price: ${course.price}</p>
      <div className="mt-4 flex space-x-4">
        <Link
          to={`/edit/${course.id}`}
          className="bg-green-400 text-white px-4 py-2 rounded shadow hover:bg-green-500 transition duration-300"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteCourse(course.id)}
          className="bg-red-400 text-white px-4 py-2 rounded shadow hover:bg-red-500 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
