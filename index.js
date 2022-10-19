import express from "express";
import cors from "cors";
import Razorpay from "razorpay";

const app = express();
const port = 9000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello from express" });
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
