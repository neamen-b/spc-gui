"use strict";
const bulb = `💡`;
const bulb_div = document.getElementById('lightbulb');
let pid = null;
let vals = [.2, .3, .7, .8, .5];
let enc = vals.map(mapValueToPixel);
function flip() {
    if (bulb_div.innerHTML == bulb)
        return bulb_div.innerHTML = '';
    return bulb_div.innerHTML = bulb;
}
// <div class="bar red">.60</div>
//     <div class="bar yellow">.50</div>
//     <div class="bar green">.40</div>
//     <div class="bar green">.30</div>
//     <div class="bar yellow">.20</div>
//     <div class="bar red">.10</div>
// let points = document.getElementById("points-div")!
const pointsDiv = document.getElementById("points-div");
const codeDiv = document.getElementById('code');

pointsDiv.innerHTML = '';
let lastYellowClick = null;

function addPoint() {
    vals.shift();
    enc.shift();
    
    const val = Number(codeDiv.value);
    const e = mapValueToPixel(val);
    vals.push(val);
    enc.push(mapValueToPixel(vals[vals.length - 1]));
    pointsDiv.innerHTML = vals.map((v, i) => `<div class='point' style='margin-left:${(i + 1) * 125}px; top:${mapValueToPixel(v)}px'></div>`).join('');

    if (val >= 0.6) {
        panic();
        alert('Measurement in top red! Tighten the screw and remeasure.');
    } else if (val <= 0.2) {
        panic();
        alert('Measurement in bottom red! Loosen the screw and remeasure.');
    } else if (val >= 0.4 && val <= 0.6) {
        if (lastYellowClick === 'top') {
            panic();
            alert('Two clicks in top yellow! Tighten the screw.');
        }
        lastYellowClick = 'top';
    } else if (val >= 0.2 && val < 0.4) {
        if (lastYellowClick === 'bottom') {
            panic();
            alert('Two clicks in bottom yellow! Loosen the screw.');
        }
        lastYellowClick = 'bottom';
    } else {
        calm();
        lastYellowClick = null;
    }

    clearInterval(pid);
    pid = setInterval(() => {
        panic();
        alert('Please take a measurement!');
    }, 60000);
}

addPoint();
function mapValueToPixel(value) {
    const maxValue = 0.6;
    const maxPixel = 290;
    // Ensure the value is within the expected range
    if (value < 0)
        value = 0;
    if (value > maxValue)
        value = maxValue;
    // Map the value to pixel position
    const ans = maxPixel - (value / maxValue * maxPixel);
    console.log('value', value, 'ans', ans);
    return ans;
}
// function scale(x:number):number{
//     if(x>.6) return 0;
//     if(x<0) return 290;
//     return 290*
// }
// function measurmentToCircleDiv(v:number,i:number){
//     const div = `<div class="point" style="margin-left: 650px; top: 0px;"></div>`;
//     return 
// }
// addPoint()
function panic() {
    bulb_div.style.background = 'red';
    pid = setInterval(() => { flip(); }, 300);
}
function calm() {
    bulb_div.style.background = 'transparent';
}
// panic()
// calm()
