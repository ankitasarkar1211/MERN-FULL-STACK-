const token = localStorage.getItem("token");
axios.get("http://localhost:5000/api/profile", {
  headers: {
    Authorization: token,
  },
});
