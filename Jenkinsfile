pipeline {
    agent any

    stages {
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