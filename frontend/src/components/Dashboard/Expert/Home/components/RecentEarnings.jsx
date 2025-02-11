import React from 'react';
import { BiTrendingUp } from 'react-icons/bi';
import PropTypes from 'prop-types';

export default function RecentEarnings({ 
  totalEarnings = 0,
  earnings = [],
  onViewReport = () => {}
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Recent Earnings</h2>
        <button className="text-gray-400 hover:text-gray-600">→</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total Earnings</span>
          <BiTrendingUp className="text-green-500" size={20} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold">{formatCurrency(totalEarnings)}</h3>
      </div>

      <div className="space-y-4">
        {earnings.map((earning, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{formatCurrency(earning.amount)}</p>
              <p className="text-sm text-gray-600">{earning.date}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              earning.status === 'Paid' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-yellow-100 text-yellow-600'
            }`}>
              {earning.status}
            </span>
          </div>
        ))}
      </div>

      <button 
        onClick={onViewReport}
        className="w-full mt-6 text-center text-primary hover:text-secondary text-sm font-medium"
      >
        View Earnings Report →
      </button>
    </div>
  );
}

RecentEarnings.propTypes = {
  totalEarnings: PropTypes.number,
  earnings: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Paid', 'Pending']).isRequired
  })),
  onViewReport: PropTypes.func
};