(function(annyang) {
  'use strict';

  function TodoService($http) {
    var service = {};

    service.todo = null;
    service.tasks = [];

    service.init = function() {
      return $http.get('https://todoist.com/API/query?queries=["viewall"]&token='+config.todo.key).
        then(function(response) {
          return service.todo = response.data;
        });
    };

    service.refreshTodoList = function() {
      return service.init();
    };

    service.getTaskList = function() {
      var tasks = [];
      var k = 1;
      if (service.todo == null) {
        return null;
      }      
      for (var i = 0; i < service.todo[0].data.length; i++) {
        for (var j = 0; j < service.todo[0].data[i].uncompleted.length; j++ ) {
          var cur_task = {};
          cur_task.summary    = service.todo[0].data[i].uncompleted[j].content;
          if (service.todo[0].data[i].uncompleted[j].due_date == null) {
            cur_task.dueDate  = null;
          }
          else {
            cur_task.dueDate  = service.todo[0].data[i].uncompleted[j].date_string;
          }
          cur_task.priority   = service.todo[0].data[i].uncompleted[j].priority;
          cur_task.id         = service.todo[0].data[i].uncompleted[j].id;
          cur_task.dispId     = k;
          k = k+1;
          tasks.push(cur_task);
        }
      }
      return service.tasks = tasks;
    };

    service.addTask = function(spokenWords){
      console.log("Add Task : ", spokenWords);
      var spokenWordsCap = spokenWords.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      return $http.post('https://todoist.com/API/addItem?content=' + spokenWordsCap + '&project_id='+config.todo.project+'&priority=1&token=' + config.todo.key); 
    }; 

    service.removeTask = function(spokenWords){ 
      if(service.tasks === null){
          return null;
      } 
      var idx = Number(spokenWords);
      var taskId = 0;

      service.tasks.forEach(function(itm) {
        if (itm.dispId == idx) {
          taskId = itm.id;
        };
      });
      console.log("Delete Task : ", idx + '[' + taskId + ']');
      return $http.post('https://todoist.com/API/deleteItems?ids=['+ taskId +']&token='+config.todo.key);
    };

    return service;
  }

  angular.module('SmartMirror')
    .factory('TodoService', TodoService);
}(window.annyang));

