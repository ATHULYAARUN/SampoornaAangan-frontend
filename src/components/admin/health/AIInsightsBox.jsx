import React from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Lightbulb,
  ArrowRight,
  Eye,
  BarChart3
} from 'lucide-react';

const AIInsightsBox = ({ predictions, language }) => {
  const getTranslation = (key) => {
    const translations = {
      en: {
        aiInsights: 'AI Health Insights',
        predictiveAnalytics: 'Predictive Analytics & Recommendations',
        malnutritionRisk: 'Malnutrition Risk Prediction',
        anemiaRisk: 'Anemia Risk Forecast',
        pregnancyComplications: 'Pregnancy Complication Risk',
        confidence: 'Confidence',
        recommendation: 'Recommendation',
        viewFullAnalysis: 'View Full Analysis',
        newChildren: 'new children predicted at risk',
        reviewGrowthData: 'Review growth data for early intervention',
        increaseSupplementation: 'Increase iron supplementation program',
        enhancedMonitoring: 'Enhanced monitoring for high-risk cases',
        highRiskCases: 'high-risk cases identified',
        location: 'Location',
        poweredBy: 'Powered by Machine Learning',
        lastUpdated: 'Predictions updated'
      },
      ml: {
        aiInsights: 'എഐ ആരോഗ്യ സൂചനകൾ',
        predictiveAnalytics: 'പ്രവചന വിശകലനവും ശുപാർശകളും',
        malnutritionRisk: 'പോഷകാഹാരക്കുറവ് അപകടസാധ്യത പ്രവചനം',
        anemiaRisk: 'അനീമിയ അപകടസാധ്യത പ്രവചനം',
        pregnancyComplications: 'ഗർഭധാരണ സങ്കീർണത അപകടസാധ്യത',
        confidence: 'ആത്മവിശ്വാസം',
        recommendation: 'ശുപാർശ',
        viewFullAnalysis: 'പൂർണ്ണ വിശകലനം കാണുക',
        newChildren: 'പുതിയ കുട്ടികൾ അപകടത്തിലാണെന്ന് പ്രവചിച്ചു',
        reviewGrowthData: 'നേരത്തെയുള്ള ഇടപെടലിനായി വളർച്ചാ ഡാറ്റ അവലോകനം ചെയ്യുക',
        increaseSupplementation: 'ഇരുമ്പ് സപ്ലിമെന്റേഷൻ പ്രോഗ്രാം വർദ്ധിപ്പിക്കുക',
        enhancedMonitoring: 'ഉയർന്ന അപകടസാധ്യതയുള്ള കേസുകൾക്ക് മെച്ചപ്പെട്ട നിരീക്ഷണം',
        highRiskCases: 'ഉയർന്ന അപകടസാധ്യതയുള്ള കേസുകൾ തിരിച്ചറിഞ്ഞു',
        location: 'സ്ഥാനം',
        poweredBy: 'മെഷീൻ ലേണിംഗ് ഉപയോഗിച്ച്',
        lastUpdated: 'പ്രവചനങ്ങൾ അപ്ഡേറ്റ് ചെയ്തു'
      }
    };
    return translations[language][key] || key;
  };

  const insights = [
    {
      id: 'malnutrition',
      type: 'warning',
      icon: Target,
      title: getTranslation('malnutritionRisk'),
      prediction: `${predictions?.malnutritionRisk?.count || 3} ${getTranslation('newChildren')}`,
      confidence: predictions?.malnutritionRisk?.confidence || 78,
      recommendation: predictions?.malnutritionRisk?.recommendation || getTranslation('reviewGrowthData'),
      color: 'orange',
      severity: 'medium'
    },
    {
      id: 'anemia',
      type: 'alert',
      icon: TrendingUp,
      title: getTranslation('anemiaRisk'),
      prediction: `${predictions?.anemiaRisk?.count || 5} cases expected next month`,
      confidence: predictions?.anemiaRisk?.confidence || 82,
      recommendation: predictions?.anemiaRisk?.recommendation || getTranslation('increaseSupplementation'),
      location: predictions?.anemiaRisk?.location || 'Ward 3',
      color: 'red',
      severity: 'high'
    },
    {
      id: 'pregnancy',
      type: 'info',
      icon: AlertTriangle,
      title: getTranslation('pregnancyComplications'),
      prediction: `${predictions?.pregnancyComplications?.count || 2} ${getTranslation('highRiskCases')}`,
      confidence: predictions?.pregnancyComplications?.confidence || 85,
      recommendation: predictions?.pregnancyComplications?.recommendation || getTranslation('enhancedMonitoring'),
      color: 'purple',
      severity: 'high'
    }
  ];

  const getInsightColor = (color, type = 'bg') => {
    const colorMap = {
      orange: {
        bg: 'bg-orange-50 border-orange-200',
        text: 'text-orange-800',
        icon: 'text-orange-600 bg-orange-100',
        accent: 'bg-orange-600'
      },
      red: {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-800',
        icon: 'text-red-600 bg-red-100',
        accent: 'bg-red-600'
      },
      purple: {
        bg: 'bg-purple-50 border-purple-200',
        text: 'text-purple-800',
        icon: 'text-purple-600 bg-purple-100',
        accent: 'bg-purple-600'
      }
    };
    return colorMap[color][type] || '';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg border border-blue-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {getTranslation('aiInsights')}
            </h3>
            <p className="text-sm text-gray-600">
              {getTranslation('predictiveAnalytics')}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
            <Lightbulb className="w-3 h-3" />
            <span>{getTranslation('poweredBy')}</span>
          </div>
          <div className="text-xs text-gray-500">
            {getTranslation('lastUpdated')}: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${getInsightColor(insight.color, 'bg')}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getInsightColor(insight.color, 'icon')}`}>
                <insight.icon className="w-4 h-4" />
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                {insight.confidence}% {getTranslation('confidence')}
              </div>
            </div>

            <h4 className={`font-semibold text-sm mb-2 ${getInsightColor(insight.color, 'text')}`}>
              {insight.title}
            </h4>

            <div className="mb-3">
              <p className="text-lg font-bold text-gray-900 mb-1">
                {insight.prediction}
              </p>
              {insight.location && (
                <p className="text-xs text-gray-600 flex items-center">
                  <span className="mr-1">{getTranslation('location')}:</span>
                  <span className="font-medium">{insight.location}</span>
                </p>
              )}
            </div>

            <div className="bg-white/50 p-2 rounded border border-gray-200/50">
              <p className="text-xs text-gray-700 mb-2">
                <span className="font-medium">{getTranslation('recommendation')}:</span>
              </p>
              <p className="text-xs text-gray-600">
                {insight.recommendation}
              </p>
            </div>

            {/* Severity indicator */}
            {insight.severity === 'high' && (
              <div className="mt-2 flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${getInsightColor(insight.color, 'accent')}`}></div>
                <span className="text-xs font-medium text-gray-600">High Priority</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <BarChart3 className="w-4 h-4" />
          <span>Predictions based on 6 months of historical data</span>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
          <Eye className="w-4 h-4" />
          <span>{getTranslation('viewFullAnalysis')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AIInsightsBox;