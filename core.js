"use strict";
var cvm = new courseViewModel();

var data = coursesArray;

var colorIndex = 0;
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
function courseViewModel() {
    var self = this;
    self.courses = ko.observableArray();
    self.scalingFactor = ko.observable();
    self.scalingFactor(30);
    self.days = [
        { day: "Monday", abb: "M" },
        { day: "Tuesday", abb: "T" },
        { day: "Wednesday", abb: "W" },
        { day: "Thursday", abb: "R" },
        { day: "Friday", abb: "F" },
        { day: "Saturday", abb: "S" },
        {day : "Sunday", abb:"X"}
    ]
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



    ]
}
function course(title,id, startTime, endTime, days) {
    var self = this;
    self.title = ko.observable(title);
    self.id = ko.observable(id);
    self.startTime = ko.observable(parseFloat(startTime));
    self.endTime = ko.observable(parseFloat(endTime));
    self.days = ko.observable(days);
    self.height = ko.observable(self.endTime() - self.startTime());
    self.color = colors[colorIndex];
    colorIndex++;
    for (var index = 0; index < cvm.courses().length; index++) {
        if (self.id == cvm.courses()[index].id) {
            self.color = cvm.courses()[index].color;
            colorIndex--;
        }
    }
    
    
}
$(document).ready(function () {
    ko.applyBindings(cvm,document.getElementById('target'), new courseViewModel());

    $(document).on('click', '#AddClassButton', function () {
        readForm();
    });

});
function readForm() {
    var courseTitle = $('#courseTitle').val();
    var courseID = $('#courseID').val();
    var startTime = $('#courseStart').val();
    var endTime = $('#courseEnd').val();
    var courseDays = $('#courseDays').val();
    if (courseID == "" || startTime == "" || endTime == "") {
        alert("Please Fill out the required fields");
    }
    else {
        cvm.courses.push(new course(courseTitle, courseID, startTime, endTime, courseDays));
        $('#courseTitle').val("");
        $('#courseID').val("");
        $('#courseStart').val("");
        $('#courseEnd').val("");
        $('#courseDays').val("");
    }
}
