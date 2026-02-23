import React, { useState } from 'react';
import { getReservations, deleteReservation } from '../utils/localStorageHelpers';
import { useApp } from '../context/AppContext';
import AnimatedButton from './AnimatedButton';

const AdminReservations = () => {
  const { showToastMessage } = useApp();
  const [reservations, setReservations] = useState(getReservations());
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('reservations');

  React.useEffect(() => {
    const loadData = () => {
      setReservations(getReservations());
      const { getContactSubmissions } = require('../utils/localStorageHelpers');
      setContactSubmissions(getContactSubmissions());
    };
    loadData();
    // Refresh data every 2 seconds to catch updates
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteReservation = (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      deleteReservation(id);
      setReservations(getReservations());
      showToastMessage('Reservation deleted successfully!');
    }
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      const { deleteContactSubmission } = require('../utils/localStorageHelpers');
      deleteContactSubmission(id);
      const { getContactSubmissions } = require('../utils/localStorageHelpers');
      setContactSubmissions(getContactSubmissions());
      showToastMessage('Contact submission deleted successfully!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reservations & Contact</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'reservations'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-orange-500'
          }`}
        >
          Reservations ({reservations.length})
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'contact'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-orange-500'
          }`}
        >
          Contact Submissions ({contactSubmissions.length})
        </button>
      </div>

      {/* Reservations Tab */}
      {activeTab === 'reservations' && (
        <div className="overflow-x-auto">
          {reservations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No reservations yet.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Time</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Guests</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{reservation.name}</td>
                    <td className="px-4 py-3 text-gray-700">{reservation.email}</td>
                    <td className="px-4 py-3 text-gray-700">{reservation.phone}</td>
                    <td className="px-4 py-3 text-gray-700">{formatDate(reservation.date)}</td>
                    <td className="px-4 py-3 text-gray-700">{reservation.time}</td>
                    <td className="px-4 py-3 text-gray-700">{reservation.guests}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteReservation(reservation.id)}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Contact Submissions Tab */}
      {activeTab === 'contact' && (
        <div className="overflow-x-auto">
          {contactSubmissions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No contact submissions yet.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Message</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Submitted</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contactSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{submission.name}</td>
                    <td className="px-4 py-3 text-gray-700">{submission.email}</td>
                    <td className="px-4 py-3 text-gray-700">{submission.phone || 'N/A'}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{submission.message}</td>
                    <td className="px-4 py-3 text-gray-700 text-sm">{formatDateTime(submission.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteContact(submission.id)}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
