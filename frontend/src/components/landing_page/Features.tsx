import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="efinance-features-section">
      <h3 className="efinance-section-title">App Features</h3>
      <div className="efinance-feature-grid">
        <div className="efinance-feature-box">
          <h4 className="efinance-feature-title">Goal Setting</h4>
          <p>Set short-term and long-term financial goals and track your progress visually.</p>
        </div>
        <div className="efinance-feature-box">
          <h4 className="efinance-feature-title">Financial Tips</h4>
          <p>Get daily curated tips to stay motivated and make informed financial decisions.</p>
        </div>
        <div className="efinance-feature-box">
          <h4 className="efinance-feature-title">Secure Data</h4>
          <p>Your data is encrypted and protected so you can learn and manage confidently.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
