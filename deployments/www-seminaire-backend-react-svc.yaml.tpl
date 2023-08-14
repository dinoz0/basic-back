---
apiVersion: v1
kind: Service
metadata:
  name: svc-www-seminaire-backend-react
  namespace: mtrg
spec:
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP
  type: NodePort
  selector:
    app: "www-seminaire-backend-react"
