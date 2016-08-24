var sampleApp = angular.module('starter', ['ngRoute','starter.controllers','starter.service']);

sampleApp.config(['$routeProvider',function($routeProvider) { 
 $routeProvider
 .when('/addColor', {
		templateUrl: 'template/form.html',
		controller: 'FormController',
})
 .when('/', {
        templateUrl: 'template/frontpage.html',
        //controller: 'FormController2'
            })
 .when('/ColorMatch', {
	    templateUrl: 'template/colormatch.html',
	    controller: 'ListClients',
            })
 .when('/DisplayTypes',{
 		templateUrl: 'template/displayType.html',
 		controller: 'displayType',
 })
 .when('/imageUploader',{
 		templateUrl: 'template/imageUploader.html', 
 		controller: 'FileUploadCtrl' ,
 })
 .when('/test1',{
 		templateUrl: 'template/test1.html', 
 		controller: 'test1Ctrl' ,
 })
 .otherwise({
        redirectTo: '/viewCounts'
});
}]);
