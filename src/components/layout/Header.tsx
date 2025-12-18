import { Bell, Search } from 'lucide-react';

export function Header() {
    return (
        <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-gray-200 fixed top-0 right-0 left-64 z-40 px-8 flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-800">개요</h2>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="검색..."
                        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-primary/20 text-sm w-64 transition-all"
                    />
                </div>

                <button className="relative text-gray-500 hover:text-primary transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-gray-900">손경희</p>
                        <p className="text-xs text-secondary font-medium">다이아몬드 디렉터</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <span className="text-primary font-bold">KH</span>
                            {/* Or <img src="..." /> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
