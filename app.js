let running = false
let sortVisual = document.getElementById("graph");
let children = sortVisual.childNodes;

let mainColour = "red";
let activeColour = "blue";
let victoryColour = "#43cc1a";

// Þessi litli kóði er það sem stoppar forritið í smá stund.
const timer = ms => new Promise(res => setTimeout(res, ms))

/*
    Þett fall tekur inn tvö index og skiptir þeim. Þurfti að gera heilt fall
    fyrir þetta því dom er frekar leiðinlegt þegar kemur að því að skipta
    tveimur stökum.
*/
async function swapTags(lower, higher) {
    // Stökin fá á sig virkan lit þar sem verið er að skipta þeim.
    children[lower].style.backgroundColor = activeColour;
    children[higher].style.backgroundColor = activeColour;

    // Þar sem ég þarf að nota insert before fallið þá þarf ég að vita hvor breytan hafi lægra eða hærra indexið. 
    // Þess vegna þarf ég að tjékka á því með þessari if setningu.
    if(lower > higher) {
        [lower, higher] = [higher, lower];
    }

    // Fyrst er gáð hvort að stökin er við hliðina á hvort öðru. Ef svo þá get ég bara fær hærra stakið fyrir aftan lægra.
    if(higher - lower == 1) {
        sortVisual.insertBefore(children[higher], children[lower])
    } else {
        // Þessi breyta tekur inn stakið sem er fyrir framan lægra stakið.
        let temp = children[lower+1]

        // Fyrst set ég lægra stakið fyrir aftan hærra stakið.
        sortVisual.insertBefore(children[lower], children[higher])

        // Síðan er hærra stakið sett fyrir aftan stakið sem var fyrir framan lægra stakið.
        sortVisual.insertBefore(children[higher], temp)
    }

    // Hérna bíður forritið aðeins svo notandinn getur séð hvað hefur gerst.
    await timer(1);

    children[lower].style.backgroundColor = mainColour;
    children[higher].style.backgroundColor = mainColour;
}

// Þetta fall heldur utan um samanburðar teljarann. Ef að þú vilt núllstilla hann kallar þú á það með true sem breytu.
function comparisonsCounter(reset=false) {
    // Teljara tagið er tekið inn.
    let counter = document.getElementById("count_comparisons");
    // Textcontent er splittað til að búa til nýja textann.
    let text = counter.textContent.split(" ");

    // Gáð er hvort að teljarinn eigi að núllstillast.
    if(reset) {
        // Teljarinn er núllstilltur.
        text[1] = 0;
    } else {
        // Teljarinn fær á sig nýju töluna.
        text[1] = parseInt(text[1]) + 1;
    }
    // Nýji textinn er loks hent inn á síðuna.
    counter.textContent = text[0] + " " + text[1];
}

// Þetta fall heldur utan um lista teljarann. Hægt er að ráða um hve mikið teljarinn á að hækka.
function arrayAccessCounter(reset=false, amount=1) {
    // Teljara tagið er tekið inn.
    let counter = document.getElementById("count_array_access");
    // Textcontent er splittað til að búa til nýja textann.
    let text = counter.textContent.split(" ");

    // Gáð er hvort að teljarinn eigi að núllstillast.
    if(reset) {
        // Teljarinn er núllstilltur
        text[3] = 0
    } else {
        // Teljarinn fær á sig nýju töluna.
        text[3] = parseInt(text[3]) + amount;
    }
    // Nýji textinn er loks hent inn á síðuna.
    counter.textContent = text[0] + " " + text[1] + " " + text[2] + " " + text[3];
}

// Þetta fall heldur utan um tíma teljarann. Fallið tekur inn annað fall sem það keyrir og tímamælir.
async function funcTimer(func) {
    // Teljara tagið er tekið inn.
    let counter = document.getElementById("count_timer");
    // Textcontent er splittað til að búa til nýja textann.
    let text = counter.textContent.split(" ");

    // Fyrst sýnir teljarinn tbd (To be determined) á meðan að forritið er mælt.
    text[1] =  "Tbd";
    counter.textContent = text[0] + " " + text[1];

    // Byrjunartíminn er skilgreindur.
    start = performance.now()
    await func();   // Fallið er keyrt.

    // Sekúndurnar eru reiknaðar.
    text[1] = (performance.now() - start) / 1000;
    counter.textContent = text[0] + " " + text[1] + " sek.";
}

