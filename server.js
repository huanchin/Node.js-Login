const mongoose = require("mongoose");

/****** configure mongoose and connect to DB *****/
mongoose
  .connect("mongodb://localhost:27017/test", {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((e) => {
    console.log(e);
  });

/********** Start Server **************/
const app = require("./app");

app.listen(3000, "127.0.0.1", () => {
  console.log("Server running on port 3000.");
});
