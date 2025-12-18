import { Bell, Search, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className={cn(
            "h-16 bg-surface/80 backdrop-blur-md border-b border-gray-200 fixed top-0 right-0 z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300",
            "left-0 md:left-64" // Full width on mobile, offset on desktop
        )}>
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">개요</h2>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <div className="relative hidden md:block">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="검색..."
                        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-primary/20 text-sm w-64 transition-all"
                    />
                </div>
                {/* Mobile Search Icon */}
                <button className="md:hidden text-gray-500">
                    <Search className="w-5 h-5" />
                </button>

                <button className="relative text-gray-500 hover:text-primary transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-gray-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-gray-900">손경희</p>
                        <p className="text-xs text-secondary font-medium">다이아몬드 디렉터</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <span className="text-primary font-bold text-xs md:text-sm">KH</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
