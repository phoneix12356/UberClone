import { Link, useLocation } from 'react-router-dom';
import path from '../path/path';

const Header = () => {
  const arr = Object.values(path);
  const location = useLocation();

  return (
    <header className=" bg-gradient-to-r from-gray-900 to-gray-800 py-4 px-6 w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to={path.home.path} 
          className="text-white text-3xl font-extrabold tracking-tight hover:text-blue-400 transition-colors duration-300"
        >
          <span className="text-blue-500">U</span>ber
        </Link>
        
        <nav className="flex gap-6">
          {arr.map((p, index) => (
            <Link
              key={index}
              to={p.path}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                ${location.pathname === p.path 
                  ? 'text-white bg-blue-600 shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'}
                transition-all duration-300 ease-in-out
                uppercase tracking-wide
              `}
            >
              {p.path === "/" ? "Home" : p.path.slice(1).split("-").join(" ")}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
