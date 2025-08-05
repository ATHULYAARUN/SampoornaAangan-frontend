import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  Settings, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Play,
  Clock,
  Shield,
  Zap,
  Target,
  Award,
  Baby,
  Heart,
  BarChart3,
  FileText,
  Smartphone,
  Cloud
} from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      step: 1,
      icon: UserPlus,
      title: "Sign Up & Setup",
      subtitle: "Get started in minutes",
      description: "Create your account and set up your anganwadi profile with our guided onboarding process.",
      details: [
        "Quick 3-minute registration process",
        "Anganwadi profile setup with location",
        "User role assignment and permissions",
        "Initial configuration and preferences"
      ],
      time: "5 minutes",
      color: "primary"
    },
    {
      step: 2,
      icon: Settings,
      title: "Configure Your System",
      subtitle: "Customize to your needs",
      description: "Tailor the platform to match your anganwadi's specific requirements and workflows.",
      details: [
        "Add children and family profiles",
        "Set up health and nutrition protocols",
        "Configure automated notifications",
        "Import existing data seamlessly"
      ],
      time: "15 minutes",
      color: "secondary"
    },
    {
      step: 3,
      icon: Users,
      title: "Engage Your Team",
      subtitle: "Collaborate effectively",
      description: "Invite team members and establish collaborative workflows for better anganwadi management.",
      details: [
        "Invite ASHA volunteers and workers",
        "Add anganwadi staff members",
        "Set role-based permissions",
        "Provide team training and support"
      ],
      time: "10 minutes",
      color: "primary"
    },
    {
      step: 4,
      icon: TrendingUp,
      title: "Track & Improve",
      subtitle: "Monitor and optimize",
      description: "Use powerful analytics and reporting tools to monitor progress and improve outcomes.",
      details: [
        "Real-time child development tracking",
        "Automated report generation",
        "Data-driven trend analysis",
        "Continuous process optimization"
      ],
      time: "Ongoing",
      color: "secondary"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Quick Setup",
      description: "Get started in under 30 minutes"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Government-grade security standards"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Works on any device, anywhere"
    },
    {
      icon: Cloud,
      title: "Cloud Based",
      description: "Automatic backups and updates"
    }
  ];

  const benefits = [
    {
      icon: Baby,
      title: "Better Child Care",
      description: "Improved tracking and monitoring of child development milestones"
    },
    {
      icon: Heart,
      title: "Enhanced Health",
      description: "Comprehensive health and nutrition management system"
    },
    {
      icon: BarChart3,
      title: "Data Insights",
      description: "Powerful analytics for informed decision making"
    },
    {
      icon: FileText,
      title: "Easy Reporting",
      description: "Automated reports for government compliance"
    }
  ];

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Target className="w-4 h-4" />
              <span>Simple 4-Step Process</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
              How It <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Works</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Get started with SampoornaAngan in four simple steps and transform 
              your anganwadi management in under 30 minutes.
            </p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mt-12"
            >
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-primary-600" />
                <span className="font-medium">30 minutes setup</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Zap className="w-5 h-5 text-primary-600" />
                <span className="font-medium">Instant activation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Award className="w-5 h-5 text-primary-600" />
                <span className="font-medium">Government approved</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our proven methodology to implement SampoornaAngan in your anganwadi
            </p>
          </motion.div>

          {/* Steps Timeline */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200"></div>
            
            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-12 relative`}
                >
                  {/* Step Number Circle */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white border-4 border-primary-300 rounded-full flex items-center justify-center z-10">
                    <span className="text-2xl font-bold text-primary-600">{step.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 lg:w-1/2">
                    <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-200 ${
                      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                    }`}>
                      {/* Mobile Step Number */}
                      <div className="lg:hidden flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-lg">{step.step}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                          <Clock className="w-4 h-4" />
                          <span>{step.time}</span>
                        </div>
                      </div>

                      {/* Desktop Time Badge */}
                      <div className="hidden lg:flex items-center gap-2 bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                        <Clock className="w-4 h-4" />
                        <span>{step.time}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                        {step.title}
                      </h3>
                      <p className="text-primary-600 font-medium mb-4">
                        {step.subtitle}
                      </p>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <motion.li 
                            key={detailIndex} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.2) + (detailIndex * 0.1), duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Visual */}
                  <div className="flex-1 lg:w-1/2 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                      className={`w-80 h-80 bg-gradient-to-br ${
                        step.color === 'primary' 
                          ? 'from-primary-100 to-primary-200' 
                          : 'from-secondary-100 to-secondary-200'
                      } rounded-3xl flex items-center justify-center shadow-lg border border-gray-200 relative overflow-hidden`}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full"></div>
                        <div className="absolute bottom-8 left-6 w-6 h-6 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 left-4 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      
                      <step.icon className={`w-32 h-32 ${
                        step.color === 'primary' ? 'text-primary-600' : 'text-secondary-600'
                      } relative z-10`} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose SampoornaAngan?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for anganwadi management with government standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Transform Your Anganwadi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the immediate impact on child care and administrative efficiency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 border border-white rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 border border-white rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Start Today</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of anganwadi workers who are already using SampoornaAngan 
              to provide better care for children and families.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  <span className="text-lg">Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 flex items-center gap-3"
              >
                <Play className="w-5 h-5" />
                <span className="text-lg">Watch Demo</span>
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-8 pt-12 text-white/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;