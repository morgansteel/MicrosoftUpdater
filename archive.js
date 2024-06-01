/* archive.js contains useful functional programs that are not used in the malware
   but still potentially useful */

const si = require('systeminformation');
async function system() {
const cpu = await si.cpu();
console.log(cpu.cache.l3/1024);
}

system();