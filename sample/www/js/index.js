//Global error handler!
window.onerror = function(msg, url, line) {
    // You can view the information in an alert to see things working
    // like so:
    var errStr = "Error: " + msg + "\nurl: " + url + "\nline #: " + line;
    console.log(errStr);
    alert(errStr);

    // If you return true, then error alerts (like in older versions of
    // Internet Explorer) will be suppressed.
    return false;
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var timerEl = document.getElementById('timer');
        var timerCount = 0;
        setInterval(function(){
            timerCount++;
            timerEl.innerText = timerCount;
        }, 1000);

        var btnStart = document.getElementById('btnStart');
        var btnStop = document.getElementById('btnStop');
        var btnTemporary = document.getElementById('btnTemporary');
        var message = document.getElementById('message');

        btnStart.addEventListener('click', function(){
            window.plugins.backgroundjs.lockBackgroundTime();
            message.innerText = 'Locked background processing indefinitely. Process away!';
        });

        btnStop.addEventListener('click', function(){
            window.plugins.backgroundjs.unlockBackgroundTime();
            message.innerText = 'Unlocked background processing. No more background operations :(';
        });

        btnTemporary.addEventListener('click', function(){
            window.plugins.backgroundjs.setBackgroundSeconds(10);
            message.innerText = 'Background processing for the next 10 seconds! Switch away!';
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
