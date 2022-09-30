const express = require("express")
const app = express()
const Route = require("./route")

const PORT = process.env.PORT || 8000;

try {
   app.use(express.json({ extended: true }));
   app.use('/api', Route);

   app.listen(PORT, () => {
      console.log("Backend server is running!");
   });
} catch (err) { console.log(err); }