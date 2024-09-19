pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'petrosvoivontas'
        GHCR_TOKEN = credentials('ghcr-token')
        DOCKER_REGISTRY_URL = 'ghcr.io'
        DOCKER_IMAGE_PREFIX = 'ghcr.io/petrosvoivontas/minigoodreads-fe'
		GOOGLE_BOOKS_API_KEY = credentials('google-books-api-key')
		BACKEND_URL = 'https://minigoodreads.ddns.net'
    }

    stages {
        stage('Docker build and push') {
            steps {
                sh '''
                    HEAD_COMMIT=$(git rev-parse --short HEAD)
                    TAG=$HEAD_COMMIT-$BUILD_ID
                    IMAGE_TAG=$DOCKER_IMAGE_PREFIX:$TAG
                    docker build --rm -t $IMAGE_TAG -f docker/Dockerfile \
					--build-arg REACT_APP_GOOGLE_BOOKS_API_KEY=$GOOGLE_BOOKS_API_KEY \
					--build-arg REACT_APP_BACKEND_URL=$BACKEND_URL \
					.
                    echo $GHCR_TOKEN | docker login $DOCKER_REGISTRY_URL -u $DOCKER_USERNAME --password-stdin
                    docker push $IMAGE_TAG
                '''
            }
        }
        stage('Install ansible prerequisites') {
            steps {
                sh '''
                    ansible-galaxy collection install kubernetes.core
                '''
            }
        }
        stage('Init ansible workspace') {
            steps {
                build job: 'minigoodreads-ansible'
            }
        }
        stage('Deploy to k8s') {
            environment {
                MINIGOODREADS_VERSION = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim().concat('-').concat(env.BUILD_ID.toString())
            }
            steps {
                ansiblePlaybook(
                        playbook: '/var/lib/jenkins/workspace/minigoodreads-ansible/playbooks/deploy-minigoodreads-fe-k8s.yaml',
                        inventory: '/var/lib/jenkins/workspace/minigoodreads-ansible/hosts.yaml',
                        extraVars: [
                                minigoodreads_fe_version: env.MINIGOODREADS_VERSION
                        ]
                )
            }
        }
    }
}
