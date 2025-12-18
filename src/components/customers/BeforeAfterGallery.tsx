import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { GalleryItem } from '@/types';

interface BeforeAfterGalleryProps {
    items: GalleryItem[];
}

export function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!items || items.length === 0) {
        return (
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
                <p className="text-gray-500">등록된 사진이 없습니다.</p>
                <button className="mt-4 text-primary font-medium hover:underline">사진 업로드</button>
            </div>
        );
    }

    const currentItem = items[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Before & After 갤러리</h3>
                <span className="text-sm text-gray-500">
                    {currentIndex + 1} / {items.length}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden group">
                        <img
                            src={currentItem.beforeUrl}
                            alt="Before"
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm">
                            BEFORE
                        </div>
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden group">
                        <img
                            src={currentItem.afterUrl}
                            alt="After"
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-primary/80 text-white px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm shadow-sm">
                            AFTER
                        </div>
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <button
                    onClick={handlePrev}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                    disabled={items.length <= 1}
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div className="text-center">
                    <p className="font-medium text-sm text-gray-900">{currentItem.date}</p>
                    {currentItem.note && <p className="text-xs text-gray-500 mt-0.5">{currentItem.note}</p>}
                </div>

                <button
                    onClick={handleNext}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                    disabled={items.length <= 1}
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </div>
    );
}
