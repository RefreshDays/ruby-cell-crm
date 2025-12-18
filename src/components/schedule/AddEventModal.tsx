import React, { useState } from 'react';
import { X } from 'lucide-react';

// We'll define a simpler Event type here or import it if exported.
// Since Event was defined locally in Schedule.tsx, let's just use a relaxed type or move types to index.ts.
// For now, we'll accept a handler that takes the event data.

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddEvent: (event: any) => void;
    initialDate?: Date;
}

export function AddEventModal({ isOpen, onClose, onAddEvent, initialDate }: AddEventModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        type: 'Trial',
        time: '14:00',
        location: '',
        partner: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddEvent({
            ...formData,
            date: initialDate || new Date(),
        });
        setFormData({ title: '', type: 'Trial', time: '14:00', location: '', partner: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">새 일정 추가</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">일정 유형</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Trial">체험 관리 (Trial)</option>
                                <option value="Business">비즈니스 (Business)</option>
                                <option value="Education">교육/세미나 (Education)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">시간</label>
                            <input
                                type="time"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">장소</label>
                        <input
                            type="text"
                            placeholder="예: 스타벅스 강남점"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">참석자 / 파트너</label>
                        <input
                            type="text"
                            placeholder="예: 김민지"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={formData.partner}
                            onChange={e => setFormData({ ...formData, partner: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            취소
                        </button>
                        <button type="submit" className="px-5 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg font-medium shadow-sm transition-colors">
                            일정 추가
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
