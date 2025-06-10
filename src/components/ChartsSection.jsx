"use client"

import { useState } from "react"
import "./ChartsSection.css"

function ChartsSection() {
  const [activeTab, setActiveTab] = useState("Día")
  const [activeRightTab, setActiveRightTab] = useState("Día")

  const tabs = ["Día", "Semana", "Mes", "Año", "Todo"]

  // Sample data for charts
  const barData = {
    Día: [6, 11, 6, 8, 7, 9, 5, 4, 3, 7, 6, 5, 4, 3, 7, 4, 3, 6, 5, 4],
    Semana: [20, 35, 28, 42, 18, 25, 30],
    Mes: [120, 105, 70, 65, 80, 90],
    Año: [800, 950, 1200, 1000, 850, 920, 980, 1050, 1100, 1150, 1050, 1200],
    Todo: [2500, 3000, 3500, 4000, 3800],
  }

  const barLabels = {
    Día: ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"],
    Semana: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    Mes: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    Año: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    Todo: ["2020", "2021", "2022", "2023", "2024"],
  }

  // Sample data for revenue
  const revenueData = {
    Día: [600, 1100, 600, 800, 700, 900, 500, 400, 300, 700, 600, 500],
    Semana: [2000, 3500, 2800, 4200, 1800, 2500, 3000],
    Mes: [12000, 10500, 7000, 6500, 8000, 9000],
    Año: [80000, 95000, 120000, 100000, 85000, 92000, 98000, 105000, 110000, 115000, 105000, 120000],
    Todo: [250000, 300000, 350000, 400000, 380000],
  }

  // Render bar chart based on active tab
  const renderBarChart = (data) => {
    const maxValue = Math.max(...data) * 1.2 // Add 20% padding

    return (
      <div className="bar-chart">
        {data.map((height, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{ height: `${(height / maxValue) * 100}%` }}
            title={`${barLabels[activeTab][index]}: ${height}`}
          ></div>
        ))}
      </div>
    )
  }

  // Render line chart for revenue
  const renderLineChart = (data) => {
    const maxValue = Math.max(...data) * 1.2 // Add 20% padding

    return (
      <div className="bar-chart">
        {data.map((height, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{ height: `${(height / maxValue) * 100}%` }}
            title={`${barLabels[activeRightTab][index]}: $${height}`}
          ></div>
        ))}
      </div>
    )
  }

  return (
    <div className="charts-section">
      <div className="chart-container">
        <div className="chart-header">
          <h3>Turnos agendados</h3>
          <button className="ver-mas-btn">Ver más</button>
        </div>

        <div className="chart-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`chart-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="chart-content">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color"></div>
              <span>Turnos por {activeTab}</span>
            </div>
          </div>
          {renderBarChart(barData[activeTab])}
          <div
            className="chart-x-labels"
            style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}
          >
            {barLabels[activeTab].slice(0, barData[activeTab].length).map((label, index) => (
              <div key={index} style={{ fontSize: "12px", color: "#666" }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h3>Ingresos</h3>
          <button className="ver-mas-btn">Ver más</button>
        </div>

        <div className="chart-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`chart-tab ${activeRightTab === tab ? "active" : ""}`}
              onClick={() => setActiveRightTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="chart-content">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color"></div>
              <span>Ingresos por {activeRightTab} ($)</span>
            </div>
          </div>
          {renderLineChart(revenueData[activeRightTab])}
          <div
            className="chart-x-labels"
            style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}
          >
            {barLabels[activeRightTab].slice(0, revenueData[activeRightTab].length).map((label, index) => (
              <div key={index} style={{ fontSize: "12px", color: "#666" }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartsSection
