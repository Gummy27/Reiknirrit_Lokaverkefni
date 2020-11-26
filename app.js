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
            selectedChild = children[x]
            selectedChild.style.backgroundColor = "blue";
            if(parseInt(children[x].dataset.value) > parseInt(children[x+1].dataset.value)) {
                swapTags(x, x+1)
                await timer(1);
                comp += 1
            }
            selectedChild.style.backgroundColor = "red";
        }
        if(comp == 0) {
            break
        }
    }

    victoryLap();
}

async function insertionSort() {
    let holeposition;
    for(let selected = 1; selected < children.length; selected++) {
        holeposition = selected;
        selectedChild = children[selected]
        selectedChild.style.backgroundColor = "blue";
        while(holeposition > 0 && parseInt(selectedChild.dataset.value) < parseInt(children[holeposition-1].dataset.value)) {
            swapTags(holeposition, holeposition-1)
            await timer(10);
            holeposition--
        }
        selectedChild.style.backgroundColor = "red";
    }
    victoryLap();
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

function drawGraphics() {
    let list = [...Array(parseInt(document.forms['values']["size"].value)).keys()];
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

document.getElementById("quantity").addEventListener("input", drawGraphics);

drawGraphics();