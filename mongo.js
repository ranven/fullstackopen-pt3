/* const mongoose = require("mongoose");
const url = process.env.DB_URL;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length < 4) {
  Contact.find({}).then((res) => {
    console.log("puhelinluettelo");
    res.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const contact = new Contact({
    name: name,
    number: number,
  });

  contact.save().then((result) => {
    console.log("contact saved!");
    mongoose.connection.close();
  });
}
 */
