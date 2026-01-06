import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "horray! how're you buddy ! i'm good buddy !!!",
  });
});

const PORT = 8001;
app.listen(PORT, () => console.log(`hello welcome ${PORT}`));
