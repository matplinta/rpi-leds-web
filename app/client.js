
var colorPicker = new iro.ColorPicker("#colorWheel", {
    width: 340,
    height: 370,
    handleRadius: 8,
    handleUrl: null,
    // handleUrl: "#test",
    handleOrigin: {y: 0, x: 0},
    colors: [
        '#ffffff',
    ],
    // borderWidth: 2,
    padding: 8,
    wheelLightness: true,
    wheelAngle: 270,
    wheelDirection: 'anticlockwise',
    layoutDirection: 'vertical',
    // transparency: true,
    layout: [
        {component: iro.ui.Wheel, options: {}},
        {component: iro.ui.Slider,},
    ]
});

colorPicker.on('input:end', function(color) {
    console.log(color.hexString)
    $.get('/color', { hex : color.hexString });
})

function submitForm() {
    newColName = document.getElementById('addNewColorInput').value
    if (newColName == null || newColName == "") {
        alert("The name for the new color is empty!")
        return
    } else {
        console.log("Adding new fav color: " + newColName);
        add_to_favorites(newColName)
    }
}

function colorFromHex(hexString) {
    console.log(`Setting color: ${hexString}`)
    $.get('/color', { hex : hexString });
}

function turn_off() {
    $.get('/stop');
}

function christmas_mode() {
    $.get('/christmas');
}

function party_mode() {
    $.get('/party');
}

function add_to_favorites(nameString) {
    var hexString = colorPicker.color.hexString;
    $.get('/addtofavorites', { hex : hexString , name: nameString });
    buildTable()
}

function buildTable() {
    $.get('/getFavColors', (data) => {
        let ul = document.createElement('ul');
        ul.style = "padding: 0px;"

        for (const color of data.colors) { 
            li = generateColorButtonListElem(color)
            ul.appendChild(li);
        }  

        document.getElementById("favouriteColorTable").innerHTML = "";
        document.getElementById("favouriteColorTable").appendChild(ul);
    });    
}

function generateColorButtonListElem(color) {
    let li = document.createElement('li');
    li.style = "display: inline; float: left; padding: 0px;"
    let btn = document.createElement('button');

    btn.type = "submit";
    btn.className = "buttonInLi";
    btn.style = `background-color:${color.hex}; border: 1px solid ${color.hex};`;
    // btn.value = color.name.toUpperCase();
    // btn.textContent = color.name.toUpperCase();
    btn.onclick = function() {
        colorFromHex(color.hex)
    }
    para = document.createElement("p");
    node = document.createTextNode(color.name);
    para.appendChild(node);
    btn.appendChild(para);
    li.appendChild(btn);
    return li
}


// colorPicker.on('mount', function() {
//   console.log('mount')
// });

// colorPicker.on('color:change', function() {
//   console.log('color:change');
// })

// colorPicker.on('input:change', function(color) {
//   console.log(color.hexString)
//   console.log('input:change');
// })

// colorPicker.on('input:start', function(color) {
//   console.log(color.hexString)
//   console.log('input:start');
// })

// colorPicker.on('input:move', function(color) {
//   console.log(color.hexString)
//   $.get('/color', { hex : color.hexString });
// //   console.log('input:move');
// })