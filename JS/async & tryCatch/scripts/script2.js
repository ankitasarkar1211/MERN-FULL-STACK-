const fetchData = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Error occurred");
    }, 2000);
  });
};
const showData = async () => {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.log("Caught error:", error);
  }
};
showData();
