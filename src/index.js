const { ipcRenderer } = require('electron')
const ipc = ipcRenderer
const axios = require('axios').default;
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Store = require('electron-store');
const store = new Store();

const closeBtn = document.getElementById('quit')
const minimizeBtn = document.getElementById('minimize')

const calculatorDiv = document.getElementById('calculator')
const apiDiv = document.getElementById('api_setter')

const ignBox = document.getElementById('ign')
const submitBtn = document.getElementById('submit')

const outInt = document.getElementById('out-int');
const outTen = document.getElementById('out-ten');
const outHun = document.getElementById('out-hun');
const errRep = document.getElementById('errorReporting');

const apiBox = document.getElementById('apibox')
const apiSubmitBtn = document.getElementById('apiSubmit')
const apiErrRep = document.getElementById('apiErrorReporting')

//var apiKey = process.env.API_KEY
/*store.set('key', process.env.API_KEY)
var apiKey = store.get('key')*/

closeBtn.addEventListener('click', () => { ipc.send('closeApp') })
minimizeBtn.addEventListener('click', () => { ipc.send('minimizeApp') })

const playerUrl = ign => `https://api.hypixel.net/player?key=${apiKey}&name=${ign}`;
const keyUrl = key => `https://api.hypixel.net/key?key=${key}`;
const textGen = (nextFkdr, toNextFkdr) => `finals to <span class="highlighted">${nextFkdr} fkdr</span>: ${toNextFkdr}`;

function hasApiKey() {
    console.log('key =', store.get('key'))
    if (store.get('key') === undefined) {
        return false;
    } else {
        return true;
    }
}

function showAPIorCalc() {
    if (hasApiKey()) {
        calculatorDiv.style.display = 'block';
    } else {
        apiDiv.style.display = 'block';
    }
}

function addKey() {

    if (apiBox.value === null) return
    let key = apiBox.value

    axios.get(keyUrl(key)).then(response => {

        console.log(response)

    }).catch(error => {

        console.log('error!')
        console.log(error)
        apiErrRep.innerText = error.response.data.cause + "!";

    })

}

function calculate() {

    if (ignBox.value === null) return
    let name = ignBox.value

    let fkills;
    let fdeaths;

    let fkdr;
    let nextInt;
    let nextTen;
    let nextHun;

    internationalNumberFormat = new Intl.NumberFormat('en-US')

    // final_deaths_bedwars: 2268
    // final_kills_bedwars: 5284

    axios.get(playerUrl(name)).then(response => {

        if (response.data.player === null) {
            errRep.innerText = "That player does not exist!"
            return
        }

        errRep.innerText = ""

        fkills = parseInt(response.data.player.stats.Bedwars.final_kills_bedwars); // 5284
        fdeaths = parseInt(response.data.player.stats.Bedwars.final_deaths_bedwars); // 2268
        //console.log(internationalNumberFormat.format(fkills), fdeaths); // 5,284 2268

        fkdr = fkills / fdeaths;
        fkdr = fkdr.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        fkdr = parseFloat(fkdr);
        //fkdr = Number.parseFloat(fkdr).toFixed(2);
        //console.log(fkdr);

        nextInt = Math.floor(fkdr) + 1;
        nextTen = +((+fkdr.toFixed(1)) + 0.1).toFixed(1);
        nextHun = +((+fkdr.toFixed(2)) + 0.01).toFixed(2);

        let toNextInt = internationalNumberFormat.format(Math.ceil(fdeaths * nextInt - fkills));
        let toNextTen = internationalNumberFormat.format(Math.ceil(fdeaths * nextTen - fkills));
        let toNextHun = internationalNumberFormat.format(Math.ceil(fdeaths * nextHun - fkills));

        outInt.innerHTML = textGen(nextInt, toNextInt);
        outTen.innerHTML = textGen(nextTen, toNextTen);
        outHun.innerHTML = textGen(nextHun, toNextHun);

    }).catch(error => {
        console.log(error)
        errRep.innerText = error.response.data.cause + "!";
    })

}

submitBtn.addEventListener('click', calculate)
apiSubmitBtn.addEventListener('click', addKey)

// PROGRAM START
showAPIorCalc();