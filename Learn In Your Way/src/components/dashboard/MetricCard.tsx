import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  accentColor?: 'indigo' | 'emerald' | 'amber' | 'violet' | 'rose';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subValue,
  change,
  trend,
  icon: Icon,
  accentColor = 'indigo',
  onClick,
}) => {
  const colorStyles = {
    indigo: {
      border: 'hover:border-indigo-500/40',
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      glow: 'shadow-indigo-500/10',
    },
    emerald: {
      border: 'hover:border-emerald-500/40',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/10',
    },
    amber: {
      border: 'hover:border-amber-500/40',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/10',
    },
    violet: {
      border: 'hover:border-violet-500/40',
      bg: 'bg-violet-500/10',
      text: 'text-violet-400',
      glow: 'shadow-violet-500/10',
    },
    rose: {
      border: 'hover:border-rose-500/40',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      glow: 'shadow-rose-500/10',
    },
  }[accentColor];

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-md transition-all duration-200 ${colorStyles.border} ${
        onClick ? 'cursor-pointer hover:bg-slate-900/90 hover:scale-[1.01]' : ''
      }`}
    >
      {/* Top subtle glow bar */}
      <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-${accentColor}-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 tracking-wide">{title}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 ${colorStyles.bg} ${colorStyles.text}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-white font-mono">{value}</span>
        {subValue && (
          <span className="text-xs text-slate-400 font-medium">{subValue}</span>
        )}
      </div>

      {change && (
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px]">
          <span
            className={`font-semibold ${
              trend === 'up'
                ? 'text-emerald-400'
                : trend === 'down'
                ? 'text-rose-400'
                : 'text-amber-400'
            }`}
          >
            {change}
          </span>
          <span className="text-slate-400">vs last lesson</span>
        </div>
      )}
    </div>
  );
};
