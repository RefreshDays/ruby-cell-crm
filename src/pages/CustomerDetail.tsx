import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '@/context/CustomerContext';
import { ArrowLeft, Phone, Calendar, Star, Edit, ShoppingBag } from 'lucide-react';
import { BeforeAfterGallery } from '@/components/customers/BeforeAfterGallery';
import type { GalleryItem } from '@/types';

// Mock images since we don't have real uploads
const MOCK_GALLERY: GalleryItem[] = [
    {
        id: 'g1',
        date: '2025-01-15',
        beforeUrl: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=400',
        afterUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=400',
        note: '초기 관리 결과'
    }
];

export default function CustomerDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getCustomer } = useCustomers();
    const customer = getCustomer(id || '');

    if (!customer) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900">고객을 찾을 수 없습니다</h2>
                <button onClick={() => navigate('/customers')} className="text-primary mt-2 hover:underline">
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    // Inject mock gallery if empty for demo purposes
    const galleryItems = customer.gallery.length > 0 ? customer.gallery : MOCK_GALLERY;

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate('/customers')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>뒤로 가기</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex gap-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 shadow-inner">
                                    {customer.name.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
                                            <Phone className="w-3.5 h-3.5" /> {customer.phone}
                                        </span>
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
                                            <Calendar className="w-3.5 h-3.5" /> {customer.age}세
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                                            {customer.skinType}
                                        </span>
                                        {customer.concerns.map(c => (
                                            <span key={c} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs border border-gray-200">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => alert('프로필 수정 기능 준비 중')}
                                className="p-2 text-gray-400 hover:text-primary transition-colors bg-white border border-gray-200 rounded-lg shadow-sm"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">누적 PV</p>
                                <p className="text-lg font-bold text-gray-900 mt-1">1,250</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">보유 기기</p>
                                <p className="text-sm font-semibold text-gray-900 mt-1">
                                    {customer.devicesOwned.length > 0 ? customer.devicesOwned[0] : '없음'}
                                    {customer.devicesOwned.length > 1 && ` 외 ${customer.devicesOwned.length - 1}개`}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">등급</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-gray-900">VIP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-primary" /> 구매 내역
                        </h3>
                        {customer.purchases.length > 0 ? (
                            <div className="space-y-4">
                                {customer.purchases.map(purchase => (
                                    <div key={purchase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100/50 hover:bg-gray-100/50 transition-colors">
                                        <div>
                                            <p className="font-semibold text-gray-900">{purchase.items.join(', ')}</p>
                                            <p className="text-sm text-gray-500">{purchase.date}</p>
                                        </div>
                                        <span className="font-bold text-gray-900">{purchase.totalAmount.toLocaleString()}원</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">최근 구매 내역이 없습니다.</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Gallery & Notes */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <BeforeAfterGallery items={galleryItems} />
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">고객 메모</h3>
                        <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 text-sm text-gray-700 leading-relaxed min-h-[120px]">
                            {customer.memo || '메모가 없습니다.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
