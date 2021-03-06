angular.module('starter.controllers', ['simplePagination']) 
.controller('FormController', function($scope) {
}) 
.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
})
.controller('contactCtrl', function ($scope) { 
    $scope.listUser=[];
    $scope.id=0; 
    $scope.insertShow=true;
    $scope.updateShow=false;
    $scope.master={id:$scope.id,'firstname':'Brendon','lastname':'McCullum'};
    $scope.reset=function(){
        $scope.listUser=[];
        $scope.user=angular.copy($scope.master);
        $scope.id=0;
    }
    $scope.reset();   
    $scope.insert=function(){
        $scope.id=$scope.id+1;
        $scope.listUser.push({id:$scope.id,firstname:$scope.user.firstname,lastname:$scope.user.lastname});
        console.log($scope.listUser);
    }
    $scope.sortEr=function(x){ 
       $scope.sortErBy=x; 
   }
   $scope.delete=function(id){ 
    var oldList=$scope.listUser;
    $scope.listUser=[];
    angular.forEach(oldList, function(x) { 
        if(x['id']!=id){
            $scope.listUser.push(x);
        }  
    })
}
$scope.edite=function(id,fname,lname){
    $scope.insertShow=false;
    $scope.updateShow=true;
    $scope.updateId=id;
    $scope.user.firstname=fname;
    $scope.user.lastname=lname;
}
$scope.update=function(id){ 
    var oldList=$scope.listUser;
    $scope.listUser=[];
    angular.forEach(oldList,function(x){ 
        if(x['id']!=id){
            $scope.listUser.push(x);
        } 
    })
    $scope.listUser.push({id:id,firstname:$scope.user.firstname,lastname:$scope.user.lastname});
    $scope.insertShow=true;
    $scope.updateShow=false;
    $scope.user.firstname='';
    $scope.user.lastname='';
}

$scope.currentPage = 0;
$scope.pageSize = 5;
$scope.data = [];
$scope.numberOfPages=function(){
    return Math.ceil($scope.data.length/$scope.pageSize);                
}
for (var i=0; i<45; i++) {
    $scope.data.push("Item "+i);
}
})
.controller('ListClients', function($scope,ClientList) {    
	$scope.clientLists =[];
	ClientList.getdata(function(response){
		for(var key in response){
			$scope.clientLists.push(response[key]);
			
       }
	});//console.log($scope.clientLists);
})
.controller('test1Ctrl',function($scope, $http){
    $scope.closeAttr=true;
    $scope.tableList=function(){
        $http.get("http://www.w3schools.com/angular/customers.php")
        .then(function (response) {$scope.names = response.data.records;});
    }
    $scope.tableListClose=function(){ 
        $scope.names =[]; 
    }
    $scope.dynAddDelete=function(){ 
        $scope.closeAttr=false;
        $scope.products = ["Milk", "Bread", "Cheese"];
        $scope.remindText='';
        $scope.addItem = function () {
            if(!$scope.addMe){
                return;
            }
            if($scope.products.indexOf($scope.addMe)==-1){
                $scope.products.push($scope.addMe);
                $scope.addMe='';
            }else{
                $scope.remindText='This is already added!Duplicate Entry Privented';
            }
            
        }
        $scope.removeItem = function (x) {
            $scope.products.splice(x, 1);
        }
    }
    $scope.dynAddDeleteClose=function(){
        $scope.products =[];
        $scope.closeAttr=true;
    }
    $scope.showToDoList=function(){
        $scope.toDoList=[{todoTest:'The wall' ,done:false}];
        $scope.addToDoLists=function(){ 
            if(!$scope.addToDoList){
                return;
            }else{
                $scope.toDoList.push({todoTest:$scope.addToDoList,done:false}); 
            }
        }
    }

})
.controller('FileUploadCtrl',function($scope){
	//============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox = document.getElementById("dropbox")
    $scope.dropText = 'Drop files here...'

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false)
    dropbox.addEventListener("dragleave", dragEnterLeave, false)
    dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        var clazz = 'not-available'
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
        $scope.$apply(function(){
            $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
            $scope.dropClass = ok ? 'over' : 'not-available'
        })
    }, false)
    dropbox.addEventListener("drop", function(evt) {
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
        var files = evt.dataTransfer.files
        if (files.length > 0) {
            $scope.$apply(function(){
                $scope.files = []
                for (var i = 0; i < files.length; i++) {
                    $scope.files.push(files[i])
                }
            })
        }
    }, false)
    //============== DRAG & DROP =============

    $scope.setFiles = function(element) {
        $scope.$apply(function($scope) {
          console.log('files:', element.files);
      // Turn the FileList object into an Array
      $scope.files = []
      for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i])
      }
      $scope.progressVisible = false
  });
    };

    $scope.uploadFile = function() {
        var fd = new FormData()
        for (var i in $scope.files) {
            fd.append("uploadedFile", $scope.files[i])
        }
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.addEventListener("error", uploadFailed, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", "/fileupload")
        $scope.progressVisible = true
        xhr.send(fd)
    }

    function uploadProgress(evt) {
        $scope.$apply(function(){
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        $scope.$apply(function(){
            $scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }
})

