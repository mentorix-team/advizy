import PropTypes from 'prop-types';
import { isDateInPast, isSameDay, getMonthDays, getFirstDayOfMonth } from '../../utils/dateUtils';

function CalendarGrid({ currentDate, selectedDate, onDateSelect }) {
  const today = new Date();
  const daysInMonth = getMonthDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Generate calendar days
  const calendarDays = [];
  let currentRow = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    currentRow.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    currentRow.push(date);

    if (currentRow.length === 7) {
      // Only add the row if it contains future dates
      if (currentRow.some(date => date && !isDateInPast(date))) {
        calendarDays.push(currentRow);
      }
      currentRow = [];
    }
  }

  // Add remaining days to last row if needed
  if (currentRow.length > 0) {
    while (currentRow.length < 7) {
      currentRow.push(null);
    }
    if (currentRow.some(date => date && !isDateInPast(date))) {
      calendarDays.push(currentRow);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-7 mb-2 bg-emerald-50">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((week, weekIndex) => (
          week.map((date, dayIndex) => {
            if (!date) {
              return <div key={`empty-${weekIndex}-${dayIndex}`} />;
            }

            const isPast = isDateInPast(date);
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);

            return (
              <button
                key={`day-${weekIndex}-${dayIndex}`}
                onClick={() => !isPast && onDateSelect(date)}
                disabled={isPast}
                className={`
                  py-2 rounded-full text-sm transition-colors
                  ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                  ${isSelected ? 'bg-green-500 text-white hover:bg-green-600' : ''}
                  ${isToday && !isSelected ? 'border border-green-500' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })
        ))}
      </div>
    </div>
  );
}

CalendarGrid.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func.isRequired,
};

export default CalendarGrid;