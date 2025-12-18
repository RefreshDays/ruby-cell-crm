import { Network as NetworkIcon, ChevronRight, User, TrendingUp, Award } from 'lucide-react';
import { format } from 'date-fns';

const MOCK_PARTNERS = [
    { id: '1', name: '이민호', rank: '루비 디렉터', pv: 45000, teamSize: 12, joinDate: '2024-05-20', status: 'Active' },
    { id: '2', name: '박서준', rank: '에메랄드', pv: 28000, teamSize: 8, joinDate: '2024-08-15', status: 'Active' },
    { id: '3', name: '송혜교', rank: '골드', pv: 12000, teamSize: 4, joinDate: '2025-01-10', status: 'New' },
];

export default function Network() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">파트너 네트워크</h2>
                    <p className="text-gray-500">다운라인 현황과 팀 성과를 한눈에 확인하세요.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex-1 md:flex-none">
                        <span className="text-xs text-gray-500 block uppercase font-bold">전체 파트너</span>
                        <span className="text-lg font-bold text-gray-900">24명</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex-1 md:flex-none">
                        <span className="text-xs text-gray-500 block uppercase font-bold">그룹 PV</span>
                        <span className="text-lg font-bold text-primary">85,000</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <NetworkIcon className="w-5 h-5 text-gray-400" />
                    <h3 className="font-bold text-gray-900">나의 팀</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {MOCK_PARTNERS.map((partner) => (
                        <div key={partner.id} className="p-6 hover:bg-gray-50/50 transition-all flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-white border border-gray-200 flex items-center justify-center shadow-sm">
                                    <User className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        {partner.name}
                                        {partner.status === 'New' && <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold">신규</span>}
                                    </h4>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Award className="w-3.5 h-3.5" /> {partner.rank}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span className="flex items-center gap-1">
                                            <TrendingUp className="w-3.5 h-3.5" /> {partner.pv.toLocaleString()} PV
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900">{partner.teamSize}명 파트너</p>
                                    <p className="text-xs text-gray-400">가입일: {format(new Date(partner.joinDate), 'yyyy.MM.dd')}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
