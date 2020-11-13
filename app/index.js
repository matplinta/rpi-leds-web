const express = require("express");
const path = require("path");
const { spawn } = require('child_process');
const { exec } = require("child_process");
const iro = require('@jaames/iro');

const app = express();
const port = process.env.PORT || "8000";


app.use(express.static(__dirname));

// app.get("/", (req, res) => {
//     // res.status(200).send("Please enter the color");
//     // res.sendFile(path.join(__dirname+'/index.html'));
//     // res.render("index", { title: "Home" });
    
// });

// app.get("/color/:hex", (req, res) => {
app.get("/color", (req, res) => {
    console.log(req.query.hex);
    // var command = spawn(__dirname + '/run.sh', [ req.query.color || '' ]);
    var command = spawn('echo', [ req.query.hex ]);
    command.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    command.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    command.on('close', function(code) {
        console.log(`child process exited with code ${code}`);
    // if (code === 0)
    //   res.send(Buffer.concat(output));
    // else
    //   res.send(500); // when the script fails, generate a Server Error HTTP response
  });
});


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");