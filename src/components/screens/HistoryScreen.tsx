import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { TabBar } from '@/components/TabBar';
import { Search, MoreVertical, FileText, Check, ChevronDown, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HistoryScreen() {
  const { reports, setCurrentScreen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [filters, setFilters] = useState({
    type: 'ALL TYPES',
    flag: 'FLAG LEVEL',
    time: 'TIME',
  });

  const flagColors = {
    green: 'bg-success',
    yellow: 'bg-warning',
    red: 'bg-destructive',
  };

  const handleReportClick = (reportId: string) => {
    if (isCompareMode) {
      if (selectedReports.includes(reportId)) {
        setSelectedReports(selectedReports.filter(id => id !== reportId));
      } else if (selectedReports.length < 2) {
        setSelectedReports([...selectedReports, reportId]);
      }
    } else {
      setCurrentScreen('report-result');
    }
  };

  const toggleCompareMode = () => {
    setIsCompareMode(!isCompareMode);
    setSelectedReports([]);
  };

  const filteredReports = reports.filter(report => 
    report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.labName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute inset-0 bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <div className="pt-12 px-5 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-title text-foreground">History</h1>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative"
          >
            <MoreVertical className="w-5 h-5 text-primary" />
            
            {showMenu && (
              <div className="absolute top-full right-0 mt-1 w-28 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-50">
                <button className="w-full px-4 py-3 text-left text-body text-destructive hover:bg-destructive-light transition-colors">
                  Delete
                </button>
              </div>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-12 pr-4 rounded-lg bg-muted text-body-lg text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4">
          {Object.entries(filters).map(([key, value]) => (
            <button
              key={key}
              className="flex-1 h-9 px-3 rounded-lg bg-muted flex items-center justify-between text-body-sm text-text-secondary"
            >
              <span className="truncate">{value}</span>
              <ChevronDown className="w-4 h-4 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Report List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-36 custom-scrollbar">
        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <button
              key={report.id}
              onClick={() => handleReportClick(report.id)}
              className={cn(
                "w-full card-elevated p-4 flex gap-4 text-left transition-all animate-fade-in",
                isCompareMode && selectedReports.includes(report.id) && "ring-2 ring-primary"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Checkbox (Compare Mode) */}
              {isCompareMode && (
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  selectedReports.includes(report.id) 
                    ? "bg-primary border-primary" 
                    : "border-border"
                )}>
                  {selectedReports.includes(report.id) && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
              )}

              {/* Document Icon */}
              <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center relative">
                <FileText className="w-8 h-8 text-primary" />
                <div className={cn(
                  "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                  flagColors[report.flagLevel]
                )} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-caption text-text-tertiary">{report.date}</p>
                <p className="text-section text-foreground font-semibold truncate">{report.type}</p>
                <p className="text-body text-text-secondary truncate">{report.labName}</p>
              </div>

              {/* ABDM Status */}
              {report.uploadedToABDM && (
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-success" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Compare FAB */}
      <button
        onClick={toggleCompareMode}
        className={cn(
          "fixed bottom-24 right-5 px-5 py-3 rounded-full shadow-primary flex items-center gap-2 transition-all",
          isCompareMode && selectedReports.length === 2
            ? "bg-success text-success-foreground"
            : "bg-gradient-primary text-primary-foreground"
        )}
      >
        <BarChart3 className="w-5 h-5" />
        <span className="text-body font-semibold">
          {isCompareMode 
            ? selectedReports.length === 2 
              ? "Compare Now" 
              : `Compare (${selectedReports.length}/2)`
            : "Compare Reports"
          }
        </span>
      </button>

      <TabBar />
    </div>
  );
}
