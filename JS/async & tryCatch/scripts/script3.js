function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data received"), 1500);
  });
}
async function getData() {
  let response = await fetchData();
  console.log(response);
}
getData();