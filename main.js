const express = require("express");
const app = express();
const noteRoutes = require("./routes/noteRouter");


app.use(express.json());
app.use("/notes", noteRoutes);


app.listen(8081, () => {
    console.log("server running on 8081");
});