//import all my node modules
import express from 'express'
import bodyParser from 'body-parser'
import { engine } from 'express-handlebars/types'
import session from 'express-session'
import flash from 'express-flash'
import Registrations from 'regFactory.js'

const app = express()
//create an instance for my database function

//create instance of my factory function
 let registrations = Registrations()
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

const PORT = process.env.PORT || 3012;
app.listen(PORT, ()=>{
    console.log("listen at localhost:", PORT);
})