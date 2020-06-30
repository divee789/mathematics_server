function round2d(n) {
    return 0.01 * Math.round(100 * n);
}
//define valid grades and their values
const gr = new Array();
const cr = new Array();
const ingr = new Array();
const incr = new Array();
// define valid grades and their values
const grcount = 9;
gr[1] = 'A';
cr[1] = 4;
gr[4] = 'B';
cr[4] = 3;
gr[5] = 'B';
cr[5] = 2;
gr[7] = 'C';
cr[7] = 2;
gr[8] = 'F';
cr[8] = 0;
////////////////////////////////////////////////////////////
// GPA CALC FUNCTION
////////////////////////////////////////////////////////////
function gpacalc(data, number_of_courses) {
    // Calculate GPA
    let allgr = 0;
    let allcr = 0;
    let gpa = 0;
    for (let x = 0; x < number_of_courses; x++) {
        if (data[x] == '')
            break;
        var validgrcheck = 0;
        for (let xx = 0; xx < grcount; xx++) {
            if (data[x] == gr[xx]) {
                allgr = allgr + parseInt(incr[x], 10) * cr[xx];
                allcr = allcr + parseInt(incr[x], 10);
                validgrcheck = 1;
                break;
            }
        }
    }
    gpa = round2d(allgr / allcr);
    alert('Your semester GPA =  ' + gpa);
    return 0;
}
