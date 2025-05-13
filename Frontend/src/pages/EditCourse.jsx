import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCourse = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/courses`);
      const course = response.data.find((c) => c.id === parseInt(id));
      if (course) {
        setName(course.name);
        setDuration(course.duration);
        setPrice(course.price);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/courses/${id}`, { name, duration, price });
      navigate('/');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Course Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Update Course
        </button>
      </form>
      <button
        onClick={() => navigate('/')}
        className="mt-6 w-full bg-gray-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default EditCourse;
