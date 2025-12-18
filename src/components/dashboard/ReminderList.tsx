import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const reminders = [
    { id: 1, type: 'refill', customer: '김민지', message: '앰플 리필 필요', time: '2일 전', priority: 'high' },
    { id: 2, type: 'followup', customer: '이수진', message: '미팅 후 체크', time: '오늘', priority: 'medium' },
    { id: 3, type: 'birthday', customer: '박지영', message: '생일 알림', time: '내일', priority: 'low' },
];

export function ReminderList() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">알림</h3>
                <button className="text-sm text-primary font-medium hover:underline">전체 보기</button>
            </div>
            <div className="divide-y divide-gray-50">
                {reminders.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4 cursor-pointer">
                        <div className={`mt-1 p-2 rounded-full ${item.type === 'refill' ? 'bg-red-50 text-red-500' :
                            item.type === 'followup' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                            }`}>
                            {item.type === 'refill' ? <AlertCircle className="w-4 h-4" /> :
                                item.type === 'followup' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-900">{item.customer}</p>
                                <span className="text-xs text-gray-400">{item.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-0.5">{item.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
