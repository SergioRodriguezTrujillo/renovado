"use client"

import "./UsersTable.css"

function UsersTable() {
  const users = [
    { name: "new", email: "new@gmail.com", role: "admin" },
    { name: "test", email: "test@gmail.com", role: "colaborador" },
    { name: "tobi", email: "tobi@gmail.com", role: "colaborador" },
    { name: "Erick", email: "erick@gmail.com", role: "colaborador" },
    { name: "Juan", email: "admin2@gmail.com", role: "admin" },
  ]

  return (
    <div className="users-table-container">
      <div className="table-header">
        <h3>Últimos 5 registros</h3>
        <button className="ver-mas-btn">Ver más</button>
      </div>

      <div className="table-content">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersTable
