{{- define "ingress.host" }}
{{- if .Values.pr -}}
    pr-{{ .Values.pr }}.mychips.online
{{- else -}}
    mychips.online
{{- end -}}
{{- end }}