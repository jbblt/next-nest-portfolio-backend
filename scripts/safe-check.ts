import { execSync, spawn } from 'child_process';

function run(command: string) {
  console.log(`➡️  Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

function main() {
  try {
    run('npm run lint');
    run('npm run ts');
    run('npm run build');

    const nodeProcess = spawn('node', ['dist/src/main.js'], {
      stdio: 'inherit',
    });

    setTimeout(() => {
      console.log('\n✅ BUILD AND START SUCCESSFUL');
      nodeProcess.kill('SIGINT');
      process.exit(0);
    }, 3000);
  } catch (error: any) {
    console.error('\n❌ SAFE CHECK FAILED');
    process.exit(1);
  }
}

main();
