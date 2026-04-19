import React from "react";

const App = () => {

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // Step 1: Create order from backend
    const res = await fetch("http://localhost:3000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: 500 })
    });

    const order = await res.json();

    // Step 2: Open Razorpay
    const options = {
      key: "YOUR_KEY_ID",
      amount: order.amount,
      currency: "INR",
      order_id: order.id,

      handler: async function (response) {
        // Step 3: Verify payment
        const verifyRes = await fetch("http://localhost:3000/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(response)
        });

        const text = await verifyRes.text();
        alert(text);
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Pay ₹500</h2>
      <button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Pay Now
      </button>
    </div>
  );
};

export default App;