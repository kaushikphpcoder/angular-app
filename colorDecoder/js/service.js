angular.module('starter.service', [])
.factory('ClientList',function($http){ 
  var url='http://10.10.0.235/laraveldemo';
  var getdata = function(callback) {
   return $http.get(url+'/client-list', {headers: {'Content-Type': 'application/json'},dataType: 'json' }).then(function(result) { 
    callback(result.data);
  })
 }
 return  { getdata: getdata }; 
})