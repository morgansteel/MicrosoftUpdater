# js-cryptojacker

A JavaScript cryptojacker (or simply "miner") that pretends to guide the user through a software installation process while actually reading their system information to determine if CPU mining is worthwhile on their system.
It runs in the background; at the moment, it is easily detectable.

> [!CAUTION]
> THIS PROJECT IS MALWARE! Only run this in an isolated environment where it can be controlled.
> I am not responsible for thermal-related damage caused to a system by careless mining or any such repercussions that result from running this program.

## Future plans

- [ ] Weed out bugs related to process exiting when checking for the number of physical cores on a CPU
- [ ] Modify the process metadata to make it look like a legitimate Windows 10/11 system process
- [ ] Bundle all the files into a single executable to be easily redistributed, without needing NodeJS modules or NodeJS installed
- [ ] Add the program to the Windows Task Scheduler to enable delayed autorun at startup
- [ ] Monitor all processes running on the system and stop the miner if a system information or stats program is running, to avoid detection
- [ ] Mine only on a few cores of the CPU to avoid quick detection and slowdowns caused by high temperatures
- [ ] Run the XMRig executable as a system service with a generic name, such as "conhost"
- [ ] Obfuscate the JavaScript backend to confuse antiviruses or at the least delay their detection
- [ ] Increase hashrate while idle and cut hashrate when the system is under heavy use (gaming, video editing, etc.)

> [!NOTE]
> Though this program is malicious software it is not intended to be used for personal gain. Please do not reuse this software to mine on others' systems without permission.
