import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/courses/${id}`);
      fetchCourses(); // Refresh the course list after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="p-6 w-full mx-0 bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-white">Available Courses</h2>
      
      {/* Add Course Button - Align to the left */}
      <div className="mb-6">
        <Link
          to="/create"
          className="bg-yellow-400 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
        >
          Add Course
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} deleteCourse={deleteCourse} />
        ))}
      </div>
    </div>
  );
};

export default Home;
