"use strict";

var cvm = new scheduleViewModel();

var data = coursesArray;

var colorIndex = 0;
var formOpen = ko.observable(false);
var schedules = ko.observableArray();

var colors = colors = [
        { color: "Cobalt" },
        { color: "Crimson" },
        { color: "Cyan" },
        { color: "Violet" },
        { color: "Magenta" },
        { color: "Teal" },
        { color: "Green" },
        { color: "Red" },
        { color: "Steel" }
]

function scheduleViewModel() {
    var self = this;
    //self.courses = ko.observableArray();
    self.courseList = [];
    self.schedules = ko.observableArray();
    self.scalingFactor = ko.observable();
    self.scalingFactor(30);
    self.days = [
        { day: "Mon", abb: "M" },
        { day: "Tue", abb: "T" },
        { day: "Wed", abb: "W" },
        { day: "Thu", abb: "R" },
        { day: "Fri", abb: "F" },
        { day: "Sat", abb: "S" },
        { day: "Sun", abb: "X" }
    ];
    self.times = [
        { time: 800 },
        { time: 900 },
        { time: 1000 },
        { time: 1100 },
        { time: 1200 },
        { time: 1300 },
        { time: 1400 },
        { time: 1500 },
        { time: 1600 },
        { time: 1700 },
        { time: 1800 },
        { time: 1900 },
        { time: 2000 },
        { time: 2100 },
        { time: 2200 }
    ];
}
function scheduleObject() {
    var self = this;
    self.courses = ko.observableArray();
}


function lookup(CRN) {
    for (var i=0; i<data.length; i++) {
        if (data[i].CRN == CRN) {
            return data[i];
        }
    }
    return 'NONE'
}

function course(title, id, startTime, endTime, days) {
    var self = this;
    self.title = ko.observable(title);
    self.id = ko.observable(id);
    self.startTime = ko.observable(parseFloat(startTime));
    self.endTime = ko.observable(parseFloat(endTime));
    self.days = ko.observable(days);
    self.height = ko.observable(self.endTime() - self.startTime());
    self.color = colors[colorIndex];
    colorIndex++;
    /*
    for (var index = 0; index < cvm.courses().length; index++) {
        if (self.id == cvm.courses()[index].id) {
            self.color = cvm.courses()[index].color;
            colorIndex--;
        }
    }*/


}
$(document).ready(function () {
    ko.applyBindings(cvm, document.getElementById('target'));

    $(document).on('click', '#AddClassButton', function () {
        readForm();

    });

    $(document).on('click', '#addCourse', function () {
        showForm();
    });

    $(document).on('click', '#close', function () {
        closeForm();
    });

    $(document).on('click', '#aboutPage', function () {
        window.location = "./about.html";
    });
});
function readForm() {
    cvm.schedules.removeAll();
    var courseTitle = $('#courseTitle').val();
    for (var i = 0; i < coursesArray.length; i++) {
        if (coursesArray[i].TITLE == courseTitle) {
            console.log(coursesArray[i].TITLE);

        }
    }
    cvm.courseList.push(courseTitle);
    console.log(cvm.courseList);
    var result = solve(cvm.courseList);
    console.log(result);
   
    
    for (var index = 0; index < result.length; index++) {
        var newSchedule = new scheduleObject();
        var cs = result[index].id.split(',');
        for (var x = 0; x < cs.length; x++){
           
            console.log(":" + $.trim(cs[x]) + ":");
            var csn = $.trim(cs[x]);
            newSchedule.courses().push(lookup(csn));
            console.log(lookup(csn));
        }
        cvm.schedules.push(newSchedule);
       
    }
    console.log(newSchedule.courses().length);
   /* var courseID = $('#courseID').val();
    var startTime = $('#courseStart').val();
    var endTime = $('#courseEnd').val();
    var courseDays = $('#courseDays').val().toUpperCase();
    if (courseID == "" || startTime == "" || endTime == "") {
        alert("Please Fill out the required fields");
    }
    else {*/
        //cvm.courses.push(new course(courseTitle, courseID, startTime, endTime, courseDays));
    

    console.log(cvm.schedules().length);
    closeForm();
    //}
}

function computeSchedule() {
    for (var i = 0; i < coursesArray.length; i++) {
        if (coursesArray[i].TITLE == courseTitle) {
            console.log(coursesArray[i].TITLE);

        }
    }
}


function showForm() {
    formOpen(true);
}
function closeForm() {
    clearForm();
    formOpen(false);
}
function clearForm() {
    $('#courseTitle').val("");
    $('#courseID').val("");
    $('#courseStart').val("");
    $('#courseEnd').val("");
    $('#courseDays').val("");
}
