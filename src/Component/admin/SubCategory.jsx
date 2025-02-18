import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { FcEditImage, FcFullTrash } from 'react-icons/fc';

export default function SubCategory() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const Navigate = useNavigate();

  // const colors = [
  //   'bg-red-100',
  //   'bg-yellow-100',
  //   'bg-green-100',
  //   'bg-blue-100',
  //   'bg-purple-100',
  //   'bg-indigo-100',
  //   'bg-pink-100',
  //   'bg-orange-100',
  // ];

  useEffect(() => {
    // Fetch category data using Axios
    axios.get('http://localhost:4000/category')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching category data:', error));
  }, []);

  useEffect(() => {
    // Fetch category data using Axios
    axios.get('http://localhost:4000/sub-category')
      .then(response => setSubCategories(response.data))
      .catch(error => console.error('Error fetching category data:', error));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter subcategories based on selected category
  const filteredSubcategories = selectedCategory ? subCategories.filter(category => category.category === selectedCategory) : subCategories;

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="category container-fluid overflow-hidden">
          <Navbar />
          <div className="row g-3 items-center my-3 px-3">
            <div className="col-md-6">
              <h1 className="font-bold text-4xl m-0 p-0 text-center font-serif">Sub category</h1>
            </div>
            <div className="col-md-5">
              <form className="">
                <select
                  className="form-select form-select-lg ms-3"
                  aria-label="Large select example"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="" className='text-black'>Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryName} className='text-black'>{category.categoryName}</option>
                  ))}
                </select>
              </form>
            </div>
          </div>

          <div className="row gap-2 mt-5 justify-center items-center fruits-category mx-auto">
            {filteredSubcategories.length === 0 ? (
              <div className="col-md-8 text-center my-5">
                <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50" role="alert">
                  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div className="ms-3 text-sm font-medium">
                    No Sub Category available
                  </div>
                  <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              filteredSubcategories.map((category) => (
                <div key={category.id} className={`col-md-3 rounded-lg p-4 shadow border-2 hover:shadow-lg hover:border-green-500 `}>
                  <a href="#" className="d-flex justify-center align-items-center">
                    <img className="rounded-full h-36 w-36" src={category.image} alt={category.subCategoryName} />
                  </a>
                  <div className="px-5 text-center">
                    <a href="#">
                      <h5 className="text-2xl font-bold tracking-tight text-nowrap text-center hover:text-green-600">{category.subCategoryName}</h5>
                      <span className="">{category.descriptions}</span>
                    </a>
                  </div>
                  <div className="flex justify-center items-center mt-4 md:mt-6">
                    <button onClick={() => Navigate(`/delete-subcategory/${category.id}`)} type='button' className={`bg-gradient-to-r from-red-400 via-red-500 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 py-2 px-4 ms-2  font-medium text-white text-xl flex justify-center items-center rounded`}><i className="bi bi-trash"></i><span className='ms-2'>Delete</span></button>
                    <button onClick={() => Navigate(`/edit-subcategory/${category.id}`)} type="button" className="py-2 px-4 ms-2  font-medium text-white text-xl flex justify-center items-center bg-gradient-to-r from-lime-400 via-lime-500 to-lime-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 rounded "><i className="bi bi-pencil"></i><span className='ms-2'>Edit</span></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div >
    </>
  );
}
