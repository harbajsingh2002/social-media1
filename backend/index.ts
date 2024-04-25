import express from 'express';
import { connectDB } from "./src/config/db"
// import { Router } from 'express';
import router from "./src/routes/userRoutes"
import Router from './src/routes/postRoute';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(router)
app.use(Router)
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
