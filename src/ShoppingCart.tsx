import React, { useState } from 'react';
import { MinusIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ShoppingCart: React.FC = () => {
  type Item = {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    discount: string;
    image: string;
    quantity: number;
    weight?: string;
    rewards?: number;
  };

  const [cartItems, setCartItems] = useState<Item[]>([
    {
      id: 1,
      name: 'Amul Pure Ghee Ghee 1 L Tetrapack',
      price: 594,
      originalPrice: 635,
      discount: '6% off',
      image: '/api/placeholder/80/80',
      quantity: 1,
      rewards: 30,
    },
    {
      id: 2,
      name: "Let's Try Lite Multigrain Mix, Made with 100% Gro...",
      price: 90,
      originalPrice: 100,
      discount: '10% off',
      image: '/api/placeholder/80/80',
      quantity: 1,
      weight: '200 g',
      rewards: 5,
    },
  ]);

  const recommendedItems = [
    {
      id: 3,
      name: "Let's Try Namkeen Combo(Aloo,Garlic&...",
      price: 81,
      originalPrice: 90,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      weight: '6 x 32 g',
    },
    {
      id: 4,
      name: "Let's Try Gathiya,Made with 100% Groundnu...",
      price: 90,
      originalPrice: 100,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      weight: '180 g',
    },
    {
      id: 5,
      name: "Let's Try Garlic Bhujia,Made with 10...",
      price: 85,
      originalPrice: 100,
      discount: '15% off',
      image: '/api/placeholder/120/120',
      weight: '200 g',
    },
  ];

  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});

  const handleToggleSimilarItems = (itemId: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleAddItem = (recommendedItemId: number) => {
    const itemToAdd = recommendedItems.find((item) => item.id === recommendedItemId);
    if (itemToAdd) {
      setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find((item) => item.id === itemToAdd.id);
        if (existingItem) {
          // If the item already exists in the cart, increase its quantity
          return prevCartItems.map((item) =>
            item.id === itemToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        // If the item doesn't exist, add it with quantity 1
        return [...prevCartItems, { ...itemToAdd, quantity: 1 }];
      });
    }
  };

  const handleQuantityChange = (itemId: number, increment: boolean) => {
    setCartItems((prevCartItems) => {
      return prevCartItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + (increment ? 1 : -1) }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity becomes 0
    });
  };

  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-purple-900 text-white p-4">
        <div className="flex items-center gap-4">
          <button className="p-2" onClick={() => navigate(-1)}>
            <MinusIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl">Basket ({cartItems.length} items)</h1>
          <SearchIcon className="h-6 w-6 ml-auto" />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-yellow-400 text-black">11</Badge>
          <span className="uppercase">Minutes delivery</span>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xl">₹{item.price}</span>
                    <span className="text-gray-500 line-through">₹{item.originalPrice}</span>
                    <span className="text-green-600">{item.discount}</span>
                  </div>
                  {item.weight && <p className="text-gray-500 text-sm">{item.weight}</p>}
                  <div className="text-sm text-gray-600 mt-1">
                    Or Pay ₹{item.price - (item.rewards || 0)} + ⚡ {item.rewards}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, false)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, true)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Similar Items */}
              <div className="mt-4">
                <button
                  className={`text-sm font-medium text-purple-900 transition ${
                    expandedItems[item.id] ? 'underline' : 'no-underline'
                  }`}
                  onClick={() => handleToggleSimilarItems(item.id)}
                >
                  {expandedItems[item.id] ? 'Hide Similar Items' : 'Show Similar Items'}
                </button>
                {expandedItems[item.id] && (
                  <div className="flex space-x-4 overflow-x-auto py-2 mt-4 border-t pt-4">
                    {recommendedItems.slice(0, 5).map((recommendation) => (
                      <div key={recommendation.id} className="flex-shrink-0 w-40">
                        <div className="border border-gray-300 rounded-lg p-2">
                          <img
                            src={recommendation.image}
                            alt={recommendation.name}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <h5 className="mt-2 font-medium text-sm truncate">{recommendation.name}</h5>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xl">₹{recommendation.price}</span>
                            <span className="text-gray-500 line-through text-sm">
                              ₹{recommendation.originalPrice}
                            </span>
                          </div>
                          <div className="text-green-600 text-sm">{recommendation.discount}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            color="primary"
                            onClick={() => handleAddItem(recommendation.id)}
                            className="mt-2"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between items-center">
        <div>
          <p className="text-xl font-bold">₹{calculateTotal()}</p>
          <button className="text-sm text-blue-600 underline">View price details</button>
        </div>
        <Button onClick={() => navigate('/checkout')} className="bg-purple-900 text-white px-6 py-3">
          Proceed to Pay
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
