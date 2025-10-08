import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  Send,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Heart,
  Smile,
  Frown,
  Meh,
  Award,
  Target,
  TrendingUp,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';

const ParentFeedbackSystem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [feedbackForm, setFeedbackForm] = useState({
    category: '',
    subcategory: '',
    rating: 0,
    subject: '',
    description: '',
    suggestion: '',
    priority: 'medium',
    childName: '',
    workerName: '',
    contactPreference: 'email',
    anonymous: false
  });

  const feedbackCategories = {
    hygiene: {
      label: 'Hygiene & Cleanliness',
      icon: Heart,
      color: 'blue',
      subcategories: [
        'Hand washing facilities',
        'Toilet cleanliness',
        'Drinking water quality',
        'Food preparation hygiene',
        'Classroom cleanliness',
        'Personal hygiene of children',
        'Staff hygiene practices',
        'Kitchen and eating area hygiene',
        'Playground cleanliness'
      ]
    },
    sanitation: {
      label: 'Sanitation Services',
      icon: AlertCircle,
      color: 'green',
      subcategories: [
        'Waste management',
        'Drainage system',
        'Toilet maintenance',
        'Water supply issues',
        'Cleaning frequency',
        'Soap and sanitizer availability',
        'Garbage disposal',
        'Pest control'
      ]
    },
    services: {
      label: 'Anganwadi Services',
      icon: Award,
      color: 'purple',
      subcategories: [
        'Teaching quality',
        'Food quality and taste',
        'Health checkups',
        'Staff behavior with children',
        'Timing & schedule',
        'Communication with parents',
        'Activity programs',
        'Child development tracking',
        'Discipline methods'
      ]
    },
    infrastructure: {
      label: 'Infrastructure & Safety',
      icon: Target,
      color: 'orange',
      subcategories: [
        'Building condition',
        'Classroom facilities',
        'Playground equipment safety',
        'Furniture condition',
        'Lighting',
        'Ventilation',
        'Safety equipment',
        'Child accessibility',
        'Emergency preparedness'
      ]
    }
  };

  const priorityLevels = {
    low: { label: 'Low Priority', color: 'green', description: 'General feedback or minor suggestions' },
    medium: { label: 'Medium Priority', color: 'yellow', description: 'Important improvements needed' },
    high: { label: 'High Priority', color: 'red', description: 'Urgent attention required' }
  };

  const ratingLabels = {
    1: { label: 'Very Poor', icon: Frown, color: 'red' },
    2: { label: 'Poor', icon: Frown, color: 'orange' },
    3: { label: 'Average', icon: Meh, color: 'yellow' },
    4: { label: 'Good', icon: Smile, color: 'blue' },
    5: { label: 'Excellent', icon: Smile, color: 'green' }
  };

  // Load feedback history
  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      
      // Call real API
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Feedback Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Feedback API Error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('✅ Feedback API Response:', result);
      
      if (result.success) {
        setFeedbacks(result.data.feedback || []);
      } else {
        throw new Error(result.message || 'Failed to load feedback');
      }
      
    } catch (error) {
      console.error('❌ Error loading feedback:', error);
      // Fallback to mock data if API fails
      const mockFeedbacks = [
        {
          id: 1,
          category: 'hygiene',
          subcategory: 'Hand washing facilities',
          subject: 'Need more soap dispensers',
          description: 'The hand washing area often runs out of soap. Children have to wait or use water only.',
          rating: 3,
          priority: 'medium',
          status: 'in_progress',
          submittedAt: '2024-01-15T10:30:00Z',
          response: 'Thank you for your feedback. We are working on installing additional soap dispensers.',
          childName: 'Athulya',
          anonymous: false
        },
        {
          id: 2,
          category: 'services',
          subcategory: 'Food quality',
          subject: 'Excellent meal quality',
          description: 'The food served has been consistently good. My child enjoys the meals and comes home satisfied.',
          rating: 5,
          priority: 'low',
          status: 'acknowledged',
          submittedAt: '2024-01-10T14:20:00Z',
          response: 'We appreciate your positive feedback! Our kitchen staff will be delighted to hear this.',
          childName: 'Athulya',
          anonymous: false
        },
        {
          id: 3,
          category: 'sanitation',
          subcategory: 'Toilet maintenance',
          subject: 'Toilet door lock broken',
          description: 'The toilet door lock in the girls restroom is broken and needs immediate repair for privacy.',
          rating: 2,
          priority: 'high',
          status: 'resolved',
          submittedAt: '2024-01-08T09:15:00Z',
          response: 'Issue has been resolved. New locks have been installed and checked.',
          childName: 'Athulya',
          anonymous: false
        }
      ];
      setFeedbacks(mockFeedbacks);
    } finally {
      setLoading(false);
    }
  };

  const quickFeedbackTemplates = [
    {
      id: 'positive_food',
      title: 'Appreciate Food Quality',
      category: 'services',
      subcategory: 'Food quality',
      subject: 'Great food quality today',
      description: 'My child enjoyed today\'s meal and came home satisfied.',
      rating: 5,
      priority: 'low',
      icon: '🍽️'
    },
    {
      id: 'teaching_appreciation',
      title: 'Thank Teacher',
      category: 'services',
      subcategory: 'Teaching quality',
      subject: 'Excellent teaching',
      description: 'My child learned something new today and was very excited to share.',
      rating: 5,
      priority: 'low',
      icon: '👩‍🏫'
    },
    {
      id: 'hygiene_concern',
      title: 'Report Hygiene Issue',
      category: 'hygiene',
      subcategory: '',
      subject: 'Hygiene concern',
      description: '',
      rating: 0,
      priority: 'medium',
      icon: '🧼'
    },
    {
      id: 'safety_concern',
      title: 'Safety Issue',
      category: 'infrastructure',
      subcategory: 'Safety equipment',
      subject: 'Safety concern',
      description: '',
      rating: 0,
      priority: 'high',
      icon: '⚠️'
    },
    {
      id: 'suggest_improvement',
      title: 'Suggest Improvement',
      category: 'services',
      subcategory: '',
      subject: 'Suggestion for improvement',
      description: '',
      rating: 0,
      priority: 'medium',
      icon: '💡'
    }
  ];

  const handleQuickFeedback = (template) => {
    setFeedbackForm({
      ...feedbackForm,
      category: template.category,
      subcategory: template.subcategory,
      subject: template.subject,
      description: template.description,
      rating: template.rating,
      priority: template.priority
    });
    setShowForm(true);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleInputChange = (field, value) => {
    setFeedbackForm(prev => ({
      ...prev,
      [field]: value,
      // Reset subcategory when category changes
      ...(field === 'category' && { subcategory: '' })
    }));
  };

  const handleRatingClick = (rating) => {
    setFeedbackForm(prev => ({ ...prev, rating }));
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    
    if (!feedbackForm.category || !feedbackForm.rating || !feedbackForm.description) {
      alert('Please fill in all required fields (Category, Rating, and Description)');
      return;
    }

    try {
      setSubmitting(true);
      
      // Call real API
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackForm)
      });
      
      console.log('📊 Submit Feedback Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Submit Feedback API Error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('✅ Submit Feedback API Response:', result);
      
      if (result.success) {
        // Reset form
        setFeedbackForm({
          category: '',
          subcategory: '',
          rating: 0,
          subject: '',
          description: '',
          suggestion: '',
          priority: 'medium',
          childName: '',
          workerName: '',
          contactPreference: 'email',
          anonymous: false
        });
        
        setShowForm(false);
        
        alert(
          `Feedback submitted successfully!\n\nTicket Number: ${result.data.ticketNumber}\n\n${result.message}`
        );
        
        // Reload feedback list to show new submission
        await loadFeedbacks();
      } else {
        throw new Error(result.message || 'Failed to submit feedback');
      }
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(`Error submitting feedback: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { label: 'Submitted', color: 'blue', icon: Clock },
      acknowledged: { label: 'Acknowledged', color: 'yellow', icon: CheckCircle },
      in_progress: { label: 'In Progress', color: 'purple', icon: RefreshCw },
      resolved: { label: 'Resolved', color: 'green', icon: CheckCircle }
    };
    
    const config = statusConfig[status] || statusConfig.submitted;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium 
        ${config.color === 'blue' ? 'bg-blue-100 text-blue-800' :
          config.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
          config.color === 'purple' ? 'bg-purple-100 text-purple-800' :
          'bg-green-100 text-green-800'}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const config = priorityLevels[priority];
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
        ${config.color === 'green' ? 'bg-green-100 text-green-800' :
          config.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'}`}>
        {config.label}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesFilter = filter === 'all' || feedback.category === filter;
    const matchesSearch = searchTerm === '' || 
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const renderFeedbackForm = () => (
    <AnimatePresence>
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Submit Feedback</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Feedback Category *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(feedbackCategories).map(([key, category]) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleInputChange('category', key)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          feedbackForm.category === key
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-6 w-6 text-${category.color}-600`} />
                          <span className="font-medium text-gray-800">{category.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subcategory */}
              {feedbackForm.category && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Area
                  </label>
                  <select
                    value={feedbackForm.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select specific area</option>
                    {feedbackCategories[feedbackForm.category].subcategories.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= feedbackForm.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                      <span className="text-xs text-gray-600 mt-1">
                        {ratingLabels[rating]?.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={feedbackForm.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Brief subject line for your feedback"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={feedbackForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Please describe your feedback in detail... 
For example:
- What exactly happened?
- When did you notice this?
- How does it affect your child?
- What would you like to see improved?"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <div className="mt-2 text-sm text-gray-500">
                  💡 Tip: The more specific you are, the better we can address your concerns
                </div>
              </div>

              {/* Suggestion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggestions for Improvement
                </label>
                <textarea
                  value={feedbackForm.suggestion}
                  onChange={(e) => handleInputChange('suggestion', e.target.value)}
                  placeholder="Any suggestions on how we can improve..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Priority and Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={feedbackForm.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Object.entries(priorityLevels).map(([key, priority]) => (
                      <option key={key} value={key}>{priority.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Child Name (if specific to a child)
                  </label>
                  <select
                    value={feedbackForm.childName}
                    onChange={(e) => handleInputChange('childName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select child (optional)</option>
                    <option value="Athulya">Athulya</option>
                    <option value="Akhil">Akhil</option>
                    <option value="Other">Other child</option>
                  </select>
                </div>
              </div>

              {/* Worker Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Staff/Worker Name (if feedback is about specific person)
                </label>
                <input
                  type="text"
                  value={feedbackForm.workerName}
                  onChange={(e) => handleInputChange('workerName', e.target.value)}
                  placeholder="Enter staff member's name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Contact Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method for Response
                </label>
                <div className="flex gap-4">
                  {['email', 'phone', 'in_person'].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        name="contactPreference"
                        value={method}
                        checked={feedbackForm.contactPreference === method}
                        onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                        className="mr-2"
                      />
                      <span className="capitalize">{method.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={feedbackForm.anonymous}
                  onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Submit this feedback anonymously
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin inline mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 inline mr-2" />
                      Submit Feedback
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Feedback & Suggestions</h1>
            <p className="text-gray-600">
              Share your thoughts about hygiene, sanitation, and anganwadi services
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <MessageSquare className="h-5 w-5 inline mr-2" />
            Submit New Feedback
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-700">{feedbacks.length}</div>
                <div className="text-sm text-blue-600">Total Feedback</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-700">
                  {feedbacks.filter(f => f.status === 'submitted' || f.status === 'acknowledged').length}
                </div>
                <div className="text-sm text-yellow-600">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-700">
                  {feedbacks.filter(f => f.status === 'in_progress').length}
                </div>
                <div className="text-sm text-purple-600">In Progress</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-700">
                  {feedbacks.filter(f => f.status === 'resolved').length}
                </div>
                <div className="text-sm text-green-600">Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Feedback Templates */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Feedback</h2>
        <p className="text-gray-600 mb-4">Use these templates for common feedback scenarios:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickFeedbackTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleQuickFeedback(template)}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <div className="text-sm font-medium text-gray-800">{template.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {Object.entries(feedbackCategories).map(([key, category]) => (
                <option key={key} value={key}>{category.label}</option>
              ))}
            </select>
            <button
              onClick={loadFeedbacks}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Parent Feedback Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border border-purple-200">
        <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          💡 Tips for Effective Feedback
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 rounded-full p-1 text-sm font-bold min-w-[24px] text-center">✓</div>
              <div>
                <div className="font-medium text-gray-800">Be Specific</div>
                <div className="text-sm text-gray-600">Mention exact times, locations, and staff names when possible</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 rounded-full p-1 text-sm font-bold min-w-[24px] text-center">✓</div>
              <div>
                <div className="font-medium text-gray-800">Include Your Child's Experience</div>
                <div className="text-sm text-gray-600">Share how the issue affects your child's well-being or learning</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 rounded-full p-1 text-sm font-bold min-w-[24px] text-center">✓</div>
              <div>
                <div className="font-medium text-gray-800">Suggest Solutions</div>
                <div className="text-sm text-gray-600">Offer practical suggestions for improvement</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 rounded-full p-1 text-sm font-bold min-w-[24px] text-center">✓</div>
              <div>
                <div className="font-medium text-gray-800">Stay Constructive</div>
                <div className="text-sm text-gray-600">Focus on positive improvements rather than just complaints</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-200 text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading feedback...</p>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-200 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No feedback found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filter !== 'all' 
                ? 'No feedback matches your search criteria'
                : 'You haven\'t submitted any feedback yet'
              }
            </p>
            {(!searchTerm && filter === 'all') && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Submit Your First Feedback
              </button>
            )}
          </div>
        ) : (
          filteredFeedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${feedbackCategories[feedback.category]?.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        feedbackCategories[feedback.category]?.color === 'green' ? 'bg-green-100 text-green-800' :
                        feedbackCategories[feedback.category]?.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'}`}>
                      {feedbackCategories[feedback.category]?.label}
                    </span>
                    {feedback.subcategory && (
                      <span className="text-sm text-gray-600">• {feedback.subcategory}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feedback.subject || 'Feedback'}
                  </h3>
                  <p className="text-gray-600 mb-3">{feedback.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(feedback.submittedAt).toLocaleDateString()}
                    </div>
                    {feedback.childName && (
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {feedback.childName}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      {getRatingStars(feedback.rating)}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(feedback.status)}
                  {getPriorityBadge(feedback.priority)}
                </div>
              </div>

              {feedback.response && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-800">Response from Anganwadi</span>
                  </div>
                  <p className="text-gray-700">{feedback.response}</p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Feedback Form Modal */}
      {renderFeedbackForm()}
    </div>
  );
};

export default ParentFeedbackSystem;