{{- define "ingress.host" }}
{{- if .Values.pr -}}
    pr-{{ .Values.pr }}.nfler.se
{{- else -}}
    nfler.se
{{- end -}}
{{- end }}