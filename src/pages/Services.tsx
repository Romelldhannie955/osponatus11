import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Settings, 
  MessageSquare, 
  Calendar, 
  Send, 
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Target,
      title: 'AI Lead Capture',
      description: 'Transform website visitors into qualified leads with intelligent forms, behavioral tracking, and automated qualification processes.',
      features: [
        'Smart form optimization with A/B testing',
        'Real-time lead scoring and qualification',
        'Behavioral tracking and analytics',
        'Automated lead nurturing sequences',
        'Multi-channel capture integration',
        'GDPR compliant data collection'
      ],
      benefits: [
        '340% average increase in lead quality',
        '60% reduction in cost per acquisition',
        '24/7 automated lead processing',
        'Seamless CRM integration'
      ],
      pricing: 'Starting at $297/month'
    },
    {
      icon: Settings,
      title: 'CRM Integration & Automation',
      description: 'Seamlessly connect your existing systems with AI-enhanced workflows, data synchronization, and intelligent automation.',
      features: [
        'Salesforce & HubSpot native integration',
        'Custom API development and connection',
        'Real-time data synchronization',
        'Automated workflow creation',
        'Lead routing and assignment',
        'Performance analytics dashboard'
      ],
      benefits: [
        '95% reduction in manual data entry',
        'Instant lead distribution',
        'Complete visibility across teams',
        'Improved data accuracy and consistency'
      ],
      pricing: 'Starting at $497/month'
    },
    {
      icon: MessageSquare,
      title: 'AI Customer Service & Ticketing',
      description: 'Intelligent ticket management system with automated routing, priority classification, and AI-powered response suggestions.',
      features: [
        'Smart ticket routing and assignment',
        'AI-powered response generation',
        'Priority classification algorithms',
        'Multi-channel support integration',
        'Performance analytics and reporting',
        'Knowledge base integration'
      ],
      benefits: [
        '80% faster response times',
        '65% reduction in support costs',
        '24/7 automated customer assistance',
        '95% customer satisfaction rate'
      ],
      pricing: 'Starting at $397/month'
    },
    {
      icon: Calendar,
      title: 'Automated Appointment Setting',
      description: 'AI assistant that handles booking, rescheduling, and confirmations with intelligent calendar optimization.',
      features: [
        'Intelligent calendar scheduling',
        'Automated booking confirmations',
        'Smart rescheduling capabilities',
        'Timezone optimization',
        'Multiple calendar integration',
        'No-show prediction and prevention'
      ],
      benefits: [
        '95% appointment attendance rate',
        '75% reduction in scheduling time',
        'Elimination of double bookings',
        'Increased revenue per appointment'
      ],
      pricing: 'Starting at $197/month',
      isPopular: true
    },
    {
      icon: Send,
      title: 'AI-Powered Outreach Automation',
      description: 'Personalized multi-channel campaigns with intelligent timing, content optimization, and advanced analytics.',
      features: [
        'Personalized email sequences',
        'Multi-channel outreach (email, SMS, social)',
        'Intelligent send time optimization',
        'A/B testing and optimization',
        'Behavioral trigger automation',
        'Advanced analytics and reporting'
      ],
      benefits: [
        '450% increase in response rates',
        '320% improvement in conversion',
        'Automated follow-up sequences',
        'Personalization at scale'
      ],
      pricing: 'Starting at $597/month'
    },
    {
      icon: Globe,
      title: 'AI Website Building & Optimization',
      description: 'Conversion-optimized websites with integrated marketing automation, AI content generation, and performance tracking.',
      features: [
        'AI-powered website generation',
        'Conversion rate optimization',
        'Mobile-responsive design',
        'SEO optimization and content',
        'Integrated marketing automation',
        'Performance analytics tracking'
      ],
      benefits: [
        '240% increase in conversion rates',
        '85% faster website deployment',
        'Built-in marketing automation',
        'Continuous optimization'
      ],
      pricing: 'Starting at $797/month'
    }
  ];

  return (
    <div className="bg-soft-white dark:bg-navy-blue transition-colors duration-200 pt-16">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-teal/10 text-vibrant-teal mb-6">
            <Zap className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Complete AI Marketing Suite</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-blue dark:text-white mb-6">
            Comprehensive AI Solutions for
            <span className="block text-vibrant-teal">Modern Marketing</span>
          </h1>
          
          <p className="text-xl text-slate-gray dark:text-slate-gray mb-8 leading-relaxed">
            Transform every aspect of your marketing operations with our integrated suite of 
            AI-powered tools designed for maximum efficiency and growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`relative bg-soft-white dark:bg-navy-blue/50 rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl ${
                  service.isPopular 
                    ? 'border-warm-gold shadow-lg' 
                    : 'border-slate-gray/20 hover:border-vibrant-teal/30'
                }`}
              >
                {/* Popular Badge */}
                {service.isPopular && (
                  <div className="absolute -top-3 left-6">
                    <div className="bg-warm-gold text-navy-blue px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      service.isPopular ? 'bg-warm-gold/20' : 'bg-vibrant-teal/10'
                    }`}>
                      <service.icon className={`h-8 w-8 ${
                        service.isPopular ? 'text-warm-gold' : 'text-vibrant-teal'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-navy-blue dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <div className="text-sm font-medium text-vibrant-teal">
                        {service.pricing}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-gray dark:text-slate-gray mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-navy-blue dark:text-white mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-gray dark:text-slate-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-navy-blue dark:text-white mb-3">Proven Results:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-vibrant-teal" />
                        <span className="text-slate-gray dark:text-slate-gray">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 group ${
                    service.isPopular
                      ? 'bg-warm-gold hover:bg-warm-gold/90 text-navy-blue'
                      : 'bg-vibrant-teal hover:bg-vibrant-teal/90 text-white'
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-slate-gray/5 dark:bg-navy-blue/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-blue dark:text-white mb-6">
            Our Implementation Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {[
              { step: '01', title: 'Consultation', description: 'Free analysis of your current systems and goals' },
              { step: '02', title: 'Strategy', description: 'Custom AI automation roadmap development' },
              { step: '03', title: 'Implementation', description: 'Seamless integration with your existing tools' },
              { step: '04', title: 'Optimization', description: 'Continuous monitoring and performance improvement' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-vibrant-teal text-white font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-navy-blue dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-gray dark:text-slate-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-blue dark:text-white mb-6">
            Ready to Scale Your Marketing Operations?
          </h2>
          <p className="text-xl text-slate-gray dark:text-slate-gray mb-8">
            Book a free consultation to discover which AI solutions will drive the biggest impact for your business.
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
              href="mailto:hello@osponatus.com"
              className="border-2 border-vibrant-teal text-vibrant-teal hover:bg-vibrant-teal hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;