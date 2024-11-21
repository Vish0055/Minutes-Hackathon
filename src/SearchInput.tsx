import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search for products, brands, and more" }) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 w-full">
      <Search className="text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm text-gray-700"
      />
    </div>
  );
};

export default SearchInput;
