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
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
      <div className="absolute inset-0 bg-blueprint-pattern" />
      
      {/* Floating Document Silhouettes */}
      <div className="floating-elements">
        <div className="absolute top-24 right-8 w-8 h-10 border border-primary/10 rounded-sm rotate-12 animate-float opacity-30" />
        <div className="absolute top-40 left-6 w-6 h-8 border border-secondary/10 rounded-sm -rotate-6 animate-float delay-500 opacity-20" />
        <div className="absolute bottom-48 right-12 w-10 h-12 border border-primary/5 rounded-sm rotate-3 animate-float delay-300 opacity-25" />
      </div>
      
      {/* Header - Sticky with higher z-index */}
      <div className="pt-12 px-5 pb-4 border-b border-border/50 bg-card/80 backdrop-blur-xl relative z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-title text-foreground font-bold animate-fade-in">History</h1>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted/80 transition-all duration-200 relative group"
          >
            <MoreVertical className="w-5 h-5 text-primary" />
            
            {showMenu && (
              <div className="absolute top-full right-0 mt-2 w-32 glass-card rounded-xl shadow-lg overflow-hidden z-[200] animate-scale-in">
                <button className="w-full px-4 py-3 text-left text-body text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2">
                  <span>Delete</span>
                </button>
              </div>
            )}
          </button>
        </div>

        {/* Search Bar - Enhanced with breathing animation */}
        <div className="relative mt-4 animate-fade-in delay-100 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary transition-transform group-focus-within:scale-110" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted/80 backdrop-blur-sm text-body-lg text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-card transition-all duration-300"
          />
        </div>

        {/* Filter Pills - FIXED Z-INDEX */}
        <div className="flex gap-2 mt-4 animate-fade-in delay-150 filter-container">
          {Object.entries(filters).map(([key, value]) => (
            <div key={key} className="relative flex-1">
              <button
                onClick={() => setOpenFilter(openFilter === key ? null : key)}
                className={cn(
                  "w-full h-10 px-3 rounded-xl flex items-center justify-between text-body-sm font-medium transition-all duration-300",
                  openFilter === key 
                    ? "bg-primary text-primary-foreground shadow-primary scale-105" 
                    : "bg-muted/80 text-text-secondary hover:bg-muted hover:scale-[1.02]"
                )}
              >
                <span className="truncate">{value}</span>
                <ChevronDown className={cn("w-4 h-4 shrink-0 transition-transform duration-200", openFilter === key && "rotate-180")} />
              </button>
              {openFilter === key && (
                <div className="filter-dropdown animate-scale-in">
                  {filterOptions[key as keyof typeof filterOptions].map((option, idx) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilters({ ...filters, [key]: option.toUpperCase() });
                        setOpenFilter(null);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-left text-body-sm transition-all duration-200 flex items-center gap-3",
                        "hover:bg-primary/10 first:rounded-t-xl last:rounded-b-xl",
                        filters[key as keyof typeof filters].toLowerCase() === option.toLowerCase() 
                          ? "bg-primary/5 text-primary font-medium" 
                          : "text-foreground"
                      )}
                      style={{ animationDelay: `${idx * 30}ms` }}
                    >
                      {/* Color indicator for flag levels */}
                      {key === 'flag' && option !== 'All' && (
                        <span className={cn(
                          "w-3 h-3 rounded-full",
                          option === 'Red' && "bg-destructive shadow-[0_0_8px_hsl(346_85%_68%/0.5)]",
                          option === 'Yellow' && "bg-warning shadow-[0_0_8px_hsl(36_95%_65%/0.5)]",
                          option === 'Green' && "bg-success shadow-[0_0_8px_hsl(160_70%_50%/0.5)]"
                        )} />
                      )}
                      <span>{option}</span>
                      {filters[key as keyof typeof filters].toLowerCase() === option.toLowerCase() && (
                        <Check className="w-4 h-4 text-primary ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Report List - Lower z-index than filters */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-36 custom-scrollbar relative z-10">
        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <button
              key={report.id}
              onClick={() => handleReportClick(report.id)}
              className={cn(
                "w-full glass-card p-4 flex gap-4 text-left transition-all duration-300 group report-status-glow",
                isCompareMode && selectedReports.includes(report.id) && "ring-2 ring-primary shadow-primary",
                index === 0 && "new"
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

              {/* Document Icon with Corner Fold Effect */}
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 document-fold">
                <FileText className="w-8 h-8 text-primary" strokeWidth={1.5} />
                {/* Flag indicator with glow */}
                <div className={cn(
                  "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                  flagColors[report.flagLevel]
                )} />
                {/* Mini sparkline on hover */}
                <div className="absolute bottom-1 left-1 right-1 h-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-end gap-0.5">
                  {[3, 5, 2, 6, 4].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/30 rounded-sm" style={{ height: `${h * 15}%` }} />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-caption text-text-tertiary font-medium">{report.date}</p>
                <p className="text-section text-foreground font-semibold truncate mt-0.5">{report.type}</p>
                <p className="text-body text-text-secondary truncate mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary" />
                  {report.labName}
                </p>
              </div>

              {/* ABDM Status with animation */}
              {report.uploadedToABDM && (
                <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center shrink-0 animate-pulse-gentle">
                  <Check className="w-4 h-4 text-success" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredReports.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="empty-state-illustration mb-6">
              <div className="w-24 h-28 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                <FileText className="w-12 h-12 text-primary/40" strokeWidth={1} />
                {/* Scan line animation */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
                {/* Question mark overlay */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                  <span className="text-warning font-bold">?</span>
                </div>
              </div>
            </div>
            <p className="text-body-lg text-text-secondary font-medium">No reports found</p>
            <p className="text-body text-text-tertiary mt-1 text-center">Start scanning to add your first report</p>
            <button 
              onClick={() => setCurrentScreen('scan')}
              className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-body font-medium shadow-primary hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Scan First Report
            </button>
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