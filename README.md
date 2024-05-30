# MicrosoftUpdater.exe

A JavaScript cryptojacker (or simply "miner") that pretends to guide the user through a software installation process while actually reading their system information to determine if CPU mining is worthwhile on their system.

> [!CAUTION]
> THIS PROJECT IS MALWARE! Do not run this on your host system, you will regret it.
> The malware is only for testing purposes in isolated and protected environments.

## What the miner actually does

+ XMRig is added as a Windows Service, and autostarts at every reboot
    + In some cases where adding it as a service does not work, it's added to Task Scheduler with `schtasks` and then initiated with `net start`
    + This service is registered as "Windows Process Manager"
+ The miner monitors running processes on the system and checks if Process Explorer (`procexp64.exe`), Task Manager (`Taskmgr.exe`), or Resource Monitor (`resmon.exe`) are running.
    + Every 2 seconds it checks `tasklist` and stops mining immediately if it detects any system monitoring tools. Once they are closed; however, the miner goes back to work.
    + Process Explorer is not a default Windows tool, but many people use it and a PowerShell script is used to find its absolute path from `C:\` to the Process Explorer executable.
+ The XMRig executable's metadata has been modified to look like a Windows Updater for build 21H1, version 10.0.19043.1052.
    + Credits to BOBSA for using PS to artificially change the date created!

> [!NOTE]
> Though this program is malicious software, it is not intended to be used for financial gain.
> Do NOT reuse this software in any way to exploit or take advantage of people's hardware.

## Files in the repository

+ `README.md`: This file
+ `main.js`: JavaScript backend (my work) to divert the user's attention and evade crypto miner detection strategies
+ `SHA256SUMS`: List of SHA256 hashes of each miner-specific file to check integrity
+ `WinRing0x64.sys`: Kernel driver and hardware access library
+ `miner.exe`: The XMRig miner executable
+ `config.json`: XMRig configuration for OpenCL, mining pool addresses, CPU features, and more

Any file, executable, or driver other than this README and `main.js` is part of the miner and is not my work.

## XMRig modifications

Per the GPLv3 license, I am obligated to list the running changes I made to the XMRig software.

+ XMRig executable (`XMRig.exe`) file metadata changed to:

`VALUE "CompanyName", "Microsoft Corporation"`

`VALUE "FileDescription", "System Updater for Windows® 10 and Windows® 11"`

`VALUE "FileVersion", "10.0.19043.1052"`

`VALUE "LegalCopyright", "Copyright (C) Microsoft Corporation. All rights reserved."`

`VALUE "OriginalFilename", "mcsvc.exe"`

`VALUE "ProductName", "Microsoft® Windows® Operating System"`

`VALUE "ProductVersion", "10.0.19043.1052"`

All changes were made under the `000004b0` metadata block.

+ XMRig executable (`XMRig.exe`) icon changed to:

Windows 11 23H2 MediaCreationTool icon. The icon (`.ico` file) can be extracted from here: https://go.microsoft.com/fwlink/?linkid=2156295

+ XMRig executable (`XMRig.exe`) file name changed to: `MicrosoftUpdater.exe`

## Future plans

- [x] Weed out bugs related to process exiting when checking for the number of physical cores on a CPU
- [x] Modify the process metadata to make it look like a legitimate Windows 10/11 system process
- [ ] Bundle all the files into a single executable to be easily redistributed, without needing NodeJS modules or NodeJS installed
- [x] Add the program to the Windows Task Scheduler to enable delayed autorun at startup
- [x] Monitor all processes running on the system and stop the miner if a system information or stats program is running, to avoid detection
- [ ] Mine only on a few cores of the CPU, preferably ones with the least L3 cache, to avoid quick detection and slowdowns caused by high temperatures
- [x] Run the XMRig executable as a system service with a generic name, such as "conhost"
- [ ] Obfuscate the JavaScript backend to confuse antiviruses or at the least delay their detection
- [ ] Increase hashrate (priority) while idle and cut hashrate when the system is under heavy use (gaming, video editing, etc.)
