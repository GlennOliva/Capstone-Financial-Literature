import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="efinance-footer">
      <p>&copy; {new Date().getFullYear()} FinanceWise. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
