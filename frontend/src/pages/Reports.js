import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import './Reports.css';

const Reports = () => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('Sales');
  const [reports, setReports] = useState([]);

  const stats = [
    {
      icon: '📊',
      value: '0',
      label: 'Reports Generated',
      change: '+0%'
    },
    {
      icon: '📅',
      value: '0',
      label: 'This Month',
      change: '+0'
    },
    {
      icon: '📈',
      value: '0',
      label: 'Avg. Insights',
      change: '+0%'
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'status-scheduled';
      case 'On-demand':
        return 'status-ondemand';
      case 'Quarterly':
        return 'status-quarterly';
      default:
        return '';
    }
  };

  const handleScheduleReport = () => {
    alert('Schedule Report functionality coming soon!');
  };

  return (
    <div className="reports-layout">
      <Sidebar />

      <div className="reports-main">
        <TopHeader selectedDept={selectedDept} onDeptChange={setSelectedDept} />

        <div className="reports-header">
          <div className="page-title">
            <h1>Reports</h1>
            <p>AI-generated insights and analytics for {selectedDept}</p>
          </div>
          <button className="schedule-report-btn" onClick={handleScheduleReport}>
            📅 Schedule Report
          </button>
        </div>

        <div className="reports-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-change">{stat.change}</span>
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Reports */}
          <section className="recent-reports">
            <h2>Recent Reports</h2>
            <div className="reports-list">
              {reports.length === 0 ? (
                <div className="no-reports">
                  <p>No reports generated yet. Schedule a report to get started!</p>
                  <button className="schedule-btn" onClick={handleScheduleReport}>
                    📅 Schedule Report
                  </button>
                </div>
              ) : (
                reports.map((report) => (
                  <div key={report.id} className="report-item">
                    <div className="report-content">
                      <div className="report-header">
                        <h3 className="report-title">{report.title}</h3>
                        <span className={`report-status ${getStatusBadgeClass(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                      <p className="report-description">{report.description}</p>
                      <p className="report-timestamp">
                        Last generated: <span className="timestamp-value">{report.lastGenerated}</span>
                      </p>
                    </div>
                    <div className="report-actions">
                      <button className="action-btn download-btn" title="Download">
                        ⬇️
                      </button>
                      <button className="action-btn view-btn" title="View">
                        →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Reports;
