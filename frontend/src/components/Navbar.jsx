import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "../constants/index";
import { NavLink } from "react-router-dom";
import { Sun } from "lucide-react";
// import { Moon } from "lucide-react";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg shadow-md shadow-gray-100 border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="text-xl mr-10">
              Blog
            </a>
            {/* Desktop Menu */}
            <ul className="hidden lg:flex ml-6 space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `text-sm ${
                        isActive
                          ? "text-orange-700 pb-1 border-b-2"
                          : "text-gray-900"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Join Our Team Button for Desktop */}
          <div className="hidden lg:flex justify-center space-x-6 items-center">
            <a href="#" className=" py-2 px-3 hover:text-orange-500">
              <Sun />
            </a>
            <a
              href="/login"
              className="bg-white py-2 px-3  border rounded-2xl hover:border-orange-500 hover:text-orange-600"
            >
              SignIn
            </a>
            <a
              href="/register-user"
              className="bg-white py-2 px-3 border rounded-2xl hover:border-orange-500  hover:text-orange-600"
            >
              SignUp
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
          {/* Mobile Drawer */}
          {mobileDrawerOpen && (
            <div className="fixed top-0 left-0 z-20 bg-white w-full max-h-fit p-10 flex flex-col lg:hidden overflow-y-auto">
              <a href="#" className="bg-white py-2 px-3">
                <Sun />
              </a>
              <div className="flex justify-end w-full mb-6">
                <button onClick={toggleNavbar}>
                  <X className="text-black h-8 w-8" />
                </button>
              </div>
              <ul className="w-full">
                {navItems.map((item) => (
                  <li key={item.label} className="py-4 text-center">
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `block text-xl ${
                          isActive ? "text-orange-700" : "text-gray-900"
                        }`
                      }
                      onClick={toggleNavbar}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center space-x-4 mt-6">
                <a
                  href="login"
                  className=" py-2 px-3 border border-gray-500 rounded-s-lg "
                  dir="ltr"
                >
                  SignIn
                </a>
                <a
                  href="/register-user"
                  className=" py-2 px-3 border border-gray-500 rounded-s-lg "
                  dir="rtl"
                >
                  SignUp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
