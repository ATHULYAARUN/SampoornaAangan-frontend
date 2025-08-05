import React from 'react';
import { Baby, Users, BarChart3, Heart } from 'lucide-react';

const TestComponent = () => {
  return (
    <div className="min-h-screen hero-gradient hero-pattern">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border mb-6">
              <div className="w-10 h-10 hero-accent rounded-full flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-black">SampoornaAngan</span>
            </div>
            <h1 className="text-4xl font-bold text-black mb-4 font-display">
              Standard Professional UI Design
            </h1>
            <p className="text-xl text-black mb-8">
              Beautiful Pink & White Design System
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Baby, title: "Child Care", color: "primary" },
            { icon: Users, title: "Family", color: "primary" },
            { icon: BarChart3, title: "Analytics", color: "primary" },
            { icon: Heart, title: "Health", color: "primary" }
          ].map((item, index) => (
            <div key={index} className="card hover-lift p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-2">{item.title}</h3>
              <p className="text-black text-sm">Pink & White design</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-pink p-8">
            <h2 className="text-2xl font-bold text-black mb-4">Pink Theme</h2>
            <p className="text-black mb-6">
              Beautiful pink gradients perfect for primary actions and branding.
            </p>
            <div className="space-y-3">
              <button className="btn btn-primary w-full">Primary Pink</button>
              <button className="btn btn-outline w-full">Pink Outline</button>
            </div>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-bold text-black mb-4">White Theme</h2>
            <p className="text-black mb-6">
              Clean white backgrounds for secondary actions and clean design.
            </p>
            <div className="space-y-3">
              <button className="btn btn-secondary w-full">Secondary White</button>
              <button className="btn btn-outline-secondary w-full">White Outline</button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="card-gradient p-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              <span className="text-gradient-combo">Pink & White Design</span>
            </h3>
            <p className="text-black mb-6">
              Beautiful pink and white color combination with professional styling, 
              perfect for anganwadi management systems that need elegance and clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">Beautiful Pink</span>
              <span className="px-4 py-2 bg-white text-black border rounded-lg font-medium">Pure White</span>
              <span className="px-4 py-2 bg-neutral-100 text-black rounded-lg font-medium">Clean Gray</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;