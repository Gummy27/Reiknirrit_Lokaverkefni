let running = false
let sortVisual = document.getElementById("graph");
let children = sortVisual.childNodes;

let mainColour = "red";
let activeColour = "blue";
let victoryColour = "#43cc1a";

const timer = ms => new Promise(res => setTimeout(res, ms))

/*
    Þett fall tekur inn tvö index og skiptir þeim. Þurfti að gera heilt fall
    fyrir þetta því dom er frekar leiðinlegt þegar kemur að því að skipta
    tveimur stökum.
*/
async function swapTags(lower, higher) {
    children[lower].style.backgroundColor = activeColour;
    children[higher].style.backgroundColor = activeColour;

    if(lower > higher) {
        [lower, higher] = [higher, lower];
    }

    if(higher - lower == 1) {
        sortVisual.insertBefore(children[higher], children[lower])
    } else {
        let temp = children[lower+1]
        sortVisual.insertBefore(children[lower], children[higher])
        sortVisual.insertBefore(children[higher], temp)
    }

    await timer(1);

    children[lower].style.backgroundColor = mainColour;
    children[higher].style.backgroundColor = mainColour;
}

function comparisonsCounter(reset=false) {
    let counter = document.getElementById("count_comparisons");
    let text = counter.textContent.split(" ");

    if(reset) {
        text[1] = 0;
    } else {
        text[1] = parseInt(text[1]) + 1;
    }
    counter.textContent = text[0] + " " + text[1];
}

function arrayAccessCounter(reset=false, amount=1) {
    let counter = document.getElementById("count_array_access");
    let text = counter.textContent.split(" ");

    if(reset) {
        text[3] = 0
    } else {
        text[3] = parseInt(text[3]) + amount;
    }
    counter.textContent = text[0] + " " + text[1] + " " + text[2] + " " + text[3];
}

async function funcTimer(func) {
    let counter = document.getElementById("count_timer");
    let text = counter.textContent.split(" ");

    text[1] = 0 + " sek.";
    counter.textContent = text[0] + " " + text[1];

    start = performance.now()
    await func();

    text[1] = (performance.now() - start) / 1000;
    counter.textContent = text[0] + " " + text[1] + " sek.";
}

// Bubble sort
async function bubbleSort(timing=false) {
    if(!running && !timing) {
        comparisonsCounter(true);
        arrayAccessCounter(true);
        running = true

        while(true && running) {
            let comp = 0;
            for(let x = 0; x < children.length-1; x++) {
                if(!running) {
                    break;
                } 

                selectedChild = children[x]
                if(parseInt(children[x].dataset.value) > parseInt(children[x+1].dataset.value) && !timing) {
                    comparisonsCounter();
                    arrayAccessCounter(false, 2);

                    await swapTags(x, x+1)
                    comp += 1
                }
            }
            if(comp == 0) {
                break
            }
        }
        if(running && !timing) {
            victoryLap();
        }
        running = false
    }
}

// Insertion sort
async function insertionSort() {
    if(!running) {
        comparisonsCounter(true);
        arrayAccessCounter(true);
        running = true
        let holeposition;
        for(let selected = 1; selected < children.length; selected++) {
            if(!running) {
                break;
            }

            holeposition = selected;
            selectedChild = children[selected]
            arrayAccessCounter();
            while(holeposition > 0 && parseInt(selectedChild.dataset.value) < parseInt(children[holeposition-1].dataset.value) && running) {
                arrayAccessCounter();
                comparisonsCounter();
                await swapTags(holeposition, holeposition-1)
                holeposition--
            }
        }
        if(running) {
            victoryLap();
        }
        running = false
    }
}

// Quick sort
async function executeQuickSort() {
    if(!running) {
        comparisonsCounter(true);
        arrayAccessCounter(true);
        
        running = true;
        await quickSort()
        if(running) {
            await victoryLap();
        }
        running = false;
    } else {
        console.log("No!");
    }
}

async function quickSort(low=0, high=children.length-1) {
    if(!running) {
        return;
    }
    if(low < high) {
        pi = await partition(low, high)
        await quickSort(low, pi-1)
        await quickSort(pi+1, high)
    }
}

