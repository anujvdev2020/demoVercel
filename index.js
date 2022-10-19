import express from "express";
import cors from "cors";
import Razorpay from "razorpay";

const app = express();
const port = 9000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const products = [
    {
      id: 0,
      image:
        "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/FP.jpg",
      price: 550,
      foodname: "Farmers Pick Pizza",
      quantity: 0,
      isVeg: true,
    },
    {
      id: 1,
      image:
        "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/Mar.jpg",
      price: 600,
      foodname: "Marghreita",
      quantity: 0,
      isVeg: true,
    },
    {
      id: 2,
      image:
        "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/CS.jpg",
      price: 650,
      foodname: "Chicken Supreme Pizza",
      quantity: 0,
      isVeg: false,
    },
    {
      id: 3,
      image:
        "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/CS.jpg",
      price: 750,
      foodname: "Chicken Supreme Pizza 1",
      quantity: 0,
      isVeg: false,
    },
    {
      id: 4,
      image:
        "https://storage.googleapis.com/smartqprdnz_pub/im/fi/compassevents/DPS.jpg",
      price: 750,
      foodname: "Peppy Paneer",
      quantity: 0,
      isVeg: false,
    },
  ];
  res.json({
    data: products,
  });
});

app.post("/createOrder", (req, res) => {
  const { amount } = req.body;

  console.log("body", req.body);
  var instance = new Razorpay({
    key_id: "rzp_test_gOwkoSR9uUl3VD",
    key_secret: "8FwWVuGKP2pSIAGpaovXibPA",
  });

  instance.orders.create(
    {
      amount: amount,
      currency: "INR",
      receipt: "receipt_111",
      // notes: notes,
    },
    (err, order) => {
      //STEP 3 & 4:
      if (!err) {
        res.json(order);
        // res.sendStatus(200);
      } else {
        console.log("EEEE", err);
        res.send(err);
      }
    }
  );
});

app.listen(port, () => {
  console.log("I am live");
});
