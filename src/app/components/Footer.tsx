import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "figma:asset/4f9b2203773a9689c008d651e2f702fd99c3ec55.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Bar Plus Services" className="h-20 w-auto" />
              <span className="text-xl">
                <span className="text-amber-500">Bar Plus</span> <span className="text-white">Services</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Outstanding bar and beverage catering for every celebration since
              2017.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/BarPlusServicesTT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-950 border border-white/10 rounded-full flex items-center justify-center hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300"
              >
                <Facebook className="w-5 h-5 text-gray-400 hover:text-amber-500" />
              </a>
              <a
                href="https://www.instagram.com/BarPlusServicesTT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-950 border border-white/10 rounded-full flex items-center justify-center hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-amber-500" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  Corporate Events
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  Weddings
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  Carnival Fetes
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  Private Parties
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#clients"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  Our Clients
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Trinidad and Tobago
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <a href="tel:18687379390" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">+1 (868) 737-9390</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <a href="mailto:barplusservices@gmail.com" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">barplusservices@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-center md:text-left">
              © {currentYear} Bar Plus Services. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-500 hover:text-amber-500 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-amber-500 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}