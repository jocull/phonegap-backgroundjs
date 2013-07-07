
var BackgroundJS = {

    PluginName: "BackgroundJS",

    PInvoke: function(method, data, callbackOK, callbackError){
        if(data == null || data === undefined){ // `false` and `0` are valid values!
            data = [];
        }
        else if(!Array.isArray(data)){
            data = [data];
        }
        cordova.exec(callbackOK, callbackError, this.PluginName, method, data);
    },

    SetBackgroundSeconds: function(seconds, callbackOK, callbackError){
        this.PInvoke("setBackgroundSeconds", seconds, callbackOK, callbackError);
    },

    LockBackgroundTime: function(callbackOK, callbackError){
        this.PInvoke("lockBackgroundTime", null, callbackOK, callbackError);
    },

    UnlockBackgroundTime: function(callbackOK, callbackError){
        this.PInvoke("unlockBackgroundTime", null, callbackOK, callbackError);
    }
    
}