
function BackgroundJS() {
}


BackgroundJS.prototype.PluginName = "BackgroundJS";

BackgroundJS.prototype.pInvoke = function(method, data, callbackOK, callbackError){
  if(data == null || data === undefined){ // `false` and `0` are valid values!
    data = [];
  }
  else if(!Array.isArray(data)){
    data = [data];
  }
  cordova.exec(callbackOK, callbackError, this.PluginName, method, data);
};





BackgroundJS.prototype.setBackgroundSeconds = function(seconds, callbackOK, callbackError){
  this.pInvoke("setBackgroundSeconds", seconds, callbackOK, callbackError);
};

BackgroundJS.prototype.lockBackgroundTime = function(callbackOK, callbackError){
  this.pInvoke("lockBackgroundTime", null, callbackOK, callbackError);
};

BackgroundJS.prototype.unlockBackgroundTime = function(callbackOK, callbackError){
  this.pInvoke("unlockBackgroundTime", null, callbackOK, callbackError);
};


BackgroundJS.install = function () {
  if (!window.plugins) {
    window.plugins = {};

  }

  window.plugins.backgroundjs = new BackgroundJS();
  return window.plugins.backgroundjs;

};

cordova.addConstructor(BackgroundJS.install);

