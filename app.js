let running = false
let sortVisual = document.getElementById("graph");
let children = sortVisual.childNodes;

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

async function bubbleSort() {
    while(true) {
        let comp = 0;
        for(let x = 0; x < children.length-1; x++) {
            if(parseInt(children[x].dataset.value) > parseInt(children[x+1].dataset.value)) {
                swapTags(x, x+1)
                await timer(1);
                comp += 1
            }
        }
        if(comp == 0) {
            break
        }
    }

    victoryLap();
}

async function insertionSort() {
    let holeposition, valueToInsert; 

    for(let x = 1; x < children.length; x++) {
        valueToInsert = parseInt(children[x].dataset.value)
        holeposition = x

        while(holeposition > 0 && parseInt(children[holeposition-1].dataset.value) > valueToInsert) {
            console.log(children[holeposition].dataset.value, children[holeposition-1].dataset.value)
            swapTags(holeposition, holeposition-1);
            holeposition--;
        }
        printOutDisplay();
        console.log("This is the holeposition:", holeposition);
        console.log()
        swapTags(holeposition, valueToInsert)
        await timer(1);
    }
}

async function victoryLap() {
    for(let x = 1; x < children.length-1; x++) {
        children[x-1].style.backgroundColor = "lightgreen";
        children[x].style.backgroundColor = "lightgreen";
        children[x+1].style.backgroundColor = "lightgreen";

        setTimeout(function() {
            children[x-1].style.backgroundColor = "red";
        }, 500);
        await timer(1);
    }
    setTimeout(function() {
        children[children.length-2].style.backgroundColor = "red";
        children[children.length-1].style.backgroundColor = "red";
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

function drawGraphics(size) {
    let list = [...Array(size).keys()];
    document.getElementById("graph").innerHTML = "";
    for(let x = 0; x < list.length; x++) {
        document.getElementById("graph").append(bar(list[x], (list[x]+1)*5));
    }
}

function bar(value, height) {
    let newDiv = document.createElement("div");
    newDiv.style.height = height + "px";
    newDiv.style.width = "5px";
    newDiv.style.backgroundColor = "Red";
    newDiv.style.marginTop = (window.innerHeight - 20 - height) + "px"
    newDiv.setAttribute("data-value", value)

    return newDiv;
}

drawGraphics(10)