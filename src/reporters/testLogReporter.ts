import fs from 'fs';
import path from 'path';
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'automation.log');

function appendLog(line: string): void {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
  fs.appendFileSync(LOG_FILE, `${line}\n`, 'utf8');
}

class TestLogReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite): void {
    const message = `Run started — ${suite.allTests().length} test(s), workers=${config.workers}`;
    console.log(message);
    appendLog(message);
  }

  onTestBegin(test: TestCase): void {
    const message = `Starting ${test.title}`;
    console.log(message);
    appendLog(message);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const status = result.status;
    const message =
      status === 'passed'
        ? `Passed ${test.title}`
        : status === 'skipped'
          ? `Skipped ${test.title}`
          : `Failed ${test.title}${result.error ? `: ${result.error.message}` : ''}`;

    if (status === 'failed') {
      console.error(message);
    } else if (status === 'skipped') {
      console.warn(message);
    } else {
      console.log(message);
    }
    appendLog(message);
  }

  onEnd(result: FullResult): void {
    const message = `Run finished — status=${result.status}`;
    console.log(message);
    appendLog(message);
  }
}

export default TestLogReporter;
