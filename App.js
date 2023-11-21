import React, { useState, useEffect } from 'react';
import './App.css';

const Stars = ({ rating }) => {
  const starsArray = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < rating ? 'star active' : 'star'}>&#9733;</span>
  ));

  return <div className="stars">{starsArray}</div>;
};

const ProductItem = ({ product }) => (
  <div className="product-item">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>${product.price}</p>
    <Stars rating={product.rating} />
  </div>
);

const ProductList = ({ products }) => (
  <div className="product-list">
    {products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))}
  </div>
);

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <header className="header">Header</header>
      <main>
        <ProductList products={products} />
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default App;
