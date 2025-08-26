import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  MessageSquare, 
  Calendar, 
  Send, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

const Home: React.FC = () => {
  const services = [
    {
      icon: Target,
      title: 'Lead Capture',
      description: 'Intelligent AI-powered forms and landing pages that convert visitors into qualified leads with advanced targeting.',
      features: ['Smart form optimization', 'Real-time lead scoring', 'Automated follow-up sequences', 'Multi-channel capture']
    },
    {
      icon: Settings,
      title: 'CRM Integration',
      description: 'Seamlessly connect your existing CRM systems with AI-enhanced data management and automated workflows.',
      features: ['Salesforce integration', 'HubSpot connectivity', 'Data synchronization', 'Custom API connections']
    },
    {
      icon: MessageSquare,
      title: 'Ticket Management',
      description: 'AI-driven customer service ticketing system with intelligent routing and automated response generation.',
      features: ['Smart ticket routing', 'Automated responses', 'Priority classification', 'Performance analytics']
    },
    {
      icon: Calendar,
      title: 'Appointment Setting',
      description: 'Automated appointment scheduling with AI assistant that handles booking, rescheduling, and confirmations.',
      features: ['Intelligent scheduling', 'Calendar integration', 'Automated reminders', 'Timezone optimization'],
      isHighlighted: true
    },
    {
      icon: Send,
      title: 'Automation Outreach',
      description: 'Personalized email and message campaigns powered by AI for maximum engagement and conversion rates.',
      features: ['Personalized messaging', 'Multi-channel outreach', 'A/B testing', 'Performance tracking']
    },
    {
      icon: Globe,
      title: 'Website Building',
      description: 'AI-assisted website creation with conversion optimization and integrated marketing automation tools.',
      features: ['AI website generation', 'Conversion optimization', 'Mobile responsive', 'SEO optimization']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechFlow Solutions',
      role: 'VP of Marketing',
      content: 'Osponatus transformed our lead generation process. We saw a 340% increase in qualified leads within the first quarter.'
    },
    {
      name: 'Michael Chen',
      company: 'Growth Dynamics',
      role: 'CEO',
      content: 'The AI-powered automation saved our team 25 hours per week while improving our customer response time by 80%.'
    },
    {
      name: 'Emily Rodriguez',
      company: 'Scale Ventures',
      role: 'Operations Director',
      content: 'Their appointment setting system is incredible. We went from 40% no-shows to 95% attendance rate in just two months.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Businesses Automated', icon: BarChart3 },
    { number: '340%', label: 'Average Lead Increase', icon: Target },
    { number: '25hrs', label: 'Weekly Time Saved', icon: Zap },
    { number: '95%', label: 'Client Satisfaction', icon: Star }
  ];

  return (
    <div className="bg-soft-white dark:bg-navy-blue transition-colors duration-200">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-teal/10 text-vibrant-teal mb-6">
              <Zap className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">AI-Powered Marketing Automation</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-navy-blue dark:text-white mb-6">
              Transform Your Business with
              <span className="block text-vibrant-teal">Intelligent Automation</span>
            </h1>
            
            <p className="text-xl text-slate-gray dark:text-slate-gray max-w-3xl mx-auto mb-8 leading-relaxed">
              Osponatus leverages cutting-edge AI to streamline your marketing operations, 
              capture high-quality leads, and automate customer interactions for unprecedented growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="bg-vibrant-teal hover:bg-vibrant-teal/90 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 group"
              >
                <span>Start Automating Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/services"
                className="border-2 border-navy-blue dark:border-white text-navy-blue dark:text-white hover:bg-navy-blue hover:text-white dark:hover:bg-white dark:hover:text-navy-blue px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy-blue dark:bg-navy-blue/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-vibrant-teal/20">
                    <stat.icon className="h-6 w-6 text-vibrant-teal" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-gray text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue dark:text-white mb-4">
              AI-Powered Marketing Solutions
            </h2>
            <p className="text-xl text-slate-gray dark:text-slate-gray max-w-2xl mx-auto">
              Comprehensive automation tools designed to scale your business operations 
              and maximize your marketing ROI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                isHighlighted={service.isHighlighted}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-slate-gray/5 dark:bg-navy-blue/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue dark:text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-gray dark:text-slate-gray max-w-2xl mx-auto">
              See how businesses are transforming their operations with Osponatus AI solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-soft-white dark:bg-navy-blue/50 p-6 rounded-xl border border-warm-gold/20 relative">
                {/* Gold accent border */}
                <div className="absolute top-0 left-6 w-12 h-1 bg-warm-gold rounded-full"></div>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-warm-gold fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-gray dark:text-slate-gray mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t border-slate-gray/10 pt-4">
                  <div className="font-semibold text-navy-blue dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-gray">{testimonial.role}</div>
                  <div className="text-sm text-vibrant-teal font-medium">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue dark:text-white mb-6">
            Ready to Revolutionize Your Marketing?
          </h2>
          <p className="text-xl text-slate-gray dark:text-slate-gray mb-8">
            Join hundreds of businesses already scaling with AI-powered automation. 
            Start your transformation today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-vibrant-teal hover:bg-vibrant-teal/90 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200 group"
            >
              <span>Book Free Consultation</span>
              <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <a
              href="tel:+15551234567"
              className="border-2 border-vibrant-teal text-vibrant-teal hover:bg-vibrant-teal hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;