import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();

  // Mock product data
  const product = {
    id: parseInt(id),
    name: 'Fresh Apples',
    price: 2.99,
    description: 'Fresh and crispy apples picked from local orchards.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    nutrition: {
      calories: '52 kcal',
      protein: '0.3g',
      carbs: '14g',
      fiber: '2.4g',
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl text-primary">${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Nutrition Information</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.nutrition).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium capitalize">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
            
            <button
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
              onClick={() => alert('Added to cart!')}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;