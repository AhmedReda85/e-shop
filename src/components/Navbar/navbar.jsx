import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900">E-Shop</div>

        {/* Menu Items (Desktop) */}
        <div className="hidden md:flex space-x-6 text-lg font-semibold">
          <a href="#" className="text-gray-900 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-900 hover:text-blue-600">Shop</a>
          <a href="#" className="text-gray-900 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-900 hover:text-blue-600">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Items */}
      <div
        className={`md:hidden bg-white absolute left-0 top-full w-full border-t border-gray-200 transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}
      >
        <a href="#" className="block px-4 py-3 text-gray-900 hover:bg-gray-100">Home</a>
        <a href="#" className="block px-4 py-3 text-gray-900 hover:bg-gray-100">Shop</a>
        <a href="#" className="block px-4 py-3 text-gray-900 hover:bg-gray-100">About</a>
        <a href="#" className="block px-4 py-3 text-gray-900 hover:bg-gray-100">Contact</a>
      </div>
    </nav>
  );
}
