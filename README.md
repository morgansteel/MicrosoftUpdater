# js-cryptojacker

A JavaScript cryptojacker (or simply "miner") that pretends to guide the user through a software installation process while actually reading their system information to determine if CPU mining is worthwhile on their system.

> [!CAUTION]
> THIS PROJECT IS MALWARE! Do not run this on your host system, you will regret it.
> The malware is only for testing purposes in isolated and protected environments.

## What is changed on the system (currently)

+ XMRig is added as a Windows Service, and autostarts at every reboot
    + In some cases where adding it as a service does not work, it's added to Task Scheduler with `schtasks` and then initiated with `net start`
    + This service is registered as "Windows Process Manager"
+ Task Manager is disabled to divert inexperienced users from investigating
    + This is done by creating a new `REG_DWORD` named `DisableTaskMgr` in `HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\` and setting `DisableTaskMgr` to `1`.

> [!NOTE]
> A reboot occurs for many registry changes to take effect.

## Files in the repository

+ `README.md`: This file
+ `main.js`: JavaScript backend (my work) to divert the user's attention and evade crypto miner detection strategies
+ `SHA256SUMS`: List of SHA256 hashes of each miner-specific file to check integrity
+ `WinRing0x64.sys`: Kernel driver and hardware access library
+ `miner.exe`: The XMRig miner executable
+ `config.json`: XMRig configuration for OpenCL, mining pool addresses, CPU features, and more

Any file, executable, or driver other than this README and `main.js` is part of the miner and is not my work. XMRig is licensed under GPLv3 and I take no credit for any of its files.

## Future plans

- [x] Weed out bugs related to process exiting when checking for the number of physical cores on a CPU
- [ ] Modify the process metadata to make it look like a legitimate Windows 10/11 system process
- [ ] Bundle all the files into a single executable to be easily redistributed, without needing NodeJS modules or NodeJS installed
- [x] Add the program to the Windows Task Scheduler to enable delayed autorun at startup
- [ ] Monitor all processes running on the system and stop the miner if a system information or stats program is running, to avoid detection
- [ ] Mine only on a few cores of the CPU to avoid quick detection and slowdowns caused by high temperatures
- [ ] Run the XMRig executable as a system service with a generic name, such as "conhost"
- [ ] Obfuscate the JavaScript backend to confuse antiviruses or at the least delay their detection
- [ ] Increase hashrate while idle and cut hashrate when the system is under heavy use (gaming, video editing, etc.)
- [ ] Disable WiFi or Ethernet drivers for long periods of time (6-8 hours) and then re-enable them for a minute or two (lets miner get work without the user being able to Google answers to high CPU usage)


> [!NOTE]
> Though this program is malicious software, it is not intended to be used for personal gain. Do not reuse this software to illicitly mine cryptocurrency without others' permission.
