import { useState } from 'react'; // React import not needed in v17+ but okay
import { useCustomers } from '../context/CustomerContext';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';

export default function Customers() {
    const { customers } = useCustomers();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <AddCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">고객 관리</h2>
                    <p className="text-gray-500">고객의 피부 상태와 상담 기록을 관리하세요.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    <span>고객 추가</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="이름 또는 전화번호 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                    </div>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="px-6 py-4 font-medium">이름 / 연락처</th>
                                <th className="px-6 py-4 font-medium">피부 타입</th>
                                <th className="px-6 py-4 font-medium">사용 기기</th>
                                <th className="px-6 py-4 font-medium">최근 방문</th>
                                <th className="px-6 py-4 font-medium">무료 체험</th>
                                <th className="px-6 py-4 font-medium text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => window.location.href = `/customers/${customer.id}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{customer.name}</p>
                                                <p className="text-xs text-gray-500">{customer.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                            {customer.skinType}
                                        </span>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {customer.concerns.slice(0, 2).map((c, i) => (
                                                <span key={i} className="text-[10px] text-gray-400 bg-gray-100 px-1 rounded">{c}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.devicesOwned.length > 0 ? (
                                            <span className="text-sm text-gray-700">{customer.devicesOwned.join(', ')}</span>
                                        ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {customer.lastVisit ? format(new Date(customer.lastVisit), 'yyyy.MM.dd') : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.hasFreeTrial ? (
                                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                                완료됨
                                            </span>
                                        ) : (
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                미완료
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert('수정 기능 준비 중');
                                            }}
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredCustomers.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            검색 결과가 없습니다. 새로운 고객을 추가해보세요!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
