//http://swupdate.openvpn.org/as/openvpn-as-2.0.20-Ubuntu14.amd_64.deb
//ODpe73AFDHbykFT9jhI2Q04kKGjYnOJu7w3yC9BzSxiYkLyKkHQEhydIXkCXLIFc3FaR9nZI
var midiport = 0;
var midiConnector = require('midi-launchpad').connect(midiport);

// wait for the connector to be ready
midiConnector.on("ready",function(launchpad) {
  console.log("Launchpad ready, let's do something");

  var green = launchpad.colors.green.high;
  var off = launchpad.colors.off;

  //launchpad.scrollString('hello', colour);
  //launchpad.displayString('EMF', colour);

  launchpad.on("press", function(btn) {
    console.log("Pressed: "+
        "x:"        +btn.x          +", "+
        "y:"        +btn.y          +", "+
        "state:"    +btn.getState() +", "+
        "special:"  +btn.special
    );
    if(!(btn.x == 8 && btn.y == 7)){
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

  // launchpad.clear();
  // launchpad.renderBytes(
  // [
  //   " gg  gg ",
  //   "g g  g g",
  //   "ggg  ggg",
  //   "    g   ",
  //   "    g   ",
  //   "g  gg  g",
  //   " g    g ",
  //   "  gggg  ",

  //   //"rrr  rrr",
  // ]
  // );
});
