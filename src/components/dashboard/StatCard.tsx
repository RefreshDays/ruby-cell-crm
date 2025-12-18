import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export function StatCard({ label, value, icon: Icon, trend, trendUp }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
                {trend && (
                    <p className={`text-xs font-medium mt-2 flex items-center ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
                        {trend}
                    </p>
                )}
            </div>
            <div className="p-3 bg-primary/5 rounded-xl text-primary">
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}
