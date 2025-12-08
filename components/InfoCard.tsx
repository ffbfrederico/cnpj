import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
  iconColor?: string;
  iconBg?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  icon: Icon, 
  title, 
  children, 
  className = '',
  iconColor = 'text-pink-600',
  iconBg = 'bg-pink-50'
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-lg ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <div className="text-sm text-gray-600">
        {children}
      </div>
    </div>
  );
};