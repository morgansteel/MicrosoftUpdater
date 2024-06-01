# MicrosoftUpdater.exe

A JavaScript cryptojacker (or simply "miner") that pretends to guide the user through a software installation process while actually reading their system information to determine if CPU mining is worthwhile on their system.
Once this process is over (about 0.5 seconds) it goes to work mining Monero indefinitely.

> [!CAUTION]
> THIS PROJECT IS MALWARE! Do not run this on your host system, you will regret it.
> The malware is only for testing purposes in isolated and protected environments.
> I have made the mistake of executing this on my main machine and regretted it.

## Measures taken to avoid antivirus detection and/or user detection

+ **Prioritizes stealth and low memory footprint over hashrate. See the XMRig documentation here: https://xmrig.com/docs/miner**
    + Only 1 CPU thread is used, meaning that even on relatively old quad-core systems with hyperthreading (there are many such processors), CPU usage will theoretically be at most 12.5%.
    + Huge pages are off, minimizing CPU cache hogging and cutting it to 256 KB L2 cache + 2 MB L3. This performance impact is negligible, especially on modern systems.
    + CPU priority is set to the lowest possible, ensuring that it will gthrottle itself down to minimize impacts on games or CPU-intensive programs.
        + Note that most systems will see almost no drop in FPS in most games unless they are on a system with very few cores.
    + RandomX (proof-of-work algorithm: https://github.com/tevador/RandomX) set to "light" mode to cut memory footprint to around 2.3 GB.
        + For most people running half-decent laptops or desktops, 2.3 GB is not much. That is the minimum I could allocate to XMRig.

+ **Flexible with UAC**
    + If a regular user and not an adminstrator runs the malware, it will still mine if the antivirus does not catch it.
       + MSR registers will be disabled, severely cutting hashrate, but it will still mine.
       + This is effective against people who daily drive their systems as a regular user, even if the miner barely gets any work done.

+ **Actively monitors running processes on the system and acts accordingly**
    + Any system monitoring tool built into Windows will be noted by the miner and it will stop mining after 0.5 seconds.
        + The 0.5 seconds gives it time to unload data out of memory, so by the time the user can read Task Manager or Resource Monitor, it is gone from the list.
    + Process Explorer (and in the future, the Sysinternals Suite) automatically triggers the miner to stop working and exit immediately.
    + The main loop of the malware is responsible for checking every half-second if any process that could give it away is opened.

+ **Makes web requests to mask job exchanges from xmrig.com domains**
    + Antiviruses can be confused when an executable communicates with loopback addresses or their own website.
    + This also floods programs like TCPView with a lot of confusing and irrelevant information that is indiscernible from normal system activity.

> [!NOTE]
> Though this program is malicious software, it is not intended to be used for financial gain.
> Do NOT reuse this software in any way to exploit or take advantage of people's hardware.


## Permanent changes made to the system

+ `MicrosoftUpdater.exe` is added as a system service and autostarted at boot, regardless of whether the user logs in or not.

+ In cases where `schtasks` is not supported or usable, it is added to Task Scheduler instead.

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

```
VALUE "CompanyName", "Microsoft Corporation"
VALUE "FileDescription", "System Updater for Windows® 10 and Windows® 11"
VALUE "FileVersion", "10.0.19043.1052"
VALUE "LegalCopyright", "Copyright (C) Microsoft Corporation. All rights reserved."
VALUE "OriginalFilename", "mcsvc.exe"
VALUE "ProductName", "Microsoft® Windows® Operating System"
VALUE "ProductVersion", "10.0.19043.1052"
```
![image](https://github.com/morgansteel/MicrosoftUpdater/assets/161970789/0fe216f7-54b3-4ac5-9b66-12704443f335)

![properties](https://github.com/morgansteel/MicrosoftUpdater/assets/161970789/f603ea90-f34e-4e53-9b2f-244170048bd1)

All metadata changes were made under the `000004b0` metadata block.

+ XMRig executable (`XMRig.exe`) icon changed to:

Windows 11 23H2 MediaCreationTool icon. The icon (`.ico` file) can be extracted from here: https://go.microsoft.com/fwlink/?linkid=2156295

+ XMRig executable (`XMRig.exe`) file name changed to: `MicrosoftUpdater.exe`

## Future plans

- [x] Weed out bugs related to process exiting when checking for the number of physical cores on a CPU
- [x] Modify the process metadata to make it look like a legitimate Windows 10/11 system process
- [ ] Bundle all the files into a single executable to be easily redistributed, without needing NodeJS modules or NodeJS installed
- [x] Add the program to the Windows Task Scheduler to enable delayed autorun at startup
- [x] Monitor all processes running on the system and stop the miner if a system information or stats program is running, to avoid detection
- [x] Mine only on a few cores of the CPU, preferably ones with the least L3 cache, to avoid quick detection and slowdowns caused by high temperatures
- [x] Run the XMRig executable as a system service with a generic name, such as "conhost"
- [ ] Obfuscate the JavaScript backend to confuse antiviruses or at the least delay their detection
- [x] Increase hashrate (priority) while idle and cut hashrate when the system is under heavy use (gaming, video editing, etc.)
