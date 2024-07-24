import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function PopularProduct() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const productLimit = 8; // Define the number of products to show

  useEffect(() => {
    // Fetch product data using Axios
    axios.get(`http://localhost:4000/products`)
      .then(response => {
        // Add a count property to each product
        const productsWithCount = response.data.map(product => ({ ...product, count: 0 }));
        setProducts(productsWithCount);
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  const increment = (productId) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, count: product.count + 1 } : product
    ));
  };

  const decrement = (productId) => {
    setProducts(products.map(product =>
      product.id === productId && product.count > 0 ? { ...product, count: product.count - 1 } : product
    ));
  };

  const addToCart = (productId) => {
    // Check if the product is already in the cart
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      // Add the product to cartItems if it's not already added
      if (!cartItems.find(item => item.id === productId)) {
        // Update cartItems state
        const updatedCart = [...cartItems, productToAdd];
        setCartItems(updatedCart);

        // Show success message using SweetAlert
        MySwal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: `${productToAdd.productName} has been added to your cart.`,
          timer: 2000, // Automatically close after 2 seconds
          timerProgressBar: true,
          showConfirmButton: false
        });

        // Save updated cartItems to db.json using JSON Server
        axios.post(`http://localhost:4000/cart`, updatedCart)
          .then(response => console.log('Cart items saved:', response.data))
          .catch(error => console.error('Error saving cart items:', error));
      } else {
        // Show info message using SweetAlert
        MySwal.fire({
          icon: 'info',
          title: 'Already in Cart',
          text: `${productToAdd.productName} is already in your cart.`
        });
      }
    }
  };

  return (
    <>
      <div className="shop my-5">
        <h1 className='text-gray-800 font-bold text-5xl font-serif mb-5 text-center'>Popular Products</h1>
        <div className="flex rounded items-center justify-center flex-wrap container-fluid">
          {products.slice(0, productLimit).map((product) => (
            <div className="m-3 w-96" key={product.id}>
              <div className={`w-full max-w-sm bg-slate-50 border border-gray-200 rounded-lg shadow`}>
                <div className="flex justify-end px-4 pt-4">
                  <div className="rounded border p-2"><i className='bi bi-bookmark text-3xl'></i></div>
                </div>
                <a href="#" className='flex justify-center items-center mt-3'>
                  <img className="rounded-full w-60 h-60 shadow" src={product.image} alt="product image" />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className={`text-2xl text-center my-3 font-bold tracking-tight text-black`}>{product.productName}</h5>
                  </a>
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">{product.descriptions}</h5>
                  </a>
                  <div className="flex justify-between items-center my-3">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <div className="bi bi-star-fill text-yellow-300"></div>
                      <div className="bi bi-star-fill text-yellow-300"></div>
                      <div className="bi bi-star-fill text-yellow-300"></div>
                      <div className="bi bi-star-fill text-yellow-300"></div>
                      <div className="bi bi-star-half text-yellow-300"></div>
                    </div>
                    <div className='flex justify-between items-center bg-yellow-600 border border-yellow-600 px-2 rounded mx-0'>
                      <button className='btn text-white font-bold text-3xl text-center py-1' onClick={() => decrement(product.id)}>-</button>
                      <p className='bg-white py-2 px-3 rounded'>{product.count} Kg</p>
                      <button className='btn text-white font-bold text-3xl text-center py-1 flex items-center' onClick={() => increment(product.id)}>+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 ">{product.price}</span>
                    <button
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={() => addToCart(product.id)}
                    >
                      {cartItems.find(item => item.id === product.id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>


                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
