import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    category: 'Fruits',
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    category: 'Fruits',
  },
  {
    id: 3,
    name: 'Fresh Milk',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    category: 'Dairy',
  },
];

function Products() {
  const [products] = useState(MOCK_PRODUCTS);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button
                className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
                onClick={() => alert('Added to cart!')}
              >
                Add to Cart
              </button>
              <Link
                to={`/products/${product.id}`}
                className="mt-2 block text-center text-primary hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;