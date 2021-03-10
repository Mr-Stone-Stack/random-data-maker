import fakeDataBuilder from './FakeDataSim/FakeDataBuilder.js';
import fakeData from './FakeDataSim/data/index.js';
import server from './FakeDataSim/Server/Server.js';

const output = document.querySelector('.output');

server.populateWithData({ numberOfUsers: 10 });

const html = document.querySelector('body');
console.log(html.children);

//I can modify tis as I like to give me the needed results
function treeWalking(rootEl) {
    let ar = [];
    function rec(el) {
        if (el.localName !== 'script') {
            ar.push(el);
            if (el.children.length > 0) {
                for (let i = 0; i < el.children.length; i++) {
                    rec(el.children[i]);
                }
            }
        }
    }
    rec(rootEl);
    return ar;
}

let data = treeWalking(html);

const betweenTags = /(?<=>).*(?=<)/gm;
