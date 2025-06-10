import "./UserProfile.css"

function UserProfile({ user }) {
  return (
    <div className="user-profile-container">
      <div className="profile-avatar">
        <span>a</span>
      </div>
      <h3 className="profile-name">{user?.name}</h3>
      <p className="profile-email">{user?.email}</p>
      <span className="profile-role">{user?.role}</span>
    </div>
  )
}

export default UserProfile
