import React from 'react';

const Services: React.FC = () => {
  return (
    <section id="services" className="efinance-services-section">
      <h3 className="efinance-section-title">What We Offer</h3>
      <div className="efinance-service-grid">
        <div className="efinance-service-box">
          <h4 className="efinance-service-title">Finance Assistance Chatbot</h4>
          <p>It will assist users with their financial concerns.</p>
        </div>
        <div className="efinance-service-box">
          <h4 className="efinance-service-title">Budgeting Tools</h4>
          <p>Track income, expenses, and savings effortlessly.</p>
        </div>
        <div className="efinance-service-box">
          <h4 className="efinance-service-title">Progress Tracking</h4>
          <p>Monitor your learning and celebrate milestones.</p>
        </div>
        <div className="efinance-service-box">
          <h4 className="efinance-service-title">Track Expenses</h4>
          <p>See exactly where your money goes every month.</p>
        </div>
        <div className="efinance-service-box">
          <h4 className="efinance-service-title">Track Savings</h4>
          <p>Stay on top of your savings goals and growth.</p>
        </div>
        <div className="efinance-service-box">
          <h4 className="efinance-service-title">Budget Calculator</h4>
          <p>Calculate spending limits and allocate money efficiently.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
