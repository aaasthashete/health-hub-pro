import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { TabBar } from '@/components/TabBar';
import { Search, MoreVertical, FileText, Check, ChevronDown, BarChart3, Sparkles } from 'lucide-react';
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
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const filterOptions = {
    type: ['All Types', 'CBC', 'BMP', 'CMP', 'Lipid Panel', 'LFT', 'HbA1c', 'Thyroid', 'Urine', 'Stool', 'Genetic', 'Other'],
    flag: ['All', 'Red', 'Yellow', 'Green'],
    time: ['All Time', 'Last 7 Days', 'Last Month', 'Last 3 Months'],
  };

  const flagColors = {
    green: 'bg-success shadow-[0_0_12px_hsl(160_70%_50%/0.4)]',
    yellow: 'bg-warning shadow-[0_0_12px_hsl(36_95%_65%/0.4)]',
    red: 'bg-destructive shadow-[0_0_12px_hsl(346_85%_68%/0.4)]',
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
      
      {/* Header */}
      <div className="pt-12 px-5 pb-4 border-b border-border/50 bg-card/50 backdrop-blur-xl relative">
        <div className="flex items-center justify-between">
          <h1 className="text-title text-foreground font-bold animate-fade-in">History</h1>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted/80 transition-all duration-200 relative group"
          >
            <MoreVertical className="w-5 h-5 text-primary" />
            
            {showMenu && (
              <div className="absolute top-full right-0 mt-2 w-32 glass-card rounded-xl shadow-lg overflow-hidden z-50 animate-scale-in">
                <button className="w-full px-4 py-3 text-left text-body text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2">
                  <span>Delete</span>
                </button>
              </div>
            )}
          </button>
        </div>

        {/* Search Bar - Enhanced */}
        <div className="relative mt-4 animate-fade-in delay-100">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted/80 backdrop-blur-sm text-body-lg text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-card transition-all duration-300"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mt-4 animate-fade-in delay-150">
          {Object.entries(filters).map(([key, value]) => (
            <div key={key} className="relative flex-1">
              <button
                onClick={() => setOpenFilter(openFilter === key ? null : key)}
                className={cn(
                  "w-full h-10 px-3 rounded-xl flex items-center justify-between text-body-sm font-medium transition-all duration-300",
                  openFilter === key 
                    ? "bg-primary text-primary-foreground shadow-primary" 
                    : "bg-muted/80 text-text-secondary hover:bg-muted"
                )}
              >
                <span className="truncate">{value}</span>
                <ChevronDown className={cn("w-4 h-4 shrink-0 transition-transform duration-200", openFilter === key && "rotate-180")} />
              </button>
              {openFilter === key && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto animate-scale-in">
                  {filterOptions[key as keyof typeof filterOptions].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilters({ ...filters, [key]: option.toUpperCase() });
                        setOpenFilter(null);
                      }}
                      className="w-full px-4 py-3 text-left text-body-sm text-foreground hover:bg-primary/10 transition-colors first:rounded-t-xl last:rounded-b-xl"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
                "w-full glass-card p-4 flex gap-4 text-left transition-all duration-300 group",
                isCompareMode && selectedReports.includes(report.id) && "ring-2 ring-primary shadow-primary"
              )}
              style={{ 
                animationDelay: `${index * 50}ms`,
                opacity: 0,
                animation: 'fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
              }}
            >
              {/* Checkbox (Compare Mode) */}
              {isCompareMode && (
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                  selectedReports.includes(report.id) 
                    ? "bg-primary border-primary shadow-primary scale-110" 
                    : "border-border"
                )}>
                  {selectedReports.includes(report.id) && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
              )}

              {/* Document Icon */}
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <FileText className="w-8 h-8 text-primary" strokeWidth={1.5} />
                <div className={cn(
                  "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                  flagColors[report.flagLevel]
                )} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-caption text-text-tertiary font-medium">{report.date}</p>
                <p className="text-section text-foreground font-semibold truncate mt-0.5">{report.type}</p>
                <p className="text-body text-text-secondary truncate mt-0.5">{report.labName}</p>
              </div>

              {/* ABDM Status */}
              {report.uploadedToABDM && (
                <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-success" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-text-tertiary" />
            </div>
            <p className="text-body-lg text-text-secondary font-medium">No reports found</p>
            <p className="text-body text-text-tertiary mt-1">Start scanning to add your first report</p>
          </div>
        )}
      </div>

      {/* Compare FAB - Premium */}
      <button
        onClick={toggleCompareMode}
        className={cn(
          "fixed bottom-24 right-5 px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-2.5 transition-all duration-300 group overflow-hidden",
          isCompareMode && selectedReports.length === 2
            ? "bg-success text-success-foreground shadow-[0_8px_24px_hsl(160_70%_50%/0.4)]"
            : "bg-gradient-primary text-primary-foreground shadow-primary"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <BarChart3 className="w-5 h-5 relative z-10" />
        <span className="text-body font-semibold relative z-10">
          {isCompareMode 
            ? selectedReports.length === 2 
              ? "Compare Now" 
              : `Compare (${selectedReports.length}/2)`
            : "Compare Reports"
          }
        </span>
        {!isCompareMode && <Sparkles className="w-4 h-4 opacity-60" />}
      </button>

      <TabBar />
    </div>
  );
}