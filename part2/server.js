var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');

// ### Challenge 1:
// Create a POST route for "/create/:name/:age" that creates an object that looks like this:
// {
//   "name": "troy",
//   "age": 20
// }
// Then take that object and insert it into storage.json
app.post('/create/:name/:age', function(req, res) {
  let user = {
    name: req.params.name,
    age: req.params.age
  }

  let storageData = fs.readFileSync('./storage.json', 'utf-8')
  let data = JSON.parse(storageData)
  data.push(user)
  fs.writeFileSync('./storage.json', JSON.stringify(data))
  res.sendStatus(200)


});

// ### Challenge 2:
// Create a Get route for "/" that returns all of the objects inside storage.json.
app.get("/", function(req, res){
  let storage = fs.readFileSync('./storage.json', 'utf-8')
  res.json(JSON.parse(storage))
})

// ### Challenge 3:
// Create a Get route for "/:name" that returns the first object in storage.json that matches the name. If there is no object in storage.json that matches then return a 400 status.
app.get("/:name", function(req, res){
  let storageData = fs.readFileSync('./storage.json', 'utf-8')
  let data = JSON.parse(storageData)
  let result = data.filter(item => item.name === req.params.name)[0];
  if(result){
    res.json(result)
  }else{
    res.sendStatus(404)

  }
})

app.use(function(req, res) {
  res.sendStatus(404);
});



app.listen(port, function() {
  console.log('Listening on port', port);
});
