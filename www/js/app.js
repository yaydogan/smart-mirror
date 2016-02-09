(function(angular) {
    'use strict';
    
    //Add Smart Mirror Module
    angular.module('SmartMirror', ['ngAnimate']);
    
    var MirrorInit = function() {

        var onDeviceReady = function() {
            //Check for media permissions
            var src = "myrecording.mp3";
            var media = new Media(src,
                // We have sufficient permissions
                function() {
                    console.log("recordAudio():Audio Success");
                    media.stopRecord();
                    media.release();
                },
                // We don't have the correct permissions
                function(err) {
                    console.log("recordAudio():Audio Error: "+ err.code);
                    alert("The smart mirror needs Audio and File permissions to run. Grant these permissions and restart the app.");
                });
            
            // Get microphone permissions
            media.setVolume(0);
            media.startRecord();
            media.stopRecord();
            media.release();
            
            // Get geolocation permissions
            navigator.geolocation.getCurrentPosition(function(pos){console.log(pos);}, function(error){alert("Smart mirror needs location permissions to run", error)});
            
            receivedEvent('deviceready');
        };

        var receivedEvent = function(event) {
            console.log('Start event received, bootstrapping application setup.');
            angular.bootstrap(document, ['SmartMirror']);
        };

        this.bindEvents = function() {
            document.addEventListener('deviceready', onDeviceReady, false);
        };

        //If cordova is present, wait for it to initialize, otherwise just try to
        //bootstrap the application.
        if (window.cordova !== undefined) {
            console.log('Cordova found, wating for device.');
            this.bindEvents();
        } else {
            angular.element(document).ready(function() {
                console.log('Cordova not found, booting application');
                receivedEvent('manual');
            });
        }
    };
    
    console.log('Bootstrapping!');
	new MirrorInit();

}(window.angular));