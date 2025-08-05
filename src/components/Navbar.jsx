import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Talent", path: "/talent" },
  { label: "Careers", path: "/career" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY || currentY < 10) {
        setIsVisible(true);
      } else if (currentY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const linkClass =
    "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 transition duration-300 px-3 py-2 text-sm font-medium";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-black/80 backdrop-blur-md border-b border-white/10`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(0, 188, 212, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255, 152, 0, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div
          className="cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img
            src="/scj-logo-new.png"
            alt="SCJ Entertainment"
            className="h-12 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.7)] transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={linkClass}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-white focus:outline-none"
          >
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-6 bg-current transition-all ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 space-y-2 bg-black/90 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(link.path);
              }}
              className="block w-full text-left text-white text-base py-2 rounded hover:bg-white/10 px-3 transition"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
