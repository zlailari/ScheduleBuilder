// function DataEntry(title, id, teacher, startTime, endTime, days) {
// 	this.title = title;
// 	this.id =  id;
// 	this.teacher = teacher;
// 	this.occu=[];
// 	this.startTime = startTime;
// 	this.endTime=endTime;
// 	this.days=days;
// }
//test1 : c1, c2 no conflicts, same class, should not show two
// test 2: conflicts, 
var c1 = {
    id: '2010',
    title: 'compiler theory',
    occu: [{
        st: '1100',
        et: '1150',
        days: 'MWF'
    }]
}

var c2 = {
    id: '3415',
    title: 'compiler theory',
    occu: [{
        st: '1500',
        et: '1550',
        days: 'MWF'
    }]
}


var c3 = {
    id: '3133',
    title: 'software engineering',
    occu: [{
        st: '1600',
        et: '1650',
        days: 'MWF'
    }]
}

var c4 = {
    id: '4111',
    title: 'software testing',
    occu: [{
        st: '1700',
        et: '1750',
        days: 'MWF'
    }]
}

var c5 = {
    id: '5098',
    title: 'software testing',
    occu: [{
        st: '1630',
        et: '1640',
        days: 'WF'
    }]
}

//courses
// var database = {
//         'software engineering': [{occu: {}},{occu:}],
//         'compiler theory': []
// }
// db = [];
// db.push(c1);
// db.push(c2);
// db.push(c3);
// db.push(c4);
// db.push(c5);
db = coursesArray;

var titles = ['software engineering', 'compiler theory', 'software testing']; //, 'compiler theory'
var stationary = {};
var options = [];
var schedule = [];
for (i = 0; i < titles.length; i++) {
    stationary[titles[i]] = [];
}
console.log(stationary);

function cartesian(arg) {
    var r = [],
        max = arg.length - 1;

    function helper(arr, i) {
        for (var j = 0, l = arg[i].length; j < l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(arg[i][j]);
            if (i == max)
                r.push(a);
            else
                helper(a, i + 1);
        }
    }
    helper([], 0);
    return r;
}

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
    if (b_start < a_start && a_end < b_end) return true; // a in b
    return false;
}

function multipleDateRangeOverlaps(arguments) {
    var i, j;
    if (arguments.length % 2 !== 0)
        throw new TypeError('Arguments length must be a multiple of 2');
    for (i = 0; i < arguments.length - 2; i += 2) {
        for (j = i + 2; j < arguments.length; j += 2) {
            if (
                dateRangeOverlaps(
                    arguments[i], arguments[i + 1],
                    arguments[j], arguments[j + 1]
                )
            ) return true;
        }
    }
    return false; //no overlap
}

function solve(db, titles) {
    for (i = 0; i < titles.length; i++) {
        for (j = 0; j < db.length; j++) {
            if (titles[i] == db[j].title) {
                stationary[id[i]].push(db[j]);//id
                // options.push(db[j]);
            }
        }
    }
    console.log('stationary:');
    console.log(stationary);

    // console.log(cartesian(options));
    for (var i in stationary) {
        options.push(stationary[i]);
    }
    //console.log('options');
    options = cartesian(options)
    //console.log(options);

    var time1 = []; //monday
    var time2 = [];
    var time3 = [];
    var time4 = [];
    var time5 = [];
    var time6 = []; //saturday
    var flag = true;
    var solutions = [];

    for (var o in options) { //0 ,1, 2 
        //each possible schedule	
        for (var m in options[o]) {
            // console.log('options[o][m] :');
            // {
            //     id: '3',
            //     title: 'software engineering',
            //     occu: [{
            //         st: '1600',
            //         et: '1650',
            //         days: 'MWF'
            //     }, {
            //         st: '1000',
            //         et: '1050',
            //         days: 'T'
            //     }]
            // }

            for (v in options[o][m].occu) {
                // console.log('options om :');
                // console.log(options[o][m]);
                // console.log(options[o][m]);
                if (options[o][m].occu[v].days.indexOf('M') > -1) {
                    time1.push(options[o][m].occu[v].st);
                    time1.push(options[o][m].occu[v].et);
                }
                if (options[o][m].occu[v].days.indexOf('T') > -1) {
                    time2.push(options[o][m].occu[v].st);
                    time2.push(options[o][m].occu[v].et);
                }
                if (options[o][m].occu[v].days.indexOf('W') > -1) {
                    time3.push(options[o][m].occu[v].st);
                    time3.push(options[o][m].occu[v].et);
                }
                if (options[o][m].occu[v].days.indexOf('R') > -1) {
                    time4.push(options[o][m].occu[v].st);
                    time4.push(options[o][m].occu[v].et);
                }
                if (options[o][m].occu[v].days.indexOf('F') > -1) {
                    time5.push(options[o][m].occu[v].st);
                    time5.push(options[o][m].occu[v].et);
                }
                if (options[o][m].occu[v].days.indexOf('S') > -1) {
                    time6.push(options[o][m].occu[v].st);
                    time6.push(options[o][m].occu[v].et);
                }
                //console.log(options[o][m].occu[v].st);
                //console.log(options[o][m].occu[v].et);
                // console.log();
            }
            //console.log('----');
            solutions.push(options[o][m].id);
           	// if(options[o][m].id=='')
           	//console.log('********');
            //	console.log(options[o][m].id);
        }
        console.log('solution');
        //console.log(solution);
        console.log('time1');
        console.log(time1);
        flag = !multipleDateRangeOverlaps(time1) &&
            !multipleDateRangeOverlaps(time2) && !multipleDateRangeOverlaps(time3) &&
            !multipleDateRangeOverlaps(time4) && !multipleDateRangeOverlaps(time5) && !multipleDateRangeOverlaps(time6);
        //console.log(flag);
        //check time
        if (flag) {
            //console.log('one solution: ' + solution);
            solutions = solutions +' ';
            schedule.push({id:solutions});
        }

        time1 = [];
        time2 = [];
        time3 = [];
        time4 = [];
        time5 = [];
        time6 = [];
        solutions = [];
    }
    // console.log('schedule');
    // console.log(schedule);
    return schedule;

}


var s = solve(db, id);
console.log(s);