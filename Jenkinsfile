// pipeline {
//     agent any

//     tools {
//         nodejs 'node server' // Use the name you configured in Global Tool Configuration
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git 'https://github.com/msbaladev/ci-cd-test.git'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Build') {
//             steps {
//                 sh 'npm run build' // Adjust this command based on your build process
//             }
//         }

//         stage('Test') {
//             steps {
//                 sh 'npm test' // Adjust this command based on your testing process
//             }
//         }

//         stage('Deploy') {
//             steps {
//                echo 'deploying'
//                 // Example: sh 'scp -r ./dist user@server:/path/to/deploy'
//             }
//         }
//     }

//     post {
//         always {
//             // Clean up workspace or other post-build actions
//             cleanWs()
//         }
//     }
// }


pipeline {
    agent any
    
    tools {
        nodejs 'node server' 
       }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/msbaladev/ci-cd-test.git', credentialsId: 'github-pat', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }
        stage('Build') {
            steps {
                echo 'npm run build...'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cp -r * /var/www/nodeapp'
                sh 'pm2 startOrRestart ecosystem.config.cjs'
            }
        }
    }
      post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
