const { execSync } = require('child_process');

function checkIfAnyProcessIsRunning(processImageName) {
  const output = execSync(`tasklist /FI "IMAGENAME eq ${processImageName}`, {encoding: 'utf-8'});
  return !output.includes(`INFO: No tasks are running which match the specified criteria.`);
}

console.log(checkIfAnyProcessIsRunning('perfmon.exe'));