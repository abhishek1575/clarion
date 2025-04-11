import { useState } from 'react';

function Cart() {
  const [cartItems] = useState([
    {
      id: 1,
      name: 'Fresh Apples',
      price: 2.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-2 py-1 border rounded">-</button>
                  <span>{item.quantity}</span>
                  <button className="px-2 py-1 border rounded">+</button>
                </div>
                <button className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
              onClick={() => alert('Proceeding to checkout!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;