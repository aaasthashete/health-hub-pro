import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, MessageCircle, Share2, ChevronDown, ChevronUp, Check, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TestResult {
  name: string;
  value: string;
  range: string;
  flag: 'normal' | 'high' | 'low';
  explanation: {
    what: string;
    meaning: string;
    causes: string[];
    nextSteps: string[];
  };
}

const mockResults: TestResult[] = [
  {
    name: 'Total Cholesterol',
    value: '210 mg/dL',
    range: '< 200 mg/dL',
    flag: 'high',
    explanation: {
      what: 'Total cholesterol measures all cholesterol in your blood, including LDL and HDL.',
      meaning: 'Your level is slightly elevated, which may increase heart disease risk over time.',
      causes: ['High-fat diet', 'Lack of exercise', 'Genetic factors', 'Obesity'],
      nextSteps: ['Reduce saturated fat intake', 'Exercise regularly', 'Consider follow-up in 3 months'],
    },
  },
  {
    name: 'HDL Cholesterol',
    value: '55 mg/dL',
    range: '> 40 mg/dL',
    flag: 'normal',
    explanation: {
      what: 'HDL is "good" cholesterol that helps remove other forms of cholesterol from your bloodstream.',
      meaning: 'Your HDL level is healthy, which is protective for your heart.',
      causes: ['Regular exercise', 'Healthy diet', 'Not smoking'],
      nextSteps: ['Maintain current lifestyle', 'Continue regular exercise'],
    },
  },
  {
    name: 'LDL Cholesterol',
    value: '135 mg/dL',
    range: '< 100 mg/dL',
    flag: 'high',
    explanation: {
      what: 'LDL is "bad" cholesterol that can build up in artery walls.',
      meaning: 'Your LDL is moderately elevated, increasing cardiovascular risk.',
      causes: ['Diet high in saturated fats', 'Sedentary lifestyle', 'Genetics'],
      nextSteps: ['Dietary changes', 'Increase physical activity', 'Discuss with doctor'],
    },
  },
  {
    name: 'Triglycerides',
    value: '120 mg/dL',
    range: '< 150 mg/dL',
    flag: 'normal',
    explanation: {
      what: 'Triglycerides are a type of fat stored in your blood.',
      meaning: 'Your triglyceride level is within the healthy range.',
      causes: ['Balanced diet', 'Regular exercise'],
      nextSteps: ['Maintain current lifestyle'],
    },
  },
];

export function ReportResultScreen() {
  const { setCurrentScreen, setActiveTab } = useApp();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleBack = () => {
    setActiveTab('history');
    setCurrentScreen('history');
  };

  const getFlagIcon = (flag: string) => {
    switch (flag) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'low':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <Check className="w-4 h-4 text-success" />;
    }
  };

  const getFlagColor = (flag: string) => {
    switch (flag) {
      case 'high':
        return 'bg-destructive';
      case 'low':
        return 'bg-warning';
      default:
        return 'bg-success';
    }
  };

  const overallStatus = mockResults.some(r => r.flag === 'high') ? 'warning' : 'normal';

  return (
    <div className="absolute inset-0 bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <div className="pt-12 px-5 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div>
            <h1 className="text-section text-foreground font-semibold">Lipid Panel Results</h1>
            <p className="text-body-sm text-text-secondary">CityLab Diagnostics • Jan 3, 2025</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-32 custom-scrollbar">
        {/* Summary Card */}
        <div className={cn(
          "card-elevated p-5 mb-6 border-l-4",
          overallStatus === 'warning' ? 'border-l-warning bg-warning-light' : 'border-l-success bg-success-light'
        )}>
          <div className="flex items-center gap-3 mb-3">
            {overallStatus === 'warning' ? (
              <AlertTriangle className="w-6 h-6 text-warning" />
            ) : (
              <Check className="w-6 h-6 text-success" />
            )}
            <h2 className="text-subtitle text-foreground font-semibold">
              {overallStatus === 'warning' ? 'Attention Needed' : 'Normal'}
            </h2>
          </div>
          <ul className="space-y-1">
            <li className="text-body text-text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
              2 values above normal range
            </li>
            <li className="text-body text-text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              2 values within normal range
            </li>
          </ul>
        </div>

        {/* Results Table */}
        <div className="space-y-3">
          {mockResults.map((result, index) => (
            <div key={index} className="card-elevated overflow-hidden">
              {/* Row Header */}
              <button
                onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                <div className={cn("w-3 h-3 rounded-full", getFlagColor(result.flag))} />
                <div className="flex-1 min-w-0">
                  <p className="text-body-lg text-foreground font-medium">{result.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-body font-semibold text-primary">{result.value}</span>
                    <span className="text-body-sm text-text-tertiary">({result.range})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getFlagIcon(result.flag)}
                  {expandedRow === index ? (
                    <ChevronUp className="w-5 h-5 text-text-secondary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-secondary" />
                  )}
                </div>
              </button>

              {/* Expanded Explanation */}
              {expandedRow === index && (
                <div className="px-4 pb-4 pt-0 border-t border-border animate-fade-in">
                  <div className="pt-4 space-y-4">
                    <div>
                      <h4 className="text-body font-semibold text-foreground mb-1">What is this test?</h4>
                      <p className="text-body text-text-secondary">{result.explanation.what}</p>
                    </div>
                    <div>
                      <h4 className="text-body font-semibold text-foreground mb-1">What your result means</h4>
                      <p className="text-body text-text-secondary">{result.explanation.meaning}</p>
                    </div>
                    <div>
                      <h4 className="text-body font-semibold text-foreground mb-1">Common causes</h4>
                      <ul className="space-y-1">
                        {result.explanation.causes.map((cause, i) => (
                          <li key={i} className="text-body text-text-secondary flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-body font-semibold text-foreground mb-1">Next steps</h4>
                      <ul className="space-y-1">
                        {result.explanation.nextSteps.map((step, i) => (
                          <li key={i} className="text-body text-text-secondary flex items-center gap-2">
                            <Check className="w-4 h-4 text-success shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-card border-t border-border flex items-center gap-3">
        <button className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-primary" />
        </button>
        <Button size="default" className="flex-1">
          Save to ABDM
        </Button>
        <Button variant="secondary" size="default" className="flex-1">
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}
