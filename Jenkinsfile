pipeline {
    agent any

    stages {
        // stage("scm") {
            // steps {
                // dir('Atlas') {
                    // git credentialsId: '6121a432-5731-44ea-8734-dcdb62d0f26d', url: 'https://github.com/solventrix/Atlas.git'
                // }
            // }
        // }

        stage("build") {
            steps {
                dir('Atlas') {
                    sh './build_central.sh'
                }
            }
        }

        stage("upload image") {
            steps {
                dir('Atlas') {
                    sh './publish_central.sh'
                }
            }
        }
    }
}