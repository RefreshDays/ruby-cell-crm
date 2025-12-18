import { Users, Calendar, ShoppingBag, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { ReminderList } from '../components/dashboard/ReminderList';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">반갑습니다, 손경희님</h2>
                <p className="text-gray-500">오늘의 네트워크 현황을 확인하세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="활성 고객" value="124" icon={Users} trend="전월 대비 +12%" trendUp={true} />
                <StatCard label="오늘의 미팅" value="3" icon={Calendar} />
                <StatCard label="매출 (PV)" value="15,400" icon={TrendingUp} trend="전주 대비 +5%" trendUp={true} />
                <StatCard label="대기 주문" value="2" icon={ShoppingBag} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gradient-to-r from-primary to-primary-light rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">루비셀 신규 프로모션</h3>
                            <p className="text-white/90 mb-6 max-w-md">새로운 "더마 코드" 라인 론칭 이벤트가 곧 시작됩니다. 세부 정보를 확인하고 파트너들과 공유하세요.</p>
                            <button
                                onClick={() => alert('프로모션 상세 페이지는 아직 준비 중입니다.')}
                                className="bg-white text-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg transition-all"
                            >
                                자세히 보기
                            </button>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-12"></div>
                        <div className="absolute right-20 bottom-0 h-64 w-64 bg-white/5 rounded-full blur-3xl"></div>
                    </div>

                    {/* Placeholder for Recent Activity or Chart */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400">
                        [매출 분석 차트 영역]
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <ReminderList />
                </div>
            </div>
        </div>
    );
}
