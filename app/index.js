const express = require("express");
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || "8000";

app.use(express.static(__dirname));

// app.get("/", (req, res) => {
//     // res.status(200).send("Please enter the color");
//     // res.sendFile(path.join(__dirname+'/index.html'));
//     // res.render("index", { title: "Home" });
// });

app.get("/color", (req, res) => {
    console.log(req.query.hex);
    var command = spawn('/usr/local/bin/leds', [ "--hex", req.query.hex ]);
    command.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    command.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    command.on('close', function(code) {
        console.log(`child process exited with code ${code}`);
    if (code === 0)
        res.sendStatus(200)
    else
        res.sendStatus(500); // when the script fails, generate a Server Error HTTP response
  });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});