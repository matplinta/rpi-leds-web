
var colorPicker = new iro.ColorPicker("#demoWheel", {
  width: 290,
  height: 360,
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
    {
      component: iro.ui.Wheel,
      options: {
      }
    },
    {
      component: iro.ui.Slider,
    },
  ]
});

// colorPicker.on('mount', function() {
//   console.log('mount')
// });
// const { exec } = require("child_process");

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

colorPicker.on('input:move', function(color) {
  console.log(color.hexString)
  $.get('/color', { hex : color.hexString });
//   console.log('input:move');
})

colorPicker.on('input:end', function(color) {
  console.log(color.hexString)
  $.get('/color', { hex : color.hexString });
//   console.log('input:end');
})
