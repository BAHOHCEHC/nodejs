const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const exphbars = require('express-handlebars');

// const Handlebars = require('handlebars');
// const {
//   allowInsecurePrototypeAccess
// } = require('@handlebars/allow-prototype-access');

const keys = require('./config/keys');
const todosRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;
const app = express();

const hbs = exphbars.create({
  defaultLayout: 'main',
  extname: 'hbs',
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
});

app.engine('hbs', hbs.engine);
// app.engine(
//   'hbs',
//   exphbars({
//     handlebars: allowInsecurePrototypeAccess(Handlebars)
//   })
// );


app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todosRoutes);


mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() =>
    console.log('***************MongoDB connected!!!!!!!!!***************')
  )
  .catch(error =>
    console.log('***************ERROR!!!!!!!!!***************', error)
  );

app.listen(PORT, () => {
  console.log('***************SERVER WORK ON PORT***************', PORT);
});
