"use strict";

const bulb = `💡`;
const bulb_div = document.getElementById('lightbulb');
let pid = null; // For the periodic reminder
let flashInterval = null; // For bulb flashing
let vals = [.2, .3, .7, .8, .5];
let enc = vals.map(mapValueToPixel);
let lastYellowClick = null;

const pointsDiv = document.getElementById("points-div");
const codeDiv = document.getElementById('code');

pointsDiv.innerHTML = '';

function flip() {
    if (bulb_div.innerHTML === bulb) {
        return bulb_div.innerHTML = '';
    }
    return bulb_div.innerHTML = bulb;
}

function addPoint() {
    vals.shift();
    enc.shift();
    
    const val = Number(codeDiv.value);
    const e = mapValueToPixel(val);
    
    vals.push(val);
    enc.push(mapValueToPixel(vals[vals.length - 1]));
    
    pointsDiv.innerHTML = vals.map((v, i) => 
        `<div class='point' style='margin-left:${(i + 1) * 125}px; top:${mapValueToPixel(v)}px'></div>`
    ).join('');

    if (val >= 0.5) {
        panic();
        alert('Measurement in top red! Tighten the screw and remeasure.');
    } else if (val <= 0.1) {
        panic();
        alert('Measurement in bottom red! Loosen the screw and remeasure.');
    } else if (val >= 0.4 && val <= 0.5) {
        if (lastYellowClick === 'top') {
            panic();
            alert('Two clicks in top yellow! Tighten the screw.');
        }
        lastYellowClick = 'top';
    } else if (val >= 0.1 && val < 0.2) {
        if (lastYellowClick === 'bottom') {
            panic();
            alert('Two clicks in bottom yellow! Loosen the screw.');
        }
        lastYellowClick = 'bottom';
    } else {
        calm();
        lastYellowClick = null;
    }

    // Ensure the reminder only flashes after the latest measurement
    if (pid !== null) {
        clearTimeout(pid); // Clear any previous timeout
    }
    pid = setTimeout(() => {
        panic();
        alert('Please take a measurement!');
    }, 60000); // 1 minute in milliseconds
}

function mapValueToPixel(value) {
    const maxValue = 0.6;
    const maxPixel = 290;
    if (value < 0) value = 0;
    if (value > maxValue) value = maxValue;

    return maxPixel - (value / maxValue * maxPixel);
}

function panic() {
    bulb_div.style.background = 'red';
    if (flashInterval !== null) {
        clearInterval(flashInterval);
    }
    flashInterval = setInterval(() => { flip(); }, 500); // Flash every 500ms
}

function calm() {
    bulb_div.style.background = 'transparent';
    if (flashInterval !== null) {
        clearInterval(flashInterval);
        flashInterval = null;
    }
}

addPoint();