async function partition(low, high) {
    pivot = children[high];
    arrayAccessCounter();
    pivot.style.backgroundColor = activeColour;

    i = (low - 1);
    for(j = low; j <= high - 1; j++) {
        if(!running) {
            pivot.style.backgroundColor = mainColour;
            return
        }
        if(parseInt(children[j].dataset.value) < parseInt(pivot.dataset.value)) {
            arrayAccessCounter();
            comparisonsCounter();
            await timer(1);
            i++
            swapTags(i, j)
        }
    }

    await swapTags(i+1, high)
    pivot.style.backgroundColor = mainColour;
    return i + 1;
}

// Radix sort
async function radixSort() {
    if(!running) {
        comparisonsCounter(true);
        arrayAccessCounter(true);
        running = true;
        max_element = children.length - 1;
    
        for(let place = 1; Math.floor(max_element / place) > 0; place *= 10) {
            await countingSort(place)
            printOutDisplay();
        }
        if(running) {
            victoryLap();
        }
        running = false;
    }
}

async function countingSort(place) {
    count = new Array(10);
    output = new Array(children.length)
    for(let x = 0; x < count.length; x++) { count[x] = 0; }

    for(let i = 0; i < children.length; i++ && running) {
        if(!running) {
            break;
        }
        children[i].style.backgroundColor = activeColour;

        index = (children[i].dataset.value / place)
        arrayAccessCounter();
        count[Math.floor(index % 10)]++;
        await timer(1);

        children[i].style.backgroundColor = mainColour;
    }

    for(let i = 1; i < 10; i++) {
        if(!running) {
            break;
        }
        count[i] += count[i - 1];
    }

    i = children.length - 1;
    while(i >= 0 && running) {
        index = (children[i].dataset.value / place);
        output[count[Math.floor(index % 10)] - 1] = children[i].dataset.value;
        count[Math.floor(index % 10)]--;
        i--;
    }

    for(let i = 0; i < children.length; i++) {
        if(!running) {
            break;
        }
        if(output[i]) {
            await swapTags(i, findByValue(output[i]));
            arrayAccessCounter(false, 2);
        }
    }
}

function findByValue(value) {
    for(let i = 0; i < children.length; i++) {
        if(parseInt(children[i].dataset.value) == value) {
            return i;
        }
    }
}

/*
    Hérna koma önnur föll
*/
async function victoryLap() {
    for(let x = 1; x < children.length-1; x++) {
        children[x-1].style.backgroundColor = victoryColour;
        children[x].style.backgroundColor = victoryColour;
        children[x+1].style.backgroundColor = victoryColour;

        setTimeout(function() {
            children[x-1].style.backgroundColor = mainColour;
        }, 500);
        await timer(1);
    }
    setTimeout(function() {
        children[children.length-2].style.backgroundColor = mainColour;
        children[children.length-1].style.backgroundColor = mainColour;
    }, 500);
}


function printOutDisplay() {
    let listi = []
    for(let x = 0; x < children.length; x++) {
        listi.push(children[x].dataset.value)
    }
    console.log(listi)
}

async function shuffleArray() {
    if(!running) {
        for (var i = children.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
    
            swapTags(i, j);
            await timer(1);
        }
    }
}

async function reverseArray() {
    if(!running) {
        for(let i = 0; i < Math.floor(children.length / 2); i++) {
            console.log("This is the", i, children.length-1-i);
            await swapTags(i, children.length-1-i);
        }
    }
}

function drawGraphics() {
    let list = [...Array(parseInt(document.forms['values']["size"].value)).keys()];
    document.getElementById("graph").innerHTML = "";
    for(let x = 0; x < list.length; x++) {
        document.getElementById("graph").append(bar(list[x], (list[x]+1)*parseFloat(document.forms['values']["arrSize"].value)));
    }
}

function bar(value, height) {
    let newDiv = document.createElement("div");

    newDiv.style.height = height + "px";
    newDiv.style.width = parseFloat(document.forms['values']["arrSize"].value) + "px";
    newDiv.style.backgroundColor = mainColour;
    newDiv.style.marginTop = (window.innerHeight - 40 - height) + "px";
    if(document.forms['values']["arrSize"].value > 5) {
        newDiv.style.marginRight = "1px";
    }
    newDiv.setAttribute("data-value", value)

    return newDiv;
}

document.getElementById("quantity").addEventListener("input", drawGraphics);
document.getElementById("sizeOfArr").addEventListener("input", drawGraphics);
drawGraphics();