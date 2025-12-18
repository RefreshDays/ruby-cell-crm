import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Network, LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: '대시보드', to: '/' },
    { icon: Users, label: '고객 관리', to: '/customers' },
    { icon: Calendar, label: '일정 관리', to: '/schedule' },
    { icon: Network, label: '네트워크', to: '/network' },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const handleSignOut = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            // In a real app, clear tokens here
            alert('로그아웃 되었습니다.');
            window.location.reload();
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed top-0 left-0 z-50 h-screen w-64 bg-surface border-r border-gray-200 flex flex-col transition-transform duration-300 shadow-xl",
                "transform md:translate-x-0", // Desktop: always shown
                isOpen ? "translate-x-0" : "-translate-x-full" // Mobile: toggle
            )}>
                <div className="p-6 flex items-center justify-between border-b border-gray-100/50">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                        Ruby-Cell
                    </h1>
                    <button
                        onClick={onClose}
                        className="md:hidden text-gray-500 hover:text-gray-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onClose} // Close sidebar on mobile nav click
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary/5 text-primary font-medium shadow-sm"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )
                            }
                        >
                            <item.icon className="w-5 h-5 transition-colors" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-primary hover:bg-red-50 w-full rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>로그아웃</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
