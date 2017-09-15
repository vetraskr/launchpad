var midiport = 0;
var midiConnector = require('midi-launchpad').connect(midiport);

// wait for the connector to be ready
midiConnector.on("ready",function(launchpad) {
  console.log("Launchpad ready, let's do something");

  var green = launchpad.colors.green.high;
  var off = launchpad.colors.off;

  launchpad.on("press", function(btn) {
    if(btn.x != 8 || btn.y != 7){
      if(btn.getState() == 0) {
        btn.light(green);
      }
      else {
        btn.light(off);
      }
    }
  });

  var clearButton = launchpad.getButton(8, 7);
  clearButton.on('press', function(){
    launchpad.clear();
    clearButton.light(launchpad.colors.red.high);
  });
  clearButton.light(launchpad.colors.red.high);

});
