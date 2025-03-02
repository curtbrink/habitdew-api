pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.BRANCH_NAME}"

        TEST_DB_USER = credentials('test-db-user');
        TEST_DB_PASS = credentials('test-db-password');
        TEST_DB_HOST = "host.docker.internal";
        TEST_DB_PORT = "5432";
        TEST_DB_DATABASE = "postgres";
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub repository
                git branch: 'main', url: 'https://github.com/curtbrink/habitdew-api'

                // grab the app name and version from the package.json
                script {
                    def packageJson = readJSON file: 'package.json'
                    def hdVersion = packageJson.version
                    def hdName = packageJson.name
                    
                    env.HD_VERSION = hdVersion
                    env.HD_NAME = hdName
                }
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

//         stage('Test') {
//             steps {
//                 // Run tests if applicable
//                 sh 'npm test'
//             }
//         }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Generate env file') {
            when { branch 'main' }
            steps {
                script {
                    sh "touch .env"
                    sh "echo \"DB_HOST=$TEST_DB_HOST\" >> .env"
                    sh "echo \"DB_USER=$TEST_DB_USER\" >> .env"
                    sh "echo \"DB_PASSWORD=$TEST_DB_PASS\" >> .env"
                    sh "echo \"DB_DATABASE=$TEST_DB_DATABASE\" >> .env"
                    sh "echo \"DB_PORT=$TEST_DB_PORT\" >> .env"
                }
            }
        }

        stage('Build Docker image') {
            when { branch 'main' }
            steps {
                script {
                    // Build the Docker image and tag it with the version
                    def imageName = "${env.HD_NAME}:${env.HD_VERSION}"
                    sh "docker build -t ${imageName} ."
                }
            }
        }

        stage('Remove existing Docker container') {
            when { branch 'main' }
            steps {
                script {
                    def containerExists = sh(script: "docker ps -a -q -f name=${env.HD_NAME}", returnStdout: true).trim()
                    if (containerExists) {
                        // Stop and remove container if it's running
                        sh "docker stop ${env.HD_NAME}"
                        sh "docker rm ${env.HD_NAME}"
                    } else {
                        echo "Container ${env.HD_NAME} does not exist, skipping stop/remove."
                    }
                }
            }
        }

        stage('Deploy Docker image') {
            when { branch 'main' }
            steps {
                script {
                    // recreate container with new image
                    sh "docker run -d -p 28602:28602 --add-host=host.docker.internal:host-gateway --name ${env.HD_NAME} ${env.HD_NAME}:${env.HD_VERSION}"
                }
            }
        }
    }
}
