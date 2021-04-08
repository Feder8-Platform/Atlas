pipeline {
  agent {
    kubernetes {
      yaml """\
        apiVersion: v1
        kind: Pod
        spec:
          serviceAccount: jenkins
          volumes:
          - name: docker-auth
            emptyDir: {}
          containers:
          - name: aws-cli
            image: amazon/aws-cli
            imagePullPolicy: IfNotPresent
            command:
            - cat
            tty: true
            volumeMounts:
            - name: docker-auth
              mountPath: /root/.docker
          - name: node-12-15-builder
            image: node:12.15-buster-slim
            imagePullPolicy: IfNotPresent
            command:
            - cat
            tty: true
            resources:
              requests:
                cpu: 1
                memory: 1Gi
              limits:
                cpu: 1
                memory: 1Gi
          - name: kaniko
            image: gcr.io/kaniko-project/executor:v1.5.2-debug
            imagePullPolicy: IfNotPresent
            command:
            - /busybox/cat
            tty: true
            volumeMounts:
            - name: docker-auth
              mountPath: /kaniko/.docker
            resources:
              requests:
                cpu: 1
                memory: 1Gi
              limits:
                cpu: 1
                memory: 1Gi
        """.stripIndent()
        slaveConnectTimeout 400
    }
  }
  stages {
    stage('Build image and push') {
      steps {
        dir('Atlas') {
          checkout([$class: 'GitSCM', branches: [[name: 'develop']], extensions: [], userRemoteConfigs: [[credentialsId: 'susverwimp-github-credentials', url: 'https://github.com/solventrix/Atlas.git']]])
        }
        container('aws-cli') {
            sh '''\
            PASSWORD=$(aws ecr get-login-password --region eu-west-1)
            USERNAME=AWS
            BASE64=$(echo -n "$USERNAME:$PASSWORD" | base64 -w 0)
            printf '{"auths":{"973455288590.dkr.ecr.eu-west-1.amazonaws.com":{"auth": "%s"}}}' "$BASE64" > /root/.docker/config.json
            cat /root/.docker/config.json
            '''.stripIndent()
        }
        container('node-12-15-builder') {
          dir('Atlas') {
            sh "./build_central.sh"
          }
        }
        container('kaniko') {
          dir('Atlas') {
            sh "./build_image.sh"
          }
        }
      }
    }
  }
}