/*

    Síðan koma hérna öll röðunaralgríminn. 

    Ætla fyrst að fara yfir lykilatriði fallanna. 
    
    Þau hefjast öll á if running aðgerð. Þetta er gert til að tjékka á hvort einhvert annað fall sé að keyrast.
    Næst er samanburðar og lista teljararnir núllstilltir með comparisonsCounter(true) og arrayAccessCounter(true).
    running er sett í true til marks um að forritið er að keyra.
    Síðan í gegnum forritið eru if setningar sem gá hvort að notandi vilji stoppa algrímið.

    Í endann er gáð hvort að forritið hafi keyrt alla leið í gegn. Ef svo er þá gerir forritið victory lap.
    Og að lokum er running sett í false svo önnur algrím geta keyrt.

*/

// Bubble sort
async function bubbleSort() {
    if(!running) {
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
        if(running) {
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
            i++
            await swapTags(i, j)
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
    Grafísk föll
*/

// Þetta fall keyrir victorylap þar sem græn strípa fer eftir súlunum til að sýna að listinn er fullraðaður.
async function victoryLap() {
    // Farið er í gegnum öll stökin.
    for(let x = 1; x < children.length-1; x++) {
        // Þrjú stök eru sett í victoryColour.
        children[x-1].style.backgroundColor = victoryColour;
        children[x].style.backgroundColor = victoryColour;
        children[x+1].style.backgroundColor = victoryColour;

        // Síðan er smá timeout skilgreint sem segir hvenær stakið eigi að taka aftur sinn upprunalega lit.
        setTimeout(function() {
            children[x-1].style.backgroundColor = mainColour;
        }, 500);
        // Fallið er aðeins stoppað.
        await timer(1);
    }

    // Síðustu tvö stökin fá loks á sig upprunalega litinn.
    setTimeout(function() {
        children[children.length-2].style.backgroundColor = mainColour;
        children[children.length-1].style.backgroundColor = mainColour;
    }, 500);
}

// Þetta fall prentar út gildi allra tagann. Aðeins notað í debug. Hef þetta hérna ef að þú vilt prófa eitthvað.
function printOutDisplay() {
    let listi = []
    for(let x = 0; x < children.length; x++) {
        listi.push(children[x].dataset.value)
    }
    console.log(listi)
}

// Þetta fall stokkar listann.
async function shuffleArray() {
    if(!running) {
        running = true;

        // Farið er í gegnum öll stökin.
        for (let i = children.length - 1; i > 0; i--) {
            if(!running) {
                break;
            }

            // Index er búið til með random generator.
            var j = Math.floor(Math.random() * (i + 1));
            
            // Stökunum er skipt.
            await swapTags(i, j);
        }
    }
    running = false;
}

// Þetta fall snýr listanum við. Getur þannig gert öfugan lista til að sjá versta tilvik röðunaralgríms.
async function reverseArray() {
    if(!running) {
        for(let i = 0; i < Math.floor(children.length / 2); i++) {
            await swapTags(i, children.length-1-i);
        }
    }
}

// Þetta fall teiknar súlurnar.
function drawGraphics() {
    // Running er sett í false til að stoppa öll algrím. 
    running = false;

    // Fyrst er listi búinn til sem að hefur tölur frá 0 til size. 
    let list = [...Array(parseInt(document.forms['values']["size"].value)).keys()];

    // Graphið er endurræst.
    document.getElementById("graph").innerHTML = ""; 

    for(let x = 0; x < list.length; x++) {
        // Nýtt tag er búið í bar template fallinu og appendað.
        document.getElementById("graph").append(
            bar(list[x], (list[x]+1)*parseFloat(document.forms['values']["arrSize"].value))
        );
    }
}

// Þetta fall er einskonar template sem skilar fullkláruðu div tagi. 
function bar(value, height) {
    // Nýtt div tag er búið til.
    let newDiv = document.createElement("div");

    // Hæð divisins er skilgreint. Hæðin er reiknuð þegar forritið er kallað. Hæðin er í samræmi við gildi divsins.
    newDiv.style.height = height + "px";

    // Breidd divsins er skilgreint. Gildi arr size er tekið inn sem breidd.
    newDiv.style.width = parseFloat(document.forms['values']["arrSize"].value) + "px";

    // Divið fær á sig nýjan lit.
    newDiv.style.backgroundColor = mainColour;

    // Smá margin er bætt við svo að súlurnar hangi ekki af ofan. 
    newDiv.style.marginTop = (window.innerHeight - 40 - height) + "px";

    // Til að gera súlurnar aðeins fallegri ákvað ég að hafa smá bil á milli þeirra. 
    // Þetta er flott þar til að stærðin er kominn fyrir neðan 5.
    if(document.forms['values']["arrSize"].value > 5) {
        newDiv.style.marginRight = "1px";
    }
    // Divið fær á sig nýtt attribute sem er gildi divsins.
    newDiv.setAttribute("data-value", value)

    return newDiv;
}

document.getElementById("quantity").addEventListener("input", drawGraphics);
document.getElementById("sizeOfArr").addEventListener("input", drawGraphics);
drawGraphics();