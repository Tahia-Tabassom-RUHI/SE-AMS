import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'assignment' | 'deadline' | 'meeting' | 'course' | 'activity' | 'research' | 'grant' | 'leave';
  color: string;
}

export interface CalendarSpanEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  color: string;
  textColor?: string;
}

export interface CalendarLegendItem {
  color: string;
  label: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  spanEvents?: CalendarSpanEvent[];
  legendItems?: CalendarLegendItem[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export function Calendar({ events = [], spanEvents = [], legendItems, onDateClick, onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getSpanEventsForDay = (day: number) => {
    const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return spanEvents.filter(se => {
      const start = new Date(se.startDate);
      const end = new Date(se.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return cellDate >= start && cellDate <= end;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDay(day);
    const daySpanEvents = getSpanEventsForDay(day);
    const today = isToday(day);
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    days.push(
      <div
        key={day}
        className={`h-24 border border-gray-200 p-2 cursor-pointer transition-colors overflow-hidden ${
          today ? 'bg-blue-50 border-[#900021]' : 'bg-white hover:bg-gray-50'
        }`}
        onClick={() => onDateClick?.(date)}
      >
        <div className={`text-sm font-semibold mb-0.5 ${today ? 'text-[#900021]' : 'text-gray-700'}`}>
          {day}
        </div>

        {/* Multi-day span event bars */}
        {daySpanEvents.map(se => {
          const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const spanStart = new Date(se.startDate); spanStart.setHours(0, 0, 0, 0);
          const spanEnd = new Date(se.endDate); spanEnd.setHours(23, 59, 59, 999);
          const dayOfWeek = cellDate.getDay();
          const isSpanStart = cellDate.toDateString() === spanStart.toDateString();
          const isSpanEnd = cellDate.toDateString() === spanEnd.toDateString();
          const isRowStart = dayOfWeek === 0 || isSpanStart;
          const isRowEnd = dayOfWeek === 6 || isSpanEnd;
          const showLabel = isRowStart;
          const textColor = se.textColor || se.color;

          return (
            <div
              key={se.id}
              className={`h-4 flex items-center mt-0.5 px-1
                ${isRowStart ? 'rounded-l-sm' : ''}
                ${isRowEnd ? 'rounded-r-sm' : ''}
              `}
              style={{
                backgroundColor: se.color + '28',
                borderTop: `2px solid ${se.color}`,
                marginLeft: '-8px',
                marginRight: '-8px',
              }}
            >
              {showLabel && (
                <span
                  className="text-[9px] font-semibold truncate leading-none"
                  style={{ color: textColor }}
                >
                  {se.title}
                </span>
              )}
            </div>
          );
        })}

        {/* Point event dots */}
        <div className="space-y-0.5 mt-0.5">
          {dayEvents.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-1 cursor-pointer hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                onEventClick?.(event);
              }}
              title={event.title}
            >
              <span
                className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: event.color }}
              ></span>
              <span className="text-[10px] leading-tight text-gray-600 truncate">{event.title}</span>
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-[10px] text-gray-400 pl-3">
              +{dayEvents.length - 2} more
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm">
      <div className="p-4 border-b border-[#c5c5c5]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0 border-t border-l border-gray-200">
          {days}
        </div>
      </div>

      {/* Legend */}
      {(legendItems ? legendItems.length > 0 : events.length > 0 || spanEvents.length > 0) && (
        <div className="p-4 border-t border-[#c5c5c5] bg-gray-50">
          <div className="flex flex-wrap gap-4 text-xs">
            {legendItems
              ? legendItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                ))
              : Array.from(new Set(events.map(e => e.type))).map((type) => {
                  const event = events.find(e => e.type === type);
                  return (
                    <div key={type} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: event?.color }}></div>
                      <span className="text-gray-700 capitalize">{type}</span>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
}
