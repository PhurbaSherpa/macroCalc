const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
  //calorie calc
  if (req.body.calsubmit) {
    let c = Number(req.body.Carbs);
    let f = Number(req.body.Fats);
    let p = Number(req.body.Protein);

    let total = 4 * c + 4 * p + 9 * f;
    res.send(`Total Calories = ${total}`);
  } else {
    //macro calc
    let cals = Number(req.body.targetcals);
    let cp = Number(req.body.carbsp);
    let fp = Number(req.body.fatsp);
    let pp = Number(req.body.proteinp);
    if (cp + fp + pp === 1) {
      let carbs = Math.floor((cals * cp) / 4);
      let fats = Math.floor((cals * fp) / 9);
      let protein = Math.ceil((cals * pp) / 4);
      res.write(`For ${cals} calories eat:
    ${carbs}g of Carbs
    ${fats}g of Fats
    ${protein}g of Protein`);
      res.end();
    } else {
      res.send('Macros need to total 1(100%) -- Go Back');
    }
  }
});

app.listen(3000);
