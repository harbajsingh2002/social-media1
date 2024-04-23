import express from 'express';
import { connectDB } from "./src/config/db"
// import { Router } from 'express';
import router from "./src/routes/userRoutes"
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(router)
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
