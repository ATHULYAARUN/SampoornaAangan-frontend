import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  Settings,
  Users,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Cog,
  Database,
  BookOpen,
  Heart,
  TrendingUp,
  Play,
  Download,
  ArrowRight,
  Star,
  Award,
  Target
} from 'lucide-react';

const ProcessPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const steps = [
    {
      number: "01",
      title: "Sign Up & Setup",
      subtitle: "Get started in minutes",
      duration: "5 minutes",
      description: "Create your account and set up your anganwadi profile with our guided onboarding process.",
      icon: UserPlus,
      color: "pink",
      features: [
        "Quick 3-minute registration process",
        "Anganwadi profile setup with location",
        "User role assignment and permissions",
        "Initial configuration and preferences"
      ],
      illustration: "signup"
    },
    {
      number: "02", 
      title: "Data Migration",
      subtitle: "Import existing records",
      duration: "15 minutes",
      description: "Seamlessly import your existing child and family records into the system.",
      icon: Database,
      color: "blue",
      features: [
        "Bulk import of child records",
        "Family information migration",
        "Health record transfer",
        "Data validation and cleanup"
      ],
      illustration: "data"
    },
    {
      number: "03",
      title: "Staff Training",
      subtitle: "Empower your team",
      duration: "30 minutes", 
      description: "Train your anganwadi workers and staff on using the system effectively.",
      icon: BookOpen,
      color: "green",
      features: [
        "Interactive training modules",
        "Role-based feature walkthrough",
        "Practice environment access",
        "Ongoing support resources"
      ],
      illustration: "training"
    },
    {
      number: "04",
      title: "Go Live",
      subtitle: "Start transforming lives",
      duration: "Immediate",
      description: "Begin using SampoornaAngan to provide better care and track progress.",
      icon: TrendingUp,
      color: "purple",
      features: [
        "Full system activation",
        "Real-time monitoring dashboard",
        "Progress tracking and reporting",
        "Continuous improvement support"
      ],
      illustration: "live"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      pink: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-600",
        icon: "text-pink-500",
        gradient: "from-pink-500 to-pink-600"
      },
      blue: {
        bg: "bg-blue-50", 
        border: "border-blue-200",
        text: "text-blue-600",
        icon: "text-blue-500",
        gradient: "from-blue-500 to-blue-600"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200", 
        text: "text-green-600",
        icon: "text-green-500",
        gradient: "from-green-500 to-green-600"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-600", 
        icon: "text-purple-500",
        gradient: "from-purple-500 to-purple-600"
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">SampoornaAngan Implementation Demo</h3>
                <button
                  onClick={() => setShowVideo(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-primary mb-2">Demo Video</h4>
                  <p className="text-primary-600">
                    Watch how easy it is to implement SampoornaAngan in your anganwadi
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors duration-200"
                  >
                    Play Demo
                  </motion.button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-black">5 Minutes</div>
                  <div className="text-sm text-gray-600">Quick Overview</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-black">Real Demo</div>
                  <div className="text-sm text-gray-600">Actual Interface</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-black">Step by Step</div>
                  <div className="text-sm text-gray-600">Complete Process</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-white via-primary-50/30 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                <span>Proven Implementation Method</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                Simple <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">4-Step Process</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Follow our proven methodology to implement SampoornaAngan in your anganwadi
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideo(true)}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors duration-200"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo Video
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  <Download className="w-5 h-5" />
                  Download Guide
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "< 1 Hour", label: "Total Setup Time", icon: Clock },
              { number: "4 Steps", label: "Simple Process", icon: Target },
              { number: "99%", label: "Success Rate", icon: Award },
              { number: "24/7", label: "Support Available", icon: Shield }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {React.createElement(stat.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <div className="text-2xl font-bold text-black mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Step Navigator */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Interactive Process Overview
            </h2>
            <p className="text-lg text-gray-600">
              Click on any step to learn more about the implementation process
            </p>
          </motion.div>

          {/* Step Navigator */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              const isActive = activeStep === index;

              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    isActive
                      ? `${colors.bg} ${colors.border} shadow-lg`
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? `bg-gradient-to-r ${colors.gradient} text-white`
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {React.createElement(step.icon, { className: "w-5 h-5" })}
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isActive ? colors.text : 'text-gray-500'
                    } ${isActive ? colors.bg : 'bg-gray-100'}`}>
                      {step.duration}
                    </div>
                  </div>
                  <h3 className={`font-semibold mb-1 ${isActive ? 'text-black' : 'text-gray-700'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${isActive ? colors.text : 'text-gray-500'}`}>
                    {step.subtitle}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Active Step Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getColorClasses(steps[activeStep].color).gradient} flex items-center justify-center text-white font-bold`}>
                      {steps[activeStep].number}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black">{steps[activeStep].title}</h3>
                      <p className={`text-lg font-medium ${getColorClasses(steps[activeStep].color).text}`}>
                        {steps[activeStep].subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {steps[activeStep].description}
                  </p>

                  <div className="space-y-3">
                    {steps[activeStep].features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className={`w-5 h-5 ${getColorClasses(steps[activeStep].color).icon} flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className={`w-80 h-80 ${getColorClasses(steps[activeStep].color).bg} ${getColorClasses(steps[activeStep].color).border} border-2 rounded-3xl flex items-center justify-center relative overflow-hidden`}>
                    {React.createElement(steps[activeStep].icon, {
                      className: `w-24 h-24 ${getColorClasses(steps[activeStep].color).icon}`
                    })}

                    {/* Animated decorative elements */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${getColorClasses(steps[activeStep].color).gradient} rounded-full opacity-20`}
                    ></motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br ${getColorClasses(steps[activeStep].color).gradient} rounded-full opacity-30`}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Detailed Implementation Steps
            </h2>
            <p className="text-lg text-gray-600">
              Complete breakdown of our proven 4-step methodology
            </p>
          </motion.div>

          <div className="space-y-20">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                        {step.number}
                      </div>
                      <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-medium`}>
                        <Clock className="w-4 h-4" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold text-black mb-2">{step.title}</h3>
                      <p className={`text-lg font-medium ${colors.text} mb-4`}>{step.subtitle}</p>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                    </div>

                    <div className="space-y-3">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className={`w-5 h-5 ${colors.icon} flex-shrink-0`} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Illustration */}
                  <div className="flex-1 flex justify-center">
                    <div className={`w-80 h-80 ${colors.bg} ${colors.border} border-2 rounded-3xl flex items-center justify-center relative overflow-hidden`}>
                      {React.createElement(step.icon, {
                        className: `w-24 h-24 ${colors.icon}`
                      })}

                      {/* Decorative elements */}
                      <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-full opacity-20`}></div>
                      <div className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-full opacity-30`}></div>
                      <div className={`absolute top-1/2 left-4 w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-full opacity-25`}></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Implementation Timeline
            </h2>
            <p className="text-lg text-gray-600">
              Complete setup in under 1 hour with our streamlined process
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600 rounded-full"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                { time: "0-5 min", title: "Account Setup", status: "complete" },
                { time: "5-20 min", title: "Data Migration", status: "complete" },
                { time: "20-50 min", title: "Staff Training", status: "current" },
                { time: "50+ min", title: "Go Live", status: "upcoming" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className={`inline-block p-6 rounded-2xl shadow-lg ${
                      item.status === 'complete' ? 'bg-green-50 border border-green-200' :
                      item.status === 'current' ? 'bg-blue-50 border border-blue-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className={`text-sm font-medium mb-2 ${
                        item.status === 'complete' ? 'text-green-600' :
                        item.status === 'current' ? 'text-blue-600' :
                        'text-gray-500'
                      }`}>
                        {item.time}
                      </div>
                      <div className="text-lg font-semibold text-black">{item.title}</div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg z-10 ${
                    item.status === 'complete' ? 'bg-green-500' :
                    item.status === 'current' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`}></div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real anganwadis that transformed using our 4-step process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kottayam Anganwadi Center",
                location: "Kerala",
                improvement: "50% faster record keeping",
                time: "Implemented in 45 minutes",
                quote: "The process was so simple, we were up and running the same day!",
                avatar: "KA"
              },
              {
                name: "Thiruvananthapuram Center",
                location: "Kerala",
                improvement: "90% parent satisfaction",
                time: "Setup completed in 35 minutes",
                quote: "Parents love the real-time updates about their children.",
                avatar: "TC"
              },
              {
                name: "Ernakulam Anganwadi",
                location: "Kerala",
                improvement: "100% digital records",
                time: "Full migration in 40 minutes",
                quote: "Going paperless was easier than we ever imagined.",
                avatar: "EA"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {story.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.location}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">{story.improvement}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600">{story.time}</span>
                  </div>
                </div>

                <blockquote className="text-gray-700 italic">
                  "{story.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Checklist */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Implementation Checklist
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to successfully implement SampoornaAngan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prerequisites */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">Prerequisites</h3>
              </div>

              <div className="space-y-4">
                {[
                  "Basic smartphone or computer access",
                  "Internet connection (mobile data works)",
                  "Existing child and family records",
                  "Anganwadi worker contact details",
                  "Government registration documents"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What You'll Get */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">What You'll Get</h3>
              </div>

              <div className="space-y-4">
                {[
                  "Complete digital anganwadi management",
                  "Real-time child development tracking",
                  "Automated reporting and analytics",
                  "Parent engagement platform",
                  "24/7 technical support"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our implementation process
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How long does the complete setup take?",
                answer: "The entire process takes less than 1 hour. Most anganwadis complete setup in 45-50 minutes including training.",
                icon: Clock
              },
              {
                question: "Do I need technical expertise to implement SampoornaAngan?",
                answer: "No technical expertise required! Our guided process is designed for anganwadi workers with basic smartphone/computer skills.",
                icon: Users
              },
              {
                question: "What if I have existing records in paper format?",
                answer: "Our data migration step includes tools to easily digitize paper records. You can also gradually migrate data over time.",
                icon: Database
              },
              {
                question: "Is training provided for all staff members?",
                answer: "Yes! Step 3 includes comprehensive training for all staff members with role-specific modules and ongoing support.",
                icon: BookOpen
              },
              {
                question: "What support is available after going live?",
                answer: "We provide 24/7 support, regular check-ins, and continuous updates to ensure smooth operation of your anganwadi.",
                icon: Shield
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {React.createElement(faq.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-primary transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-black mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our implementation experts are here to help you every step of the way
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors duration-200"
                >
                  Contact Support
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of anganwadi workers who have successfully implemented SampoornaAngan using our proven 4-step process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
                >
                  Schedule Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProcessPage;
