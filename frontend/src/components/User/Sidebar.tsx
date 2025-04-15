import React, { useEffect, useRef, useState } from "react";
import "../../css/style.css";
import logo from "../../assets/images/financial_logo.png";


import {Link} from 'react-router';

const Sidebar: React.FC = () => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const toggleSidebar = document.querySelector(".toggle-sidebar");

    if (!sidebar || !toggleSidebar) return;

    const handleSidebarToggle = () => {
      sidebar.classList.toggle("hide");
      setIsCollapsed((prev) => !prev); // Toggle state for logo resizing

      document.querySelectorAll<HTMLLIElement>("#sidebar .divider").forEach((item) => {
        item.textContent = sidebar.classList.contains("hide") ? "-" : item.dataset.text || "";
      });
    };

    toggleSidebar.addEventListener("click", handleSidebarToggle);
    
    return () => {
      toggleSidebar.removeEventListener("click", handleSidebarToggle);
    };
  }, []);

  return (
    <section id="sidebar" ref={sidebarRef} className="transition-all duration-300" >
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center py-4 transition-all duration-300">
  <img
    src={logo}
    alt="Admin Logo"
    className={`rounded-full object-cover transition-all duration-300 ${
      isCollapsed ? 'w-10 h-10' : 'w-45 h-45'
    }`}
  />
  <h1 className={`mt-5 text-center ${
    isCollapsed ? 'text-xs' : 'text-lg'
  }` }>FINANCIAL APP</h1>
</div>


<ul className="side-menu">
      <li>
        <Link 
          to="/user/dashboard" 
          className={location.pathname === "/user/dashboard" ? "active" : ""}
        >
          <i className="bx bxs-dashboard icon"></i> Dashboard
        </Link>
      </li>

  

	  <li>
  <Link 
    to="/user/manage_expense" 
    className={location.pathname === "/user/manage_expense" ? "active" : ""}
  >
    <i className="bx bx-money icon"></i> MANAGE EXPENSE
  </Link>
</li>

<li>
  <Link 
    to="/user/manage_goal" 
    className={location.pathname === "/user/manage_goal" ? "active" : ""}
  >
    <i className="bx bx-target-lock icon"></i> MANAGE GOAL
  </Link>
</li>

<li>
  <Link 
    to="/user/manage_budget" 
    className={location.pathname === "/user/manage_budget" ? "active" : ""}
  >
    <i className="bx bx-wallet icon"></i> MANAGE BUDGET
  </Link>
</li>

<li>
  <Link 
    to="/user/manage_progress" 
    className={location.pathname === "/user/manage_progress" ? "active" : ""}
  >
    <i className="bx bx-line-chart icon"></i> TRACK PROGRESS
  </Link>
</li>

<li>
  <Link 
    to="/user/manage_budget_calculator" 
    className={location.pathname === "/user/manage_budget_calculator" ? "active" : ""}
  >
    <i className="bx bx-calculator icon"></i> BUDGET CALCULATOR
  </Link>
</li>

<li>
  <Link 
    to="/user/manage_budget_calculator" 
    className={location.pathname === "/user/manage_budget_calculator" ? "active" : ""}
  >
    <i className="bx bx-bot icon"></i> FINANCE ASSISTANCE
  </Link>
</li>


    </ul>
    </section>
  );
};

export default Sidebar;
