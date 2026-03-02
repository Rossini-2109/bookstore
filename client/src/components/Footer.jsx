import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Branding & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className=" rounded-xl shadow-lg shadow-amber-500/20">
                <img src={logo} alt="Book Store" className="h-6 w-auto object-contain" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white italic">
                BOOK <span className="text-amber-500">STORE</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              Curating stories and stationery for the modern reader. Your premium destination for literature, art tools, and inspiration.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-6">Discovery</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="/books" className="hover:text-amber-500 transition-colors">Book Collection</a></li>
              <li><a href="/stationery" className="hover:text-amber-500 transition-colors">Stationery Studio</a></li>
              <li><a href="/bestseller" className="hover:text-amber-500 transition-colors">Bestsellers</a></li>
              <li><a href="/new-arrivals" className="hover:text-amber-500 transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-6">Get in Touch</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <FaPhoneAlt className="text-amber-500 mt-1" size={14} />
                <span className="text-sm font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-4">
                <FaEnvelope className="text-amber-500 mt-1" size={14} />
                <span className="text-sm font-medium">support@bookstore.com</span>
              </li>
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-amber-500 mt-1" size={14} />
                <span className="text-sm font-medium text-slate-400">
                  Sector 15, Business District,<br /> New Delhi, India 110001
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Enquiry Form */}
          <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-4">Send Enquiry</h3>
            <form className="space-y-3">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-all"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-all"
              />
              <textarea 
                placeholder="Message" 
                rows="2"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-all resize-none"
              ></textarea>
              <button className="w-full bg-amber-500 text-slate-950 font-black py-3 rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2 group">
                Send Message
                <FaPaperPlane size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <p>© 2026 Book Store Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;