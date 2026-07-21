import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1>{user?.name}</h1>
          <p>{user?.email}</p>

          <div className="profile-info">
            <div>
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div>
              <span>User ID</span>
              <strong>{user?._id}</strong>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
