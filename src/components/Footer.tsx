import React from 'react';
import { Bot, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-vibrant-teal/20">
                <Bot className="h-6 w-6 text-vibrant-teal" />
              </div>
              <span className="text-xl font-bold">Osponatus</span>
            </div>
            <p className="text-slate-gray mb-6 max-w-md">
              Revolutionizing B2B marketing through AI-driven automation, lead capture, 
              and customer relationship management. Transform your business operations with 
              intelligent solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-gray hover:text-vibrant-teal transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-gray hover:text-vibrant-teal transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-gray">
              <li><a href="#" className="hover:text-vibrant-teal transition-colors duration-200">Lead Capture</a></li>
              <li><a href="#" className="hover:text-vibrant-teal transition-colors duration-200">CRM Integration</a></li>
              <li><a href="#" className="hover:text-vibrant-teal transition-colors duration-200">Ticket Management</a></li>
              <li><a href="#" className="hover:text-vibrant-teal transition-colors duration-200">Appointment Setting</a></li>
              <li><a href="#" className="hover:text-vibrant-teal transition-colors duration-200">Automation Outreach</a></li>
              <li><a href="#" className="hover:text-vibrant-teal transition-colors duration-200">Website Building</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-slate-gray">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-vibrant-teal" />
                <span>hello@osponatus.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-vibrant-teal" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-vibrant-teal" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-gray/20 mt-8 pt-8 text-center text-slate-gray">
          <p>&copy; 2025 Osponatus. All rights reserved. Powered by AI innovation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;