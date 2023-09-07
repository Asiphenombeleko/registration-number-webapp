//import all my node modules
import express from 'express'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import session from 'express-session'
import DbRegistration from './db/databaseLogic.js'
import 'dotenv/config';
import db from './database.js'
import index_route from './routes/index.routes.js';
const app = express()
//create an instance for my database function
const registrationModule = DbRegistration(db);
//create instance of my index route function
let indexRoute = index_route(registrationModule);

app.engine(
  "handlebars",
  engine({
    layoutsDir: "./views/layouts",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Asiphe's",
  })
);
// session middleware
app.use(flash());

app.get("/", indexRoute.All);
// Route to insert registration data
app.post('/insertRegData', indexRoute.insert);

// Route to filter towns by townTag
app.post("/filter", indexRoute.filters)

app.post("/reset", indexRoute.reset)

// Start the Express server
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log("listen at localhost:", PORT);
})