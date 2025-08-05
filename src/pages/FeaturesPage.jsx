import React from 'react';
import { motion } from 'framer-motion';
import { 
  Baby, 
  Heart, 
  Users, 
  BookOpen, 
  Shield, 
  TrendingUp,
  Calendar,
  FileText,
  Bell,
  Smartphone,
  Cloud,
  Lock
} from 'lucide-react';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: Baby,
      title: "Child Development Tracking",
      description: "Comprehensive monitoring of growth, health, and developmental milestones",
      features: [
        "Growth chart tracking",
        "Vaccination schedules",
        "Health checkup records",
        "Developmental assessments"
      ]
    },
    {
      icon: Heart,
      title: "Health Management",
      description: "Complete health records and medical history management",
      features: [
        "Medical history tracking",
        "Nutrition monitoring",
        "Immunization records",
        "Health alerts & reminders"
      ]
    },
    {
      icon: Users,
      title: "Family Engagement",
      description: "Tools to connect with families and improve community participation",
      features: [
        "Parent communication portal",
        "Home visit scheduling",
        "Family feedback system",
        "Community event management"
      ]
    },
    {
      icon: BookOpen,
      title: "Educational Progress",
      description: "Track learning outcomes and educational activities",
      features: [
        "Learning milestone tracking",
        "Activity planning",
        "Progress reports",
        "Educational resource library"
      ]
    },
    {
      icon: TrendingUp,
      title: "Analytics & Reports",
      description: "Data-driven insights for better decision making",
      features: [
        "Performance dashboards",
        "Custom report generation",
        "Trend analysis",
        "Compliance reporting"
      ]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Bank-level security with full compliance standards",
      features: [
        "End-to-end encryption",
        "Role-based access control",
        "Audit trails",
        "GDPR compliance"
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated scheduling for checkups, visits, and activities"
    },
    {
      icon: FileText,
      title: "Digital Documentation",
      description: "Paperless record keeping with easy document management"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Automated alerts for important events and deadlines"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized for mobile devices with offline capabilities"
    },
    {
      icon: Cloud,
      title: "Cloud Backup",
      description: "Automatic data backup with 99.9% uptime guarantee"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "Complete data privacy with local data residency options"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-display">
              Powerful <span className="text-gradient">Features</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to manage anganwadis efficiently and provide 
              the best care for children and families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card p-8 hover-lift hover-glow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
              Additional <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              More features designed to make anganwadi management seamless and efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover-lift"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Start your free trial today and see how SampoornaAngan can 
              transform your anganwadi management.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg bg-white text-primary hover:bg-white/90"
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;