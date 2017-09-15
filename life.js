var Life = function(n){

  this.worldN = n;
  this.world = [];

  var that = this;

  this._step = function (callBack){
    var nextWorld = that._clear([]);

    for(i = 0; i <  nextWorld.length; i ++){
      for(j = 0; j < nextWorld[i].length; j ++){
        nextWorld[i][j] = that.isAlive(i, j);
      }
    }

    that.world = nextWorld;
    callBack(that.world, that.worldN);
  }

  this.isAlive = function(x, y){
    var x_left = (that.worldN + x - 1) % that.worldN;
    var x_right = (that.worldN + x + 1) % that.worldN;

    var y_up = (that.worldN + y - 1) % that.worldN;
    var y_down = (that.worldN + y + 1) % that.worldN;

    var neighbours = 0;

    if(that.world[x_left][y_up]) neighbours += 1;
    if(that.world[x][y_up]) neighbours += 1;
    if(that.world[x_right][y_up]) neighbours += 1;

    if(that.world[x_left][y]) neighbours += 1;
    if(that.world[x_right][y]) neighbours += 1;

    if(that.world[x_left][y_down]) neighbours += 1;
    if(that.world[x][y_down]) neighbours += 1;
    if(that.world[x_right][y_down]) neighbours += 1;

    var isAlive = (that.world[x][y] && (neighbours == 2 || neighbours == 3))
                  || (neighbours == 3);

    return isAlive;
  }

  this._setCell = function (x, y, state){
    that.world[x][y] = state;
  }

  this._clear = function(aWorld){
    if(aWorld == undefined){
      aWorld = that.world;
    }

    for(i = 0; i < n; i ++ ){
      aWorld[i] = [];
      for(j = 0; j < n; j ++){
        aWorld[i][j] = false;
      }
    }

    return aWorld;
  }


};

Life.prototype.setCell = function(x, y, state){
  this._setCell(x, y, state);
}

Life.prototype.step = function(fnCallback){
  this._step(fnCallback);
}

Life.prototype.clear = function(){
  this._clear();
}

exports.Life = Life;

exports.init = function(n){
  var newLife = new Life(n);
  newLife.clear();
  return newLife;
}
