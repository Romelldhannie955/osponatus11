import React, { useState } from 'react';
import { 
  Calendar,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Users,
  Zap
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
    budget: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const services = [
    'Lead Capture & Automation',
    'CRM Integration',
    'Customer Service & Ticketing',
    'Appointment Setting',
    'Automation Outreach',
    'Website Building',
    'Complete AI Marketing Suite',
    'Custom Solution'
  ];

  const budgetRanges = [
    'Under £6,000/month',
    '£6,000 - £16,000/month',
    '£16,000 - £51,000/month',
    '£51,000+/month',
    'Let\'s discuss'
  ];

  if (isSubmitted) {
    return (
      <div className="bg-soft-white dark:bg-navy-blue transition-colors duration-200 pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vibrant-teal/10 mb-6">
              <CheckCircle className="h-8 w-8 text-vibrant-teal" />
            </div>
            <h1 className="text-4xl font-bold text-navy-blue dark:text-white mb-4">
              Thank You for Your Interest!
            </h1>
            <p className="text-xl text-slate-gray dark:text-slate-gray mb-8">
              We've received your request and our AI automation experts will contact you within 24 hours 
              to discuss how we can transform your marketing operations.
            </p>
          </div>
          
          <div className="bg-vibrant-teal/5 dark:bg-vibrant-teal/10 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-navy-blue dark:text-white mb-4">What happens next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-vibrant-teal" />
                <span className="text-slate-gray dark:text-slate-gray">Response within 24 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-vibrant-teal" />
                <span className="text-slate-gray dark:text-slate-gray">Free strategy consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-vibrant-teal" />
                <span className="text-slate-gray dark:text-slate-gray">Custom automation plan</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-gray dark:text-slate-gray">
            <p>Need immediate assistance? Call us at <a href="tel:+15551234567" className="text-vibrant-teal font-semibold">+1 (555) 123-4567</a></p>
            <p>Or email us directly at <a href="mailto:hello@osponatus.com" className="text-vibrant-teal font-semibold">hello@osponatus.com</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-soft-white dark:bg-navy-blue transition-colors duration-200 pt-16">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-teal/10 text-vibrant-teal mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Free Consultation Available</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-blue dark:text-white mb-6">
            Let's Transform Your Business
            <span className="block text-vibrant-teal">Together</span>
          </h1>
          
          <p className="text-xl text-slate-gray dark:text-slate-gray mb-8 leading-relaxed">
            Ready to scale your marketing operations with AI? Our automation experts are here to 
            design a custom solution that drives real results for your business.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-navy-blue dark:bg-navy-blue/80 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-vibrant-teal/20">
                      <Phone className="h-5 w-5 text-vibrant-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+15551234567" className="text-vibrant-teal hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-vibrant-teal/20">
                      <Mail className="h-5 w-5 text-vibrant-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:hello@osponatus.com" className="text-vibrant-teal hover:underline">
                        hello@osponatus.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-vibrant-teal/20">
                      <MapPin className="h-5 w-5 text-vibrant-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-slate-gray">San Francisco, CA</p>
                      <p className="text-slate-gray text-sm">Serving clients worldwide</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-vibrant-teal/20">
                      <Clock className="h-5 w-5 text-vibrant-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-slate-gray text-sm">Mon-Fri: 9:00 AM - 6:00 PM PST</p>
                      <p className="text-slate-gray text-sm">24/7 AI systems monitoring</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-warm-gold/10 border border-warm-gold/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-4 w-4 text-warm-gold" />
                    <span className="font-medium text-warm-gold">Free Consultation</span>
                  </div>
                  <p className="text-sm text-slate-gray">
                    Get a custom AI automation strategy session worth £500 - completely free.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy-blue dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-gray/20 bg-soft-white dark:bg-navy-blue/50 dark:border-slate-gray/30 text-navy-blue dark:text-white placeholder-slate-gray focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/20 transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy-blue dark:text-white mb-2">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-gray/20 bg-soft-white dark:bg-navy-blue/50 dark:border-slate-gray/30 text-navy-blue dark:text-white placeholder-slate-gray focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/20 transition-colors duration-200"
                      placeholder="your@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-navy-blue dark:text-white mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-gray/20 bg-soft-white dark:bg-navy-blue/50 dark:border-slate-gray/30 text-navy-blue dark:text-white placeholder-slate-gray focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/20 transition-colors duration-200"
                      placeholder="Your company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-navy-blue dark:text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-gray/20 bg-soft-white dark:bg-navy-blue/50 dark:border-slate-gray/30 text-navy-blue dark:text-white placeholder-slate-gray focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/20 transition-colors duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-navy-blue dark:text-white mb-2">
                      Service Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-gray/20 bg-soft-white dark:bg-navy-blue/50 dark:border-slate-gray/30 text-navy-blue dark:text-white focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/20 transition-colors duration-200"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-navy-blue dark:text-white mb-2">
                      Monthly Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-gray/20 bg-soft-white dark:bg-navy-blue/50 dark:border-slate-gray/30 text-navy-blue dark:text-white focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/20 transition-colors duration-200"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-blue dark:text-white mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-gray/20 bg-soft-white dark:bg-navy-blue/50 dark:border-slate-gray/30 text-navy-blue dark:text-white placeholder-slate-gray focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/20 transition-colors duration-200"
                    placeholder="Tell us about your current marketing challenges, goals, and how we can help transform your business operations..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-vibrant-teal hover:bg-vibrant-teal/90 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200 group"
                >
                  <span>Book Now - Free Consultation</span>
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <p className="text-xs text-slate-gray dark:text-slate-gray text-center">
                  By submitting this form, you agree to receive communications about our AI automation services. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-slate-gray/5 dark:bg-navy-blue/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-lg bg-vibrant-teal/10 mb-4">
                <Users className="h-6 w-6 text-vibrant-teal" />
              </div>
              <h3 className="font-semibold text-navy-blue dark:text-white mb-2">500+ Companies</h3>
              <p className="text-sm text-slate-gray dark:text-slate-gray">Trust us with their automation</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-lg bg-vibrant-teal/10 mb-4">
                <CheckCircle className="h-6 w-6 text-vibrant-teal" />
              </div>
              <h3 className="font-semibold text-navy-blue dark:text-white mb-2">95% Success Rate</h3>
              <p className="text-sm text-slate-gray dark:text-slate-gray">Client satisfaction guaranteed</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-lg bg-vibrant-teal/10 mb-4">
                <Zap className="h-6 w-6 text-vibrant-teal" />
              </div>
              <h3 className="font-semibold text-navy-blue dark:text-white mb-2">24hr Response</h3>
              <p className="text-sm text-slate-gray dark:text-slate-gray">Fast, professional service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;