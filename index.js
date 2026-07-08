const secondInput=document.querySelector(".seconds")
const minuteInput=document.querySelector(".minutes")
const hourInput=document.querySelector(".hours")
const timeDiv=document.querySelector(".timeDiv")

let beeImg=document.querySelector("img")

const beeAudioOne = new Audio('beesOne.mp3');
const beeAudioTwo = new Audio('beesTwo.mp3');
const victory = new Audio('victory.mp3');


let seconds;
let minutes;
let hours;

let secondLength;

let timeFreezeCount=0;

let animationFrame;
let prevTime=Date.now();

let mouseDown=false;

document.querySelector("button").addEventListener("click",reset)

timeDiv.addEventListener("mousedown",(e)=>{
    mouseDown=true
})

document.addEventListener("mouseup",(e)=>{
    mouseDown=false
})

timeDiv.addEventListener("mousemove",(e)=>{
    if(mouseDown){
        timeDiv.style.position="absolute"
        timeDiv.style.top=e.clientY-40+"px"
        timeDiv.style.left=e.clientX-80+"px"
    }
})

function reset(){
    beeImg.style.display="none"
    seconds=0;
    minutes=10;
    hours=0;
    secondLength=1000;
    timeDiv.style.position="relative"
    timeDiv.style.top=0+"px"
    timeDiv.style.left=0+"px"
    prevTime=Date.now();
    document.querySelector("button").innerText="Reset"
    if(animationFrame){
        window.cancelAnimationFrame(animationFrame)
    }
    window.requestAnimationFrame(loop)
}

function loop(){
    if(Date.now()-prevTime>secondLength){
        beeImg.style.display="none"
        prevTime=Date.now();
        if(timeFreezeCount!=0){
            timeFreezeCount--
        }else{
            let random=randint(0,100)
            if(random<=5){
                //add second
                seconds+=1
            }else if(random<=6){
                //add minute
                minutes+=1
            }else if(random<=7){
                //subtract minute
                minutes-=1
            }else if(random<=12){
                //freeze for 5s
                timeFreezeCount=4
            }else if(random<=13){
                //double time
                seconds*=2
                minutes*=2
                hours*=2
            }else if(random<=14){
                //divide time by 2
                hours/=2
                minutes/=2
                seconds=Math.floor(seconds/2)

                let fractHours=hours-Math.floor(hours)
                minutes+=Math.round(fractHours*60)
                
                let fractMinutes=minutes-Math.floor(minutes)
                seconds+=Math.round(fractMinutes*60)

                hours=Math.floor(hours)
                minutes=Math.floor(minutes)
            }else if(random<=15){
                //swap minutes and seconds
                let tmp=seconds
                seconds=minutes
                minutes=tmp
            }else if(random<=16){
                //mult length of second by 2
                secondLength*=2
            }else if(random<=17){
                //divide length of second by 2
                secondLength/=2
            }else if(random<=18){
                //move timer
                timeDiv.style.position="absolute"
                let posX=randint(0,window.innerWidth-200)
                let posY=randint(0,window.innerHeight-200)
                timeDiv.style.top=posY+"px"
                timeDiv.style.left=posX+"px"
            
            }else if(random<=19){
                //round to nearest minute
                if(seconds>30){
                    minutes+=1
                }
                seconds=0
            }else if(random<=20){
                //bees
                bees()
            }else{
                //normal
                seconds-=1
            }
        }
    }
    transferToClock();
}

function bees(){
    beeImg.style.display="block"
        let random=randint(0,10)
        if(random==0){
            beeAudioTwo.play();
        }else{
            beeAudioOne.play();
    }
}

function transferToClock(){
        if(seconds<=-1){
            seconds=59
            minutes-=1
        }

        if(minutes<=-1){
            minutes=59
            hours-=1
            }

        if(seconds>59){
            seconds=seconds%60
            minutes+=1
        }
            

        if(minutes>59){
            minutes=minutes%60
            hours+=1
        }

    if(hours<0&&seconds<0&&minutes<0){
        hours=0
        seconds=0
        minutes=0
    }

    secondInput.innerText=seconds;
    if(seconds<10){
        secondInput.innerText=0+secondInput.innerText;
    }

    minuteInput.innerText=minutes;
    if(minutes<10){
        minuteInput.innerText=0+minuteInput.innerText;
    }

    hourInput.innerText=hours+":";
    if(hours>0){
        hourInput.style.display="inline"
    }else{
         hourInput.style.display="none"
    }

    if(hours<=0&&seconds<=0&&minutes<=0){
        window.cancelAnimationFrame(animationFrame)
        setTimeout(() => {
            victory.play()
            alert("Timer Is Up");
            }, 250);
    }else{
        requestAnimationFrame(loop);
    }
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}