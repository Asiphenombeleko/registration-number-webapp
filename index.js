//import all my node modules
import express from 'express'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import session from 'express-session'
import DbRegistration from './db/databaseLogic.js'
import 'dotenv/config';
const app = express()
//create an instance for my database function
const registrationModule = DbRegistration();
//create instance of my factory function

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

  app.get("/" ,function(req, res){
    res.render('index')
  });
 // Route to insert registration data
app.post('/insertRegData', async (req, res) => {
  try {
      const { regNo } = req.body; 
      await registrationModule.insertRegData(regNo);
      res.status(200).send('Registration data inserted successfully.');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error inserting registration data.');
  }
});


app.get('/getTownId/:regNo', async (req, res) => {
  try {
      const regNo = req.params.regNo;
      const townId = await registrationModule.getTownId(regNo);
      if (townId !== null) {
          res.status(200).json({ townId });
      } else {
          res.status(404).send('Town not found');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching town ID.');
  }
});

// Route to filter towns by townTag
app.get('/filterTowns/:townTag', async (req, res) => {
  try {
      const townTag = req.params.townTag;
      const towns = await registrationModule.filterTowns(townTag);
      res.status(200).json({ towns });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error filtering towns.');
  }
});
  

// Start the Express server
const PORT = process.env.PORT || 3012;
app.listen(PORT, ()=>{
    console.log("listen at localhost:", PORT);
})