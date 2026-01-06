import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "horray! how're you buddy !!!",
  });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`hello welcome ${PORT}`));
