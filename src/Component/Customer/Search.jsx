import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcFullTrash, FcEditImage } from 'react-icons/fc';

export default function Search() {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then(res => {
        setData(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const filter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = data.filter(product => 
      product.productName.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <div className="container mx-auto my-5 shadow p-4">
        <input type="text" className="form-control" id="searchInput" placeholder="Search Here ..." onChange={filter} />
      </div>

      <div className="show-data row container">
        {filteredProducts.map((product) => (
          <div className="col-4 mx-auto my-3 w-96" key={product.id}>
            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow">
              <a href="#" className="flex justify-center items-center mt-3">
                <img className="rounded-full w-60 h-60 shadow" src={product.image} alt="product" />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-2xl text-center my-3 font-bold tracking-tight text-black">{product.productName}</h5>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
