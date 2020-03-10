const iro = require('@jaames/iro');
var shell = require('shelljs');

shell.exec('pwd').code
var colorPicker = new iro.ColorPicker("#demoWheel", {
  width: 290,
  height: 360,
  handleRadius: 8,
  handleUrl: null,
  // handleUrl: "#test",
  handleOrigin: {y: 0, x: 0},
  color: "#f00",
  borderWidth: 2,
  padding: 8,
  wheelLightness: true,
  wheelAngle: 270,
  wheelDirection: 'anticlockwise',
  layout: [
    {
        component: iro.ui.Wheel,
        options: {
        }
    },
    {
        component: iro.ui.Slider,
        options: {
          sliderType: 'hue'
        }
    },
    {
      component: iro.ui.Slider,
      options: {
      }
    },
    ]
});



colorPicker.on('mount', function() {
    console.log('mount')
});

colorPicker.on('color:change', function() {
    console.log('color:change');
    shelljs.exec('ls /home').code
})

colorPicker.on('input:change', function(color) {
    console.log('input:change');
})

colorPicker.on(['color:init', 'color:change'], function() {
    console.log('color:change or color:init');
})
