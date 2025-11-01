let arr=[2,2,4,8,5,4,8];
arr.sort();
let unique=[];
for(let i=0;i<7;i++) {
  if(arr[i]===arr[i+1])
    continue;
  else
    unique.push(arr[i]);
}
console.log("Unique array is: "+unique);