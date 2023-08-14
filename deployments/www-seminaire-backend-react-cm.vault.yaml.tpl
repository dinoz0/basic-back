apiVersion: v1
kind: ConfigMap
metadata:
  name: cm-www-seminaire-backend-react
  namespace: mtrg
data:
  SERVER_PORT : "{{.SERVER_PORT}}"
  DB_HOST : "{{.DB_HOST}}"
  DB_PORT : "{{.DB_PORT}}"
  DB_NAME : "{{.DB_NAME}}"
  DB_USER : "{{.DB_USER}}"
  DB_PASS : "{{.DB_PASS}}" 
