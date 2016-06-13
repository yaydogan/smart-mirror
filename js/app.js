// Bootstrap Angular
(function(angular) {
    'use strict';
    
    var language = (typeof config.language != 'undefined')?config.language.substring(0, 2).toLowerCase(): 'en';
    
    angular.module('SmartMirror', ['ngAnimate', 'tmh.dynamicLocale', 'pascalprecht.translate'])
        .config(function(tmhDynamicLocaleProvider) {
            console.log(config)
            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_' + language + '.js');
        })
        
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider
                .uniformLanguageTag('bcp47')
                .useStaticFilesLoader({
                    prefix: 'locales/',
                    suffix: '.json'
                });
            $translateProvider.useSanitizeValueStrategy(null);
            // Avoiding the duplicity of the locale for the default language, xx-YY -> xx
            // We are considering only the language
            // Please refer https://github.com/evancohen/smart-mirror/pull/179 for further discussion
            var language = (typeof config.language != 'undefined')?config.language.substring(0, 2): 'en';
            $translateProvider.preferredLanguage(language);
        }])
        
        .config(["$sceDelegateProvider", function($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                "http://www.youtube.com/embed/**"
            ]);
        }]);

}(window.angular));
