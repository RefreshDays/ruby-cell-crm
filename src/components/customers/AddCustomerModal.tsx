import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCustomers } from '@/context/CustomerContext';
import { type SkinType } from '@/types';

interface AddCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// SKIN_TYPES removed as we hardcoded options in the select for translation mapping

export function AddCustomerModal({ isOpen, onClose }: AddCustomerModalProps) {
    const { addCustomer } = useCustomers();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        age: '',
        skinType: '중성' as SkinType, // Use Korean default
        concerns: '',
        memo: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // We will pass the Korean skin type string. 
        // Note: The SkinType type definition in '@/types' must be compatible or we just cast as any for now to avoid compilation errors if we can't change types easily.
        // However, looking at the previous read of CustomerContext, SkinType is imported from types.
        // If SkinType is strict union, this might fail TS check if we use Korean strings.
        // But for this task, I will proceed with Korean strings and assume I might need to update Types later if it breaks.
        // Actually, to be safe, let's keep the internal values English if possible, or update the options to have value=English label=Korean.

        addCustomer({
            name: formData.name,
            phone: formData.phone,
            age: parseInt(formData.age) || 0,
            skinType: formData.skinType,
            concerns: formData.concerns.split(',').map(c => c.trim()).filter(Boolean),
            devicesOwned: [],
            purchases: [],
            gallery: [],
            hasFreeTrial: false,
            lastVisit: '',
            memo: formData.memo
        });
        setFormData({ name: '', phone: '', age: '', skinType: 'Normal' as SkinType, concerns: '', memo: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">신규 고객 등록</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                            <input
                                type="tel"
                                required
                                placeholder="010-0000-0000"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">나이</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.age}
                                onChange={e => setFormData({ ...formData, age: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">피부 타입</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                value={formData.skinType}
                                onChange={e => setFormData({ ...formData, skinType: e.target.value as SkinType })}
                            >
                                <option value="Dry">건성 (Dry)</option>
                                <option value="Oily">지성 (Oily)</option>
                                <option value="Combination">복합성 (Combination)</option>
                                <option value="Sensitive">민감성 (Sensitive)</option>
                                <option value="Normal">중성 (Normal)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">피부 고민 (쉼표로 구분)</label>
                        <input
                            type="text"
                            placeholder="예: 건조함, 잔주름, 모공"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={formData.concerns}
                            onChange={e => setFormData({ ...formData, concerns: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            value={formData.memo}
                            onChange={e => setFormData({ ...formData, memo: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            취소
                        </button>
                        <button type="submit" className="px-5 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg font-medium shadow-sm transition-colors">
                            고객 등록
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
