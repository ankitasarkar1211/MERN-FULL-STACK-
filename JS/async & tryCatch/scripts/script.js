const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
};
const showData = async () => {
  console.log("Fetching...");
  const result = await fetchData(); // waits for 2 seconds
  console.log(result);
};
showData();
