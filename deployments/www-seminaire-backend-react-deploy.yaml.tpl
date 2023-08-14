---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: www-seminaire-backend-react
  namespace: mtrg
  annotations:
    kubernetes.io/change-cause: {{ .CI_PROJECT_PATH }}
    reloader.stakater.com/auto: "true"
  labels:
    exposed: "true"
spec:
  replicas: 1
  selector:
    matchLabels:
      app: www-seminaire-backend-react
  template:
    metadata:
      labels:
        app: www-seminaire-backend-react
    spec:
      automountServiceAccountToken: false
      containers:
      - name: seminaire-backend
        image: {{ .CI_REGISTRY_IMAGE }}:{{ .CI_COMMIT_TAG }}
        ports:
        - containerPort: 80
          name: http
        envFrom:
          - configMapRef:
              name: cm-www-seminaire-backend-react

        livenessProbe:
          httpGet:
            path: /
            port: http
            # httpHeaders:
            # - name: Custom-Header
            #   value: Awesome
          initialDelaySeconds: 3
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: http
            # httpHeaders:
            # - name: Custom-Header
            #   value: Awesome
          initialDelaySeconds: 3
          periodSeconds: 10

        resources:
          requests:
            memory: "200Mi"
            cpu: "250m"
          limits:
            memory: "200Mi"
            cpu: "300m"
        imagePullPolicy: Always
      imagePullSecrets:
        - name: creds-registry.gitlab.com
      restartPolicy: Always
