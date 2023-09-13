const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const url = process.env.DB_URL

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (val) {
        return /^\d{2,3}-\d{7,}/.test(val)
      },
      message: (props) => `${props.value} doesn't meet the requirements`,
    },
    required: true,
  },
})

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Contact", contactSchema)
