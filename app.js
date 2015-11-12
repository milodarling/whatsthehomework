var express = require('express'),
app = express(),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

//the port for the server to run on
var port = 2370;

//the SHA-256 hash of your password (this is the hash for "password" -- you should probably change that)
var passHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

//generic 404 error
var send_404 = function(req,res){
        res.status(404).render('404');
}

//returns array of all JSON files in the homeworks folder
var getTeachers = function() {
  var files = fs.readdirSync(path.join(__dirname, 'homeworks'));
  var teachers = [ ];
  for (var i=0; i<files.length; i++) {
  	if (files[i].split('.').pop()=="json") {
  	  var teacher = files[i].slice(0, files[i].length-5);
  	  teachers.push(teacher);
  	}
  }
  return teachers;
}

//main home page
app.get('/', function(req, res) {
  var teachers = getTeachers();
  res.render('home', { "teachers":teachers });
});


//edit home page
app.get('/edit', function(req, res) {
  var teachers = getTeachers();
  res.render('edit', { "teachers":teachers });
});

//edit page for a specific teacher
app.get('/edit/:teacher', function(req, res) {
  //get teacher name
  var id = req.params.teacher;
  //load the info from that teacher's JSON file and send it to the jade file
  var dataPath = path.join(__dirname, 'homeworks', id+'.json');
  fs.lstat(dataPath, function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        info["teacher"] = id;
        res.render('edit_teacher', info);
    } else {
      send_404(req,res);
    }
  });
});

//submit new hw
app.post('/submit', function(req, res) {
  //check password
  if (req.body.inputPassword != passHash) {
    res.send("bad password");
    return;
  }
  
  //get data
  var dateStr = req.body.date,
  homeworks = req.body.homework,
  indexToEdit = req.body.dateToEdit;

  //check for empty homework assignments
  for (var i=homeworks.length-1;  i>=0; i--) {
    if (!homeworks[i] || homeworks[i].length === 0) {
      homeworks.splice(i, 1);
    }

  }
  //check if they've entered the date (if they're adding a new hw)
  if (!(!dateStr || dateStr.length === 0)) {
    //switch date pretty format
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var date = new Date(dateStr);
    var day = date.getDate() + 1;
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var fullDate = (monthNames[monthIndex] + ' ' + day + ', ' + year);
  } else {
    if (!isNaN(indexToEdit))
      var index = +indexToEdit;
  }

  //edit JSON file to add assignments
  var dataPath = path.join(__dirname, 'homeworks', req.body.teacher+'.json');
  fs.lstat(dataPath, function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        var oldHomeworks = info.homeworks;
        if (!(!dateStr || dateStr.length === 0)) {
          oldHomeworks.unshift({"date":fullDate, "homework":homeworks});
        } else {
          oldHomeworks[index]["homework"] = homeworks;
        }
        info.homeworks = oldHomeworks;
        fs.writeFileSync(dataPath, JSON.stringify(info, null, 4));
        res.render("success", {"teacher": req.body.teacher});
    } else {
      res.send("error");
    }
  });

});

//page for a teacher
app.get('/:teacher', function(req, res) {
  //get teacher name
  var id = req.params.teacher;
  //grab the info from the teacher's JSON file and send it to the jade script to be displayed
  var dataPath = path.join(__dirname, 'homeworks', id+'.json');
  fs.lstat(dataPath, function(err, stats) {
    if (!err && stats.isFile()) {
        var info = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        res.render('teacher', info);
    } else {
      send_404(req,res);
    }
  });
});

//everything else is a 404
app.get('*', send_404);

//listen on the desired port
app.listen(port);