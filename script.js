const inputContainer=document.getElementById("input-container");
const countdownForm=document.getElementById("countdownForm");
const dateEl=document.getElementById("date-picker");
const countdownTitleEl=document.getElementById("countdown-title");
const countdown=document.getElementById("countdown");
const countdownBtn=document.getElementById("countdown-button");
const countdownCompleteEl=document.getElementById("complete");
const newCountdownBtn=document.getElementById("complete-button");
const completeInfo=document.getElementById("complete-info");

let countdownDate="";
let countdownTitle="";
// let countdownValue=Date;

const timeElements=document.querySelectorAll("span");

const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;
let countdownActive;
let savedCountdown;

var today=new Date().toISOString().split("T")[0];
dateEl.setAttribute("min",today);

function countdownComplete()
{
    clearInterval(countdownActive);

    inputContainer.hidden=true;
    countdown.hidden=true;
    countdownCompleteEl.hidden=false;
    completeInfo.textContent=`${countdownTitle} Completed on ${countdownDate}`;
    countdownDate="";
    countdownTitle="";
}

function updateDOM()
{
    countdownTitleEl.textContent=`${countdownTitle}`;

    countdownActive = setInterval(() => {
    let now=new Date().getTime();
    let countdownValue=new Date(countdownDate).getTime() - now;
    const days=Math.floor(countdownValue/day);
    const hours=Math.floor((countdownValue % day)/hour);
    const minutes=Math.floor((countdownValue % hour)/minute);
    const seconds=Math.floor((countdownValue % minute)/second);
    if(countdownValue<0)
    {
        countdownComplete();
    }
    else
    {
        timeElements[0].textContent=`${days}`;
        timeElements[1].textContent=`${hours}`;
        timeElements[2].textContent=`${minutes}`;
        timeElements[3].textContent=`${seconds}`;
        inputContainer.hidden=true;
        countdown.hidden=false;
    }
    },second);
}

function updateCountdown(event)
{
    event.preventDefault();
    countdownTitle=event.srcElement[0].value;
    countdownDate=event.srcElement[1].value;
    savedCountdown={
        title:countdownTitle,
        date:countdownDate
    };
    localStorage.setItem("countdownDetails",JSON.stringify(savedCountdown));

    if(countdownDate === "")
    {
        alert("Please select a date");
    }
    else if(countdownTitle === "")
    {
        alert("Please select an appropriate title");
    }
    else
    {
        updateDOM();
    }
}

function resetCountdown()
{
    clearInterval(countdownActive);
    countdownDate="";
    countdownTitle="";
    inputContainer.hidden=false;
    countdown.hidden=true;
    countdownCompleteEl.hidden=true;
    localStorage.removeItem("countdownDetails");
}

function restorePreviousCountdown()
{
    if(localStorage.getItem("countdownDetails"))
    {
        inputContainer.hidden=true;
        savedCountdown=JSON.parse(localStorage.getItem("countdownDetails"));
        countdownDate=savedCountdown.date;
        countdownTitle=savedCountdown.title;
        updateDOM();
    }
}

countdownForm.addEventListener("submit",updateCountdown);
countdownBtn.addEventListener("click",resetCountdown);
newCountdownBtn.addEventListener("click",resetCountdown);

restorePreviousCountdown();