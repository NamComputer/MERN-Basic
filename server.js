require("dotenv").config()

const cookieParser = require("cookie-parser")
const express = require("express")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

app.use("/user", require("./routes/userRouter"))
app.use("/api", require("./routes/categoryRouter"))
app.use("/api", require("./routes/upload"))
app.use("/api", require("./routes/productRouter"))

// Connect to mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindandModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err
    console.log("Connected to DB Success")
  }
)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
