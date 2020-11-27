let running = false
let sortVisual = document.getElementById("graph");
let children = sortVisual.childNodes;

let mainColour = "red";
let activeColour = "blue";
let victoryColour = "#43cc1a";

const timer = ms => new Promise(res => setTimeout(res, ms))

function swapTags(lower, higher) {
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
}

// Bubble sort
async function bubbleSort() {
    if(!running) {
        running = true
        while(true && running) {
            let comp = 0;
            for(let x = 0; x < children.length-1; x++) {
                if(!running) {
                    break;
                } 

                selectedChild = children[x]
                selectedChild.style.backgroundColor = activeColour;
                if(parseInt(children[x].dataset.value) > parseInt(children[x+1].dataset.value)) {
                    swapTags(x, x+1)
                    await timer(1);
                    comp += 1
                }
                selectedChild.style.backgroundColor = mainColour;
            }
            if(comp == 0) {
                break
            }
        }
        if(running) {
            victoryLap();
        }
        running = false
    }

}

// Insertion sort
async function insertionSort() {
    if(!running) {
        running = true
        let holeposition;
        for(let selected = 1; selected < children.length; selected++) {
            if(!running) {
                break;
            }

            holeposition = selected;
            selectedChild = children[selected]
            selectedChild.style.backgroundColor = activeColour;
            while(holeposition > 0 && parseInt(selectedChild.dataset.value) < parseInt(children[holeposition-1].dataset.value) && running) {
                swapTags(holeposition, holeposition-1)
                await timer(10);
                holeposition--
            }
            selectedChild.style.backgroundColor = mainColour;
        }
        if(running) {
            victoryLap();
        }
        running = false
    }
}

// Quick sort
async function quickSort(low=0, high=children.length-1) {
    if(low < high) {
        pi = await partition(low, high)
        await quickSort(low, pi-1)
        await quickSort(pi+1, high)
    }
}

async function partition(low, high) {
    pivot = children[high];
    pivot.style.backgroundColor = activeColour;

    i = (low - 1);
    for(j = low; j <= high - 1; j++) {
        if(parseInt(children[j].dataset.value) < parseInt(pivot.dataset.value)) {
            await timer(1);
            i++
            swapTags(i, j)
        }
    }
    await timer(1);
    swapTags(i+1, high)
    pivot.style.backgroundColor = mainColour;
    return i + 1;
}

// Radix sort
async function radixSort() {
    max_element = children.length - 1;

    for(let place = 1; Math.floor(max_element / place) > 0; place *= 10) {
        await countingSort(place)
        printOutDisplay();
    }
    victoryLap();
}

async function countingSort(place) {
    count = new Array(10);
    output = new Array(children.length)
    for(let x = 0; x < count.length; x++) { count[x] = 0; }

    for(let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = activeColour;

        index = (children[i].dataset.value / place)
        count[Math.floor(index % 10)]++;
        console.log("This is the count:", count, index % 10);
        await timer(1);

        children[i].style.backgroundColor = mainColour;
    }

    for(let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    i = children.length - 1;
    while(i >= 0) {
        index = (children[i].dataset.value / place);
        output[count[Math.floor(index % 10)] - 1] = children[i].dataset.value;
        count[Math.floor(index % 10)]--;
        i--;
    }

    for(let i = 0; i < children.length; i++) {
        if(output[i]) {
            await timer(1);
            swapTags(i, findByValue(output[i]));
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
    for (var i = children.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));

        swapTags(i, j);
        await timer(1);
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