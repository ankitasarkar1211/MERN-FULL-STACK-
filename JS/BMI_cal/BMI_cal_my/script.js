function calculateBMI() {
  let weight=document.getElementById("weight").value;
  let height=document.getElementById("height").value;
  let resultDiv=document.getElementById("result");

  if(weight ==="" || height ==="" || weight<=0 || height<=0) {
    resultDiv.innerHTML="Please enter valid weight and height.";
    resultDiv.className = "result show obese";
    return;
  }
  let height_m=height/100;
  let bmi = (weight / (height_m * height_m)).toFixed(1);
  let category="";
  let cssClass="";
  if (bmi < 18.5) {
          category = "Underweight";
          cssClass = "underweight";
        } else if (bmi < 25) {
          category = "Normal weight";
          cssClass = "normal";
        } else if (bmi < 30) {
          category = "Overweight";
          cssClass = "overweight";
        } else {
          category = "Obese";
          cssClass = "obese";
        }
        resultDiv.innerHTML = `Your BMI is <strong>${bmi}</strong> (${category})`;
        resultDiv.className = `result show ${cssClass}`;P
}