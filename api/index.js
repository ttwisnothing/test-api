const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const IDCard = require("./models/UserCovid");

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.post("/register", async (req, res) => {
  const { cardNumber, name, surname, age, address, telephoneNumber, vaccine } =
    req.body;

  try {
    // Create a new document in the database
    const newRecord = await IDCard.create({
      cardNumber,
      name,
      surname,
      age,
      address,
      telephoneNumber,
      vaccine,
    });

    res.status(201).json(newRecord); // Send status 201 Created and the created record data back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" }); // Send status 500 Internal Server Error and warning message to the client
  }
});

app.get("/data", async (req, res) => {
  try {
    // Retrieve all records from the database
    const allRecords = await IDCard.find();

    res.status(200).json(allRecords); // Send the retrieved records as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve data" }); // Send status 500 Internal Server Error and warning message to the client
  }
});

app.get("/data/:cardNumber", async (req, res) => {
  const { cardNumber } = req.params;

  try {
    // Find a record by cardNumber in the database
    const person = await IDCard.findOne({ cardNumber });

    if (!person) {
      return res.status(404).json({ error: "Person not found" }); // Send status 404 Not Found if person not found
    }

    res.status(200).json(person); // Send the person's information as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve person data" }); // Send status 500 Internal Server Error and warning message to the client
  }
});

app.put("/data/:cardNumber", async (req, res) => {
  const { cardNumber } = req.params;
  const updatedData = req.body;

  try {
    // Find the record by cardNumber in the database and update it
    const updatedPerson = await IDCard.findOneAndUpdate(
      { cardNumber },
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" }); // Send status 404 Not Found if person not found
    }

    res.status(200).json(updatedPerson); // Send the updated person's information as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update person data" }); // Send status 500 Internal Server Error and warning message to the client
  }
});

app.delete("/data/:cardNumber", async (req, res) => {
  const cardNumber = req.params.cardNumber;

  try {
    // Find and delete the ID card with the given cardNumber
    const deletedCard = await IDCard.findOneAndDelete({ cardNumber });

    if (!deletedCard) {
      return res.status(404).json({ error: "ID card not found" });
    }

    return res.json({ message: "ID card deleted successfully" });
  } catch (err) {
    console.error("Error deleting ID card", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// MONGOOSE SETUP
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
