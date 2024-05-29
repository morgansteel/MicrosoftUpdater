# Checks for any trace of Process Explorer on the system in C:\Program Files and C:\Program Filex (x86) as well as C:\%UserProfile%\Downloads
# Process Explorer is very effective at identifying crypto miners so it is essential that the miner knows when it starts

$pathChecks = @(
    "$env:ProgramFiles",
    "$env:ProgramFiles(x86)",
    "$env:UserProfile\Downloads"
)

$processExplorerPath = $null

foreach ($path in $pathChecks) {
    $processExplorerPath = Get-ChildItem -Path $path -Filter procexp.exe -Recurse -ErrorAction SilentlyContinue
    if ($processExplorerPath) {
        Write-Output "Path to Process Explorer found: $($processExplorerPath.FullName)"
        break
    }
}

if (-not $processExplorerPath) {
    foreach ($path in $pathChecks) {
        Write-Output "Checking for Process Explorer under a different name: procexp64.exe"
        $processExplorerPath = Get-ChildItem -Path $path -Filer procexp64.exe -Recurse -ErrorAction SilentlyContinue
        if ($processExplorerPath) {
            Write-Output "Path to Process Explorer found: $($processExplorerPath.FullName)"
        }
    }
}