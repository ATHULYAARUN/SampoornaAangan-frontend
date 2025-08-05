import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Globe,
  TrendingUp,
  Shield
} from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Child-Centric",
      description: "Every feature is designed with the child's wellbeing and development at the center."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "We believe in strengthening communities through better anganwadi management."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We maintain the highest standards of data security and privacy protection."
    },
    {
      icon: TrendingUp,
      title: "Continuous Innovation",
      description: "We constantly evolve our platform based on user feedback and emerging needs."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Children Served", icon: Heart },
    { number: "500+", label: "Anganwadis Connected", icon: Globe },
    { number: "50+", label: "Districts Covered", icon: Target },
    { number: "99.9%", label: "System Uptime", icon: Award }
  ];

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Founder & CEO",
      image: "/api/placeholder/300/300",
      bio: "Former ICDS officer with 15+ years of experience in child development programs."
    },
    {
      name: "Rajesh Kumar",
      role: "CTO",
      image: "/api/placeholder/300/300",
      bio: "Technology leader with expertise in building scalable healthcare solutions."
    },
    {
      name: "Meera Devi",
      role: "Head of Operations",
      image: "/api/placeholder/300/300",
      bio: "Anganwadi worker turned operations expert, ensuring ground-level insights."
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
              About <span className="text-gradient">SampoornaAngan</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to transform anganwadi management through technology, 
              ensuring every child gets the care and attention they deserve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-display">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower anganwadi workers with comprehensive digital tools that streamline 
                operations, improve child development outcomes, and strengthen community engagement. 
                We believe technology should serve humanity, especially in caring for our most 
                vulnerable population - children.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through SampoornaAngan, we aim to bridge the gap between traditional anganwadi 
                operations and modern management practices, ensuring no child is left behind 
                in their developmental journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-display">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To create a world where every anganwadi is equipped with the tools and insights 
                needed to provide exceptional care, education, and nutrition to children. We 
                envision a future where data-driven decisions lead to better health outcomes 
                and stronger communities.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our vision extends beyond technology - we see SampoornaAngan as a catalyst 
                for social change, empowering women, strengthening families, and building 
                healthier communities across India.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core values guide everything we do and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card p-8 text-center hover-lift"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
              Our <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Numbers that reflect our commitment to improving child welfare across India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate individuals working together to make a difference in children's lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="card p-8 text-center hover-lift"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
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
              Join Our Mission
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Be part of the change. Help us transform anganwadi management 
              and improve children's lives across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg bg-white text-primary hover:bg-white/90"
              >
                Get Started Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;