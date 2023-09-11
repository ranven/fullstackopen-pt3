const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://jeffbezos69:${password}@cluster0.dhvvo4d.mongodb.net/Phonebook?retryWrites=true&w=majority`;

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
