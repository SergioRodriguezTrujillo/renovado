import "./StatsCards.css"

function StatsCards() {
  const stats = [
    { title: "Usuarios", count: 0, icon: "person" },
    { title: "Servicios", count: 0, icon: "help_outline" },
    { title: "Categorías", count: 0, icon: "category" },
    { title: "Turnos", count: 0, icon: "event_note" },
  ]

  return (
    <div className="stats-cards-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">
            <i className="material-icons">{stat.icon}</i>
          </div>
          <div className="stat-info">
            <h3>{stat.title}</h3>
            <div className="stat-number">{stat.count}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
