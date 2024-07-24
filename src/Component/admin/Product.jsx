import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { FcEditImage, FcFullTrash } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const Navigate = useNavigate();

  useEffect(() => {
    // Fetch category data using Axios
    axios.get('http://localhost:4000/category')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching category data:', error));
  }, []);

  // Fetch subcategories when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      axios.get(`http://localhost:4000/sub-category?category=${selectedCategory}`)
        .then(response => setSubCategories(response.data))
        .catch(error => console.error('Error fetching sub-category data:', error));
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Fetch product data using Axios
    axios.get('http://localhost:4000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  // Filter products based on selected subcategory
  const filteredProducts = selectedSubCategory
    ? products.filter(product => product.subCategory === selectedSubCategory)
    : products;

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="product container">
          <Navbar />
          <div className="flex justify-between items-center m-5 p-3 rounded border-b-4 border-green-800">
            <h1 className='text-gray-800 font-bold text-3xl text-center'>Popular Products</h1>
            <div className="flex justify-end items-center gap-3">
              <form className="">
                <select
                  className="form-select form-select-lg ms-3"
                  aria-label="Large select example"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="" className='text-black'>Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryName} className='text-black'>{category.categoryName}</option>
                  ))}
                </select>
              </form>
              <form className="">
                <select
                  className="form-select form-select-lg ms-3"
                  aria-label="Large select example"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                >
                  <option value="" className='text-black'>Select Subcategory</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.subCategoryName} className='text-black'>{subCategory.subCategoryName}</option>
                  ))}
                </select>
              </form>
            </div>
          </div>
          <div className="flex rounded items-center justify-center flex-wrap">
            {filteredProducts.length === 0 ? (
              <div className="col-md-8 text-center my-5">
                <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50" role="alert">
                  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div className="ms-3 text-sm font-medium">
                    No products available
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
              filteredProducts.map((product) => (
                <div className="m-3 w-96" key={product.id}>
                  <div className={`w-full max-w-sm  border border-gray-200 rounded-lg shadow`}>
                    <div className="px-2">
                      <a href="#" className='flex justify-center items-center mt-3'>
                        <img className="rounded shadow w-full h-72" src={product.image} alt="product" />
                      </a>
                      <div className="px-3 pb-2 card-body">
                        <a href="#">
                          <h5 className={`text-2xl text-start my-3 font-bold tracking-tight text-black`}>{product.productName}</h5>
                        </a>
                        <a href="#">
                          <h5 className="text-xl font-medium tracking-tight text-gray-900">{product.descriptions}</h5>
                        </a>
                        <div className="flex items-center my-2">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <div className="bi bi-star-fill text-yellow-300"></div>
                            <div className="bi bi-star-fill text-yellow-300"></div>
                            <div className="bi bi-star-fill text-yellow-300"></div>
                            <div className="bi bi-star-fill text-yellow-300"></div>
                            <div className="bi bi-star-half text-yellow-300"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-900 ">{product.price}</span>
                        </div>
                        <ul className="flex items-center mt-2 justify-between">
                          <li className="text-gray-600 fw-bold">Shop :- <span className='font-medium'>{product.shopkeeper}</span></li>
                        </ul>
                        <div className='d-flex align-items-center'>
                          <button onClick={() => Navigate(`/edit-product/${product.id}`)} className='bg-green-500 btn-lg p-3 m-2 rounded text-2xl text-white font-bold font-serif bi bi-pencil'></button>
                          <button onClick={() => Navigate(`/delete-product/${product.id}`)} className='bg-yellow-500 btn-lg p-3 m-2 rounded text-2xl text-white font-bold font-serif bi bi-trash'></button>
                        </div>
                      </div>
                    </div>
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
