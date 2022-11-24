const Random_Paragraph =  'http://api.quotable.io/random'; // For Random Quotes API Link
const paragraph = document.getElementById('paragraph');  // For Uper Para
const paraInput = document.getElementById('paraInput'); // For inside border para
const timer = document.getElementById('timer');                 // For timer

paraInput.addEventListener('input' , () => {      // For inside border para add eventlistner
    const arraypara = paragraph.querySelectorAll('span') // Span for right text or wrong text
    const arrayvalue = paraInput.value.split('')
    let right = true;
    arraypara.forEach((characterSpan , index) => {
        const character = arrayvalue[index]
        if(character == null){                               // If condition when Para Input is equal to null
            characterSpan.classList.remove('right');   
            characterSpan.classList.remove('wrong');  
            right = false;
        } 
        else if(character === characterSpan.innerText){              // If Para Input is to be equal to the character Span
            characterSpan.classList.add('right');      // ADD right class text it style be Green
            characterSpan.classList.remove('wrong');   // Add wrong class text it style be Red
        }
        else{
            characterSpan.classList.remove('right');
            characterSpan.classList.add('wrong');
            right = false;
        }
    }) 
    if(right) renderNewQuote()
})

function getRandomPara(){  // Random Quote/Para Functions
   return fetch(Random_Paragraph)   // Fetching It
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){   // Function That Access RandomPara Function 
    const Para = await getRandomPara();
    paragraph.innerHTML = ''; // Texting text inside the html
    Para.split('').forEach(character => {
        const characterSpan = document.createElement('span');
     //   characterSpan.classList.add('wrong')
        characterSpan.innerText = character
        paragraph.appendChild(characterSpan)
    })
    paraInput.value = null;
    //console.log(Para)
    Timer()   // Timer function call in renderNewQuote()
}

let start;
function Timer(){    // Timer function for timing
    timer.innerText = 0;
    start = new Date();    
    setInterval(() => {        // Set Time Interval at 1 sec After 1 sec time is to be increases
        timer.innerText = getTimerTime()
    },1000)
}

function getTimerTime(){   // For Continuous time
    return Math.floor((new Date() - start)/1000)   
}

renderNewQuote() 