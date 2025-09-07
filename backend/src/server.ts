import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import cookieParser from 'cookie-parser'
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.route";
import orderRoute from "./routes/order.route";
import orderRoutes from "./routes/order.route";
const app = express();
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser())


app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/order',orderRoutes)

app.get("/", (req, res) => {
  res.send("Hello Nex-buy!");
});

export default app;
