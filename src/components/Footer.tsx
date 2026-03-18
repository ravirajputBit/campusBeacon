import { MapPin, Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Map", href: "/map" },
    { name: "Contact", href: "mailto:ravikumar.dev404@gmail.com" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/ravirajputBit", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/ravirajputbit", icon: Linkedin },
  ];

  return (
    <footer className="bg-slate-900/50 text-white border-t border-white/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">Campus Beacon</h2>
            <p className="text-sm text-gray-400 leading-relaxed">Smart campus navigation and safety platform for modern educational environments.</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-all hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Developer Links</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-lg"
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">My Contacts</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:ravikumar.dev404@gmail.com" className="hover:text-white transition-colors">ravikumar.dev404@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="group-hover:text-white transition-colors">Galgotias University, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Campus Beacon. Built with ❤️ for Students.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
