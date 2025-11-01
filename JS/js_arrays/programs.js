console.log("\nLargest Element");
let arr=[5,8,2,9,3];
let max=arr[0];
for(let i=0;i<5;i++) {
  if(arr[i]>max) 
    max=arr[i];
}
console.log("The largest element is: "+max);

console.log("\nSum of elements");
let sum=0;
arr.forEach(num => {
  sum+=num;
});
console.log("The sum is: "+sum);

console.log("\nReverse of Array");
let reverse=[];
for(let i=4;i>=0;i--) {
  reverse.push(arr[i]);
}
console.log("The reversed array is: "+reverse);

console.log("\nIf exits check");
console.log(arr.includes(2)?"Element found":"Element not found");

console.log("\nOdd Even count");
let odd=0, even=0;
arr.forEach(num => {
  (num%2===0)?even++:odd++;
});
console.log("Odd count: "+odd+", Even count: "+even);