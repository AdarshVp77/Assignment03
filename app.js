const { json } = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 5000;

const filePath = "hospitals.json";

app.use(express.json());

app.get("/hospitals", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post("/hospitals", (req, res) => {
  try {
    const newData = req.body;
    const hospitalData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    hospitalData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(hospitalData));
    res.json(hospitalData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.put("/hospitals/:name", (req, res) => {
  try {
    const name = req.params.name;
    const updatedData = req.body;
    const hospitalData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const index = hospitalData.findIndex((item) => item.name === name);
    if (index !== -1) {
      hospitalData[index] = updatedData;
      fs.writeFileSync(filePath, JSON.stringify(hospitalData));
      res.json(hospitalData);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.delete("/hospitals/:name", (req, res) => {
  try {
    const name = req.params.name;
    const hospitalData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newData = hospitalData.filter((item) => item.name !== name);
    fs.writeFileSync(filePath, JSON.stringify(newData));
    res.json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server is reunning on port ${PORT}`);
});
