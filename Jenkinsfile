pipeline {
    agent any

    triggers {
        cron('0 2 * * *')
    }

    parameters {
        choice(
            name: 'TEST_TYPE',
            choices: ['smoke', 'sanity', 'regression'],
            description: 'Select which test suite to run'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Determine Test Type') {
            steps {
                script {
                    def isCronBuild = currentBuild.getBuildCauses('hudson.triggers.TimerTrigger$TimerTriggerCause').size() > 0

                    if (isCronBuild) {
                        env.ACTUAL_TEST_TYPE = 'regression'
                    } else {
                        env.ACTUAL_TEST_TYPE = params.TEST_TYPE
                    }

                    echo "Running test type: ${env.ACTUAL_TEST_TYPE}"
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (env.ACTUAL_TEST_TYPE == 'smoke') {
                        sh 'npx playwright test --grep @smoke'
                    } else if (env.ACTUAL_TEST_TYPE == 'sanity') {
                        sh 'npx playwright test --grep @sanity'
                    } else if (env.ACTUAL_TEST_TYPE == 'regression') {
                        sh 'npx playwright test --grep @regression'
                    } else {
                        error "Unknown TEST_TYPE: ${env.ACTUAL_TEST_TYPE}"
                    }
                }
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
