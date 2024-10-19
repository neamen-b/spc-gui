const bulb = `💡`;
const bulb_div = document.getElementById('lightbulb')
let pid = null;
let vals : number[] = [.2,.3,.7,.8,.5]
let enc : number[] = vals.map(mapValueToPixel)



function flip() : string{
    if(bulb_div!.innerHTML == bulb) return bulb_div!.innerHTML='';
    return bulb_div!.innerHTML=bulb;

}
// <div class="bar red">.60</div>
//     <div class="bar yellow">.50</div>
//     <div class="bar green">.40</div>
//     <div class="bar green">.30</div>
//     <div class="bar yellow">.20</div>
//     <div class="bar red">.10</div>

// let points = document.getElementById("points-div")!

const pointsDiv =document.getElementById("points-div")!
const codeDiv = document.getElementById('code')! as HTMLInputElement;
pointsDiv.innerHTML='';
function addPoint(){
    vals.shift(); enc.shift();
    const val = Number(codeDiv.value);
    const e = mapValueToPixel(val);
    vals.push(val)
    enc.push(mapValueToPixel(vals[vals.length-1]))
    console.log('val',val,'e',e)
    const ans = vals.map((v,i)=>`<div class='point' style='margin-left:${(i+1)*125}px; top:${mapValueToPixel(v)}px'></div>`)
    console.log(ans,vals)
    pointsDiv.innerHTML=ans.join('')
    // const ar  = vals.map((v,i)=>`<div class='point' style='left:${i*50}px></div>"`)
    // console.log(ar)
    // document.getElementById("points-div")!.innerHTML=ar.join('');

}

addPoint()
function mapValueToPixel(value:number):number {
    const maxValue = 0.6;
    const maxPixel = 290;
    
    // Ensure the value is within the expected range
    if (value < 0) value = 0;
    if (value > maxValue) value = maxValue;

    // Map the value to pixel position
    const ans = maxPixel - (value / maxValue * maxPixel);
    console.log('value',value,'ans',ans)
    return ans
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


function panic(){
    bulb_div!.style.background='red'


    pid = setInterval(()=>{flip()},300)
}


function calm(){
    bulb_div!.style.background='transparent'
}


// panic()
// calm()

