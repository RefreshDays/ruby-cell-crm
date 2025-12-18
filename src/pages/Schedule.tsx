import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, MapPin, Users, Calendar } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { AddEventModal } from '@/components/schedule/AddEventModal';

interface Event {
    id: string;
    title: string;
    date: Date;
    type: 'Trial' | 'Business' | 'Education';
    location?: string;
    partner?: string;
}

const MOCK_EVENTS: Event[] = [
    { id: '1', title: '신규 사업자 오리엔테이션', date: new Date(), type: 'Business', location: '강남 비즈니스 센터', partner: '김민지' },
    { id: '2', title: '루비셀 체험 관리', date: addDays(new Date(), 2), type: 'Trial', location: '박지영 고객 자택' },
    { id: '3', title: '리더십 세미나', date: addDays(new Date(), 5), type: 'Education', location: '본사 대강당' },
];

export default function Schedule() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
    const [showModal, setShowModal] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAddEvent = (newEventData: any) => {
        const newEvent: Event = {
            id: Math.random().toString(36).substr(2, 9),
            title: newEventData.title,
            date: selectedDate, // Use selected date
            type: newEventData.type,
            location: newEventData.location,
            partner: newEventData.partner
        };
        setEvents([...events, newEvent]);
    };

    // Simple Week View for Demo
    const startDate = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday start
    const endDate = endOfWeek(currentDate, { weekStartsOn: 0 });
    const weekDays = eachDayOfInterval({ start: startDate, end: endDate });

    const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

    const daysEvents = events.filter(e => isSameDay(e.date, selectedDate));

    return (
        <div className="space-y-6">
            <AddEventModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onAddEvent={handleAddEvent}
                initialDate={selectedDate}
            />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">일정 관리</h2>
                    <p className="text-gray-500">미팅과 행사를 효율적으로 관리하세요.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    <span>일정 추가</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Column */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">{format(currentDate, 'yyyy년 MMMM', { locale: ko })}</h3>
                        <div className="flex gap-2">
                            <button onClick={handlePrevWeek} className="p-2 hover:bg-gray-100 rounded-full border border-gray-200">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={handleNextWeek} className="p-2 hover:bg-gray-100 rounded-full border border-gray-200">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4 text-center mb-4">
                        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                            <div key={day} className="text-xs font-medium text-gray-400 uppercase tracking-wide">{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {weekDays.map((day) => {
                            const dayEvents = events.filter(e => isSameDay(e.date, day));
                            const isSelected = isSameDay(day, selectedDate);
                            const isToday = isSameDay(day, new Date());

                            return (
                                <div
                                    key={day.toISOString()}
                                    onClick={() => setSelectedDate(day)}
                                    className={cn(
                                        "h-24 md:h-32 rounded-xl border p-2 cursor-pointer transition-all hover:shadow-md relative",
                                        isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-100 bg-gray-50/50 hover:bg-white",
                                        isToday && !isSelected && "bg-blue-50/50"
                                    )}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={cn(
                                            "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full",
                                            isToday ? "bg-primary text-white" : "text-gray-700"
                                        )}>
                                            {format(day, 'd')}
                                        </span>
                                        {dayEvents.length > 0 && <span className="bg-primary-light w-2 h-2 rounded-full"></span>}
                                    </div>

                                    <div className="mt-2 space-y-1">
                                        {/* Desktop: Show Event Titles */}
                                        <div className="hidden md:block space-y-1">
                                            {dayEvents.slice(0, 2).map((ev) => (
                                                <div key={ev.id} className="text-[10px] truncate px-1.5 py-0.5 rounded bg-white border border-gray-100 shadow-sm text-gray-700">
                                                    {ev.title}
                                                </div>
                                            ))}
                                            {dayEvents.length > 2 && (
                                                <div className="text-[10px] text-gray-400 pl-1">+{dayEvents.length - 2} 더보기</div>
                                            )}
                                        </div>

                                        {/* Mobile: Show Dots Only */}
                                        <div className="md:hidden flex justify-center gap-1 mt-4">
                                            {dayEvents.slice(0, 3).map((ev, i) => (
                                                <div key={i} className={cn(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    ev.type === 'Trial' ? "bg-pink-400" :
                                                        ev.type === 'Business' ? "bg-blue-400" : "bg-purple-400"
                                                )} />
                                            ))}
                                            {dayEvents.length > 3 && <span className="text-[8px] text-gray-400">+</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Date Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{format(selectedDate, 'EEEE', { locale: ko })}</h3>
                    <p className="text-gray-500 text-sm mb-6">{format(selectedDate, 'yyyy년 M월 d일', { locale: ko })}</p>

                    <div className="space-y-4">
                        {daysEvents.length > 0 ? daysEvents.map(event => (
                            <div key={event.id} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all group">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={cn(
                                        "text-xs font-semibold px-2 py-0.5 rounded-full border",
                                        event.type === 'Trial' ? "bg-pink-50 text-pink-600 border-pink-100" :
                                            event.type === 'Business' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                "bg-purple-50 text-purple-600 border-purple-100"
                                    )}>{event.type === 'Trial' ? '체험관리' : event.type === 'Business' ? '비즈니스' : '교육/세미나'}</span>
                                    <span className="text-xs text-gray-400">10:00 AM</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>

                                {event.location && (
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                        <MapPin className="w-3 h-3" /> {event.location}
                                    </div>
                                )}
                                {event.partner && (
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                        <Users className="w-3 h-3" /> {event.partner}
                                    </div>
                                )}
                            </div>
                        )) : (
                            <div className="text-center py-10 text-gray-400">
                                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-20" />
                                <p className="text-sm">일정이 없습니다.</p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="text-primary text-sm font-medium mt-2 hover:underline"
                                >
                                    추가하기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
