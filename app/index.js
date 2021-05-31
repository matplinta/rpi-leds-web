const express = require("express");
const fs = require("fs");
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || "8000";
const favColorsConfigPath = '/home/pi/.config/leds/favcolors.json'

app.use(express.static(__dirname));

// app.get("/", (req, res) => {
//     // res.status(200).send("Please enter the color");
//     // res.sendFile(path.join(__dirname+'/index.html'));
//     // res.render("index", { title: "Home" });
// });
app.get("/stop", (req, res) => {
    var command = spawn('/usr/local/bin/leds', ["--stop"]);
    command.on('close', function(code) {
        console.log(`child process exited with code ${code}`);
    if (code === 0)
        res.sendStatus(200)
    else
        res.sendStatus(500);
  });
});

app.get("/christmas", (req, res) => {
    var command = spawn('/usr/local/bin/leds', ["--christmas"]);
    command.on('close', function(code) {
        console.log(`child process exited with code ${code}`);
    if (code === 0)
        res.sendStatus(200)
    else
        res.sendStatus(500);
  });
});

app.get("/party", (req, res) => {
    var command = spawn('/usr/local/bin/leds', ["--party"]);
    command.on('close', function(code) {
        console.log(`child process exited with code ${code}`);
    if (code === 0)
        res.sendStatus(200)
    else
        res.sendStatus(500);
  });
});

app.get("/getFavColors", (req, res) => {
    jsonReader(favColorsConfigPath, (err, colors) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        }
        console.log(colors.name)
        res.send(colors)
    })
    
});

app.get("/addtofavorites", (req, res) => {
    console.log(req.query.hex);
    console.log(req.query.name);

    jsonReader(favColorsConfigPath, (err, favColors) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }
        favColors['colors'].push({hex: req.query.hex, name: req.query.name})
        fs.writeFile(favColorsConfigPath, JSON.stringify(favColors), (err) => {
            if (err) console.log('Error writing file:', err)
        })
    })

    res.sendStatus(200)

});

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


function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}
