// Finds schedules with the given title constraints

db = coursesArray;

// var titles = ['software engineering', 'compiler theory', 'software testing']; //, 'compiler theory'
var titles = ['Materials Laboratory', 'Intro to Human Factors', 'Advanced Human Factors', 'Aviation Security', 'Aviation Statistics']

var stationary = {};
var options = [];
var schedule = [];
for (i = 0; i < titles.length; i++) {
    stationary[titles[i]] = [];
}

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
            if (titles[i] == db[j].TITLE) {
                stationary[titles[i]].push(db[j]);//id
                // options.push(db[j]);
            }
        }
    }

    for (var i in stationary) {
        options.push(stationary[i]);
    }
    options = cartesian(options)

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

            for (v in options[o][m].occu) {
                if (options[o][m].occu[v].days.indexOf('M') > -1) {
                    time1.push(options[o][m].occu[v].st);
                    time1.push(options[o][m].occu[v].end);
                }
                if (options[o][m].occu[v].days.indexOf('T') > -1) {
                    time2.push(options[o][m].occu[v].st);
                    time2.push(options[o][m].occu[v].end);
                }
                if (options[o][m].occu[v].days.indexOf('W') > -1) {
                    time3.push(options[o][m].occu[v].st);
                    time3.push(options[o][m].occu[v].end);
                }
                if (options[o][m].occu[v].days.indexOf('R') > -1) {
                    time4.push(options[o][m].occu[v].st);
                    time4.push(options[o][m].occu[v].end);
                }
                if (options[o][m].occu[v].days.indexOf('F') > -1) {
                    time5.push(options[o][m].occu[v].st);
                    time5.push(options[o][m].occu[v].end);
                }
                if (options[o][m].occu[v].days.indexOf('S') > -1) {
                    time6.push(options[o][m].occu[v].st);
                    time6.push(options[o][m].occu[v].end);
                }
            }
            solutions.push(options[o][m].CRN);
        }
        flag = !multipleDateRangeOverlaps(time1) &&
            !multipleDateRangeOverlaps(time2) && !multipleDateRangeOverlaps(time3) &&
            !multipleDateRangeOverlaps(time4) && !multipleDateRangeOverlaps(time5) && !multipleDateRangeOverlaps(time6);
        //check time
        if (flag) {
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
    return schedule;

}

var s = solve(db, titles);
console.log(s)
