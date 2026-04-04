export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Welcome to Dashboard 🔐</h1>
      <button
        onClick={handleLogout}
        className="ml-4 py-2 px-4 bg-red-500 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
