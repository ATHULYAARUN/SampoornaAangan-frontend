import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  Shield, 
  Syringe,
  Apple,
  Users,
  Eye
} from 'lucide-react';

const HealthSummaryCards = ({ data, language }) => {
  const getTranslation = (key) => {
    const translations = {
      en: {
        highRiskPregnancies: 'High-Risk Pregnancies',
        anemiaCases: 'Anemia Cases',
        growthMonitoring: 'Growth Monitoring',
        immunizationCoverage: 'Immunization Coverage',
        nutritionStatus: 'Nutrition Status',
        maternalCompliance: 'Maternal Health Compliance',
        requiresAttention: 'Requiring immediate attention',
        adolescentGirls: 'Adolescent girls affected',
        childrenOnTrack: 'Children on track',
        fullyVaccinated: 'Fully vaccinated children',
        checkupsCompleted: 'Check-ups completed',
        viewDetails: 'View Details',
        viewCharts: 'View Charts'
      },
      ml: {
        highRiskPregnancies: 'ഉയർന്ന അപകടസാധ്യതയുള്ള ഗർഭധാരണങ്ങൾ',
        anemiaCases: 'അനീമിയ കേസുകൾ',
        growthMonitoring: 'വളർച്ചാ നിരീക്ഷണം',
        immunizationCoverage: 'പ്രതിരോധ കുത്തിവയ്പ്പ് കവറേജ്',
        nutritionStatus: 'പോഷകാഹാര നില',
        maternalCompliance: 'മാതൃ ആരോഗ്യ അനുസരണം',
        requiresAttention: 'ഉടനടി ശ്രദ്ധ ആവശ്യമാണ്',
        adolescentGirls: 'കൗമാരക്കാരായ പെൺകുട്ടികൾ ബാധിതർ',
        childrenOnTrack: 'കുട്ടികൾ ട്രാക്കിൽ',
        fullyVaccinated: 'പൂർണ്ണമായി വാക്സിനേറ്റ് ചെയ്ത കുട്ടികൾ',
        checkupsCompleted: 'പരിശോധനകൾ പൂർത്തിയായി',
        viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
        viewCharts: 'ചാർട്ടുകൾ കാണുക'
      }
    };
    return translations[language][key] || key;
  };

  const cards = [
    {
      id: 'pregnancies',
      title: getTranslation('highRiskPregnancies'),
      value: data?.highRiskPregnancies || 0,
      description: getTranslation('requiresAttention'),
      icon: Heart,
      color: 'red',
      trend: '+2 this week',
      action: getTranslation('viewDetails'),
      severity: 'high'
    },
    {
      id: 'anemia',
      title: getTranslation('anemiaCases'),
      value: data?.anemiaCases || 0,
      description: getTranslation('adolescentGirls'),
      icon: Activity,
      color: 'orange',
      trend: '+5% this month',
      action: getTranslation('viewDetails'),
      severity: 'medium'
    },
    {
      id: 'growth',
      title: getTranslation('growthMonitoring'),
      value: `${data?.growthMonitoring || 0}%`,
      description: getTranslation('childrenOnTrack'),
      icon: TrendingUp,
      color: 'green',
      trend: '+3% improvement',
      action: getTranslation('viewCharts'),
      severity: 'good'
    },
    {
      id: 'immunization',
      title: getTranslation('immunizationCoverage'),
      value: `${data?.immunizationCoverage || 0}%`,
      description: getTranslation('fullyVaccinated'),
      icon: Syringe,
      color: 'blue',
      trend: '+1.5% this month',
      action: getTranslation('viewDetails'),
      severity: 'good'
    },
    {
      id: 'nutrition',
      title: getTranslation('nutritionStatus'),
      value: data?.nutritionStatus ? `${data.nutritionStatus.normal}%` : '0%',
      description: 'Normal nutrition status',
      icon: Apple,
      color: 'purple',
      trend: 'Stable',
      action: getTranslation('viewCharts'),
      severity: 'medium'
    },
    {
      id: 'maternal',
      title: getTranslation('maternalCompliance'),
      value: `${data?.maternalCompliance || 0}%`,
      description: getTranslation('checkupsCompleted'),
      icon: Shield,
      color: 'indigo',
      trend: '+4% this month',
      action: getTranslation('viewDetails'),
      severity: 'good'
    }
  ];

  const getCardStyles = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-orange-200 bg-orange-50';
      case 'good':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getIconColor = (color) => {
    const colorMap = {
      red: 'text-red-600 bg-red-100',
      orange: 'text-orange-600 bg-orange-100',
      green: 'text-green-600 bg-green-100',
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100',
      indigo: 'text-indigo-600 bg-indigo-100'
    };
    return colorMap[color] || 'text-gray-600 bg-gray-100';
  };

  const getActionColor = (color) => {
    const colorMap = {
      red: 'bg-red-50 text-red-600 hover:bg-red-100',
      orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
      green: 'bg-green-50 text-green-600 hover:bg-green-100',
      blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      indigo: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
    };
    return colorMap[color] || 'bg-gray-50 text-gray-600 hover:bg-gray-100';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-xl p-6 shadow-lg border ${getCardStyles(card.severity)} hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(card.color)}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-white rounded-full">
                {card.trend}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {card.title}
            </h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-gray-900">
                {card.value}
              </p>
              {card.severity === 'high' && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-red-600">Alert</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {card.description}
            </p>
          </div>

          {/* Mini chart or progress bar for some cards */}
          {card.id === 'nutrition' && data?.nutritionStatus && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Normal: {data.nutritionStatus.normal}%</span>
                <span>Underweight: {data.nutritionStatus.underweight}%</span>
                <span>Severe: {data.nutritionStatus.severe}%</span>
              </div>
              <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500" 
                  style={{ width: `${data.nutritionStatus.normal}%` }}
                ></div>
                <div 
                  className="bg-yellow-500" 
                  style={{ width: `${data.nutritionStatus.underweight}%` }}
                ></div>
                <div 
                  className="bg-red-500" 
                  style={{ width: `${data.nutritionStatus.severe}%` }}
                ></div>
              </div>
            </div>
          )}

          <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${getActionColor(card.color)}`}>
            <Eye className="w-4 h-4" />
            <span>{card.action}</span>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default HealthSummaryCards;