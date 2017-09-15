var life = require('./life.js').init(8);
var fs = require('fs');


 life.setCell(3, 1, true);
 life.setCell(4, 1, true);
 life.setCell(5, 1, true);

// function write(something){
//   fs.writeSync(1, something);
//   fs.fsyncSync(1);
// }

// function display(world, n){
//   for(cellN = 0; cellN < world.length; cellN ++){

//     write(world[cellN] ? '1': '0');

//     if((cellN+1) % n == 0) {
//       write('\n');
//     }
//   }
//   write('\n');
//   write('\n');
// }

// life.step(display);

// life.step(display);

// life.step(display);


var midiport = 0;
var midiConnector = require('midi-launchpad').connect(midiport);

// wait for the connector to be ready
midiConnector.on("ready",function(launchpad) {
  console.log("Launchpad ready, let's do something");

  var green = launchpad.colors.green.high;
  var orange = launchpad.colors.orange.high;
  var red = launchpad.colors.red.high;
  var off = launchpad.colors.off;
  var isRunning = false;

  var stepButton = launchpad.getButton(8, 4);
  stepButton.on('press', function(){
    if(!isRunning){
      life.step(renderToLaunchpad);
    }
  });
  stepButton.light(orange);

  var turnOnStepButton = function(){
    stepButton.light(orange);
  };
  var turnOffStepButton = function(){
    stepButton.light(off);
  }

  var ppButton = launchpad.getButton(8, 6);
  ppButton.on('press', function(){
    isRunning = !isRunning;
    if(isRunning){
      ppButton.light(orange);
      loop();
      turnOffStepButton();
    } else {
      ppButton.light(green);
      turnOnStepButton();
    }

  });
  ppButton.light(isRunning ? orange : green);

  var clearButton = launchpad.getButton(8, 7);
  clearButton.on('press', function(){
    launchpad.clear();
    life.clear();
    clearButton.light(red);
    ppButton.light(green);
    stepButton.light(orange);
    isRunning = false;
  });
  clearButton.light(launchpad.colors.red.high);

  launchpad.on("press", function(btn) {
    if(btn.x != 8 || (btn.y != 7 && btn.y != 6 && btn.y != 4)){
      if(btn.getState() == 0) {
        btn.light(green);

        life.setCell(btn.x, btn.y, true);
      }
      else {
        btn.light(off);
        life.setCell(btn.x, btn.y, false);
      }
    }
  });

  var renderToLaunchpad = function(world, n){
    for(x = 0; x < world.length; x ++){
      for(y = 0; y < world[x].length; y ++){
        var btn = launchpad.getButton(x, y);
        if(world[x][y]){
          btn.light(green);
        } else {
          btn.light(off);
        }
      }
    }
  }

  var loop = function(){
    life.step(renderToLaunchpad);
    if(isRunning){
      setTimeout(loop, 500);
    }
  }

  loop();
});


// TODO:
// --fix clear so that it clears world array
// --fix loop so that it works
// --fix edge cases so that everything wraps correctly
