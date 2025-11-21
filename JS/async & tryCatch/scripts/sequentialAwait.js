function taskA() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("A done"), 1000);
  });
}
function taskB() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("B done"), 1000);
  });
}
async function run() {
  let a = await taskA();
  console.log(a);
  let b = await taskB();
  console.log(b);
}
run();
