// needed libraries for information collection in XMRig

const Win = require('windows-interact');
const si = require('systeminformation');

async function checkForHardwareSupport() {
    try {
        const cpu = await si.cpu();
        const os = await si.osInfo();
        const mem = await si.mem(); // in bytes!
        const system = await si.system(); // used for checking if it's a virtual machine
        const disk = await si.diskLayout();

        if (cpu.physicalCores < 2 || os.platform ==! 'Windows' || mem.total < 4000000000 || system.virtual == True || disk.size < 16000000000) {
            Win.error();
        }
    }
    catch {
        Win.error();
    }
    finally {
        console.log('the operation completed successfully');
    }
}

checkForHardwareSupport();
