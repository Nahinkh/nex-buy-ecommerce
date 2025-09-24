import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import cookieParser from 'cookie-parser'
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.route";
import Google from "@auth/express/providers/google"
import orderRoutes from "./routes/order.route";
import paymentRouter from "./routes/payment.route";
import { connectDB } from "./config/db.config";
import { ExpressAuth } from "@auth/express";
import { envConfig } from "./config/env.config";
import User from "./models/User";
const app = express();
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser())
connectDB()

// Auth.js 
// app.set("trust proxy", true)
// app.use('/api/auth/*', ExpressAuth({
//   secret:envConfig.auth_secret,
//   providers:[Google],
//   callbacks:{
//     async signIn({ profile }) {
//         if (
//           profile &&
//           profile.email_verified &&
//           typeof profile.email === "string" &&
//           profile.email.endsWith("@gmail.com")
//         ) {
//           let dbUser = await User.findOne({ email: profile.email });
//           if (!dbUser) {
//             dbUser = await User.create({
//               name: profile.name,
//               email: profile.email,
//               password: "google_oauth",
//               role: "user",
//             });
//           }
//           return true;
//         }
//         return false;
//       },
//       async session({ session }) {
//         const dbUser = await User.findOne({ email: session.user?.email }) as typeof User.prototype;
//         if (dbUser && session.user) {
//           session.user.id = (dbUser._id as unknown as { toString: () => string }).toString();
//         }
//         return session;
//       }
//     }
//   }
// ))

app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/order',orderRoutes)
app.use('/api/v1/payment', paymentRouter);

app.get("/", (req, res) => {
  res.send("Hello Nex-buy!");
});

export default app;
