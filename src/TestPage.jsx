import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">CSS Test Page</h1>
        
        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Card 1</h2>
            <p className="text-gray-600 mb-4">This is a test card to verify CSS is working.</p>
            <button className="btn-primary">Primary Button</button>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Card 2</h2>
            <p className="text-gray-600 mb-4">Another test card with different content.</p>
            <button className="btn-secondary">Secondary Button</button>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Card 3</h2>
            <p className="text-gray-600 mb-4">Third test card to check layout.</p>
            <input type="text" className="input-field" placeholder="Test input field" />
          </div>
        </div>
        
        {/* Test Colors */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Color Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-primary-500 text-white p-4 rounded-lg text-center">Primary</div>
            <div className="bg-green-500 text-white p-4 rounded-lg text-center">Green</div>
            <div className="bg-red-500 text-white p-4 rounded-lg text-center">Red</div>
            <div className="bg-orange-500 text-white p-4 rounded-lg text-center">Orange</div>
            <div className="bg-purple-500 text-white p-4 rounded-lg text-center">Purple</div>
          </div>
        </div>
        
        {/* Test Typography */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Typography Test</h2>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Display Font (Poppins)</h1>
          <h2 className="text-2xl font-sans font-semibold text-gray-800 mb-2">Sans Font (Inter)</h2>
          <p className="text-gray-600 mb-4">This is regular paragraph text using the Inter font family.</p>
          <p className="text-sm text-gray-500">This is smaller text in gray color.</p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;