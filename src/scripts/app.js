// 
// AngularFire
// 
var todoApp = angular.module('TodoApp', ['firebase']);


todoApp.controller('TodoCtrl', ['$scope', '$firebaseArray', '$firebaseAuth',
    function($scope, $firebaseArray, $firebaseAuth) {

        $scope.headline = 'ToDo list using AngularJS, AngularFire and Firebase';

        // CONFIGURE FIREBASE ACCESS
        // 
        // 1. Create your free Firebase project at http://console.firebase.google.com
        // 2. Replace the object bellow with the one obteined from access snippet of your project
        // 3. Add the following rule in 'Database -> RULES' section to allow
        // unauthenticated users to access the teat application's data
        /* 
           "demo-Firebase": {
                ".read": true,
                ".write": true
            }
        */      
 
        var config = {
            apiKey: "apiKey",
            authDomain: "projectId.firebaseapp.com",
            databaseURL: "https://databaseName.firebaseio.com",
            storageBucket: "bucket.appspot.com",
        };
        try{
            firebase.initializeApp(config);
        }catch(error) {
            console.error('firebase.initializeApp (',error.code,"): ",error.message);
        };
        
        // CREATE A FIREBASE REFERENCE
        var todosRef = firebase.database().ref("demo-Firebase");

        // GET TODOS AS AN ARRAY
        $scope.todos = $firebaseArray(todosRef);

        // ADD TODO ITEM METHOD
        $scope.addTodo = function () {

            // CREATE A UNIQUE ID
            var timestamp = new Date().valueOf();

            $scope.todos.$add({
                id: timestamp,
                name: $scope.todoName,
                status: 'pending'
            });

            $scope.todoName = "";

        };

        // REMOVE TODO ITEM METHOD
        $scope.removeTodo = function (index, todo) {

            // CHECK THAT ITEM IS VALID
            if (todo.id === undefined)return;

            // FIREBASE: REMOVE ITEM FROM LIST
            $scope.todos.$remove(todo);

        };

        // MARK TODO AS IN PROGRESS METHOD
        $scope.startTodo = function (index, todo) {

            // CHECK THAT ITEM IS VALID
            if (todo.id === undefined)return;

            // UPDATE STATUS TO IN PROGRESS AND SAVE
            todo.status = 'in progress';
            $scope.todos.$save(todo);

        };

        // MARK TODO AS COMPLETE METHOD
        $scope.completeTodo = function (index, todo) {

            // CHECK THAT ITEM IS VALID
            if (todo.id === undefined)return;

            // UPDATE STATUS TO COMPLETE AND SAVE
            todo.status = 'complete';
            $scope.todos.$save(todo);
        };

    }]);


