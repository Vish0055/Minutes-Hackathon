import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  User, 
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Zap // Fast Forward icon
} from 'lucide-react';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom'; // Import Link for navigation

interface HomePageProps {
  onNavigateToCart: () => void;
}

interface Category {
  name: string;
  icon: React.ReactNode; // Changed to ReactNode to support React elements
}

interface CarouselItem {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories: Category[] = [
    { name: 'Grocery', icon: '🛒' },
    { name: 'Mobiles', icon: '📱' },
    { name: 'Fashion', icon: '👔' },
    { name: 'Electronics', icon: '💻' },
    { name: 'Home & Furniture', icon: '🏠' },
    { name: 'Appliances', icon: '🔌' },
    { name: 'Fast Forward', icon: <Zap size={24} /> }, // Using ReactNode for icon
  ];

  const carouselItems: CarouselItem[] = [
    {
      title: "Wedding Season Sale!",
      description: "Up to 70% off on Wedding Collections",
      bgColor: "bg-pink-500",
      textColor: "text-white",
    },
    {
      title: "Electronics Fest",
      description: "Latest Gadgets at Best Prices",
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Voice Shopping",
      description: "Just speak to add items to cart",
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-600">Flipkart Plus</h1>
            
            {/* Search Bar */}
            <div className="flex-1 flex items-center gap-2">
              <SearchInput />
              <Button variant="ghost" className="flex items-center gap-1">
                <User size={20} />
                <span>Devika</span>
                <ChevronDown size={16} />
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center gap-1"
                onClick={onNavigateToCart}
              >
                <ShoppingCart size={20} />
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center justify-between mt-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.name === 'Fast Forward' ? '/fast-forward' : '#'}
              >
                <Button
                  variant="ghost"
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto mt-4 overflow-hidden">
        <div 
          className="transition-transform duration-500 ease-out flex"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`min-w-full ${item.bgColor} ${item.textColor} p-12 rounded-lg flex items-center justify-between`}
            >
              <div>
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl">{item.description}</p>
                <Button className="mt-4 bg-white text-black hover:bg-gray-100">
                  Shop Now
                </Button>
              </div>
              <div className="text-6xl">✨</div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full"
          onClick={prevSlide}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full"
          onClick={nextSlide}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
