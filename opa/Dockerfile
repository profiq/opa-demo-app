FROM openpolicyagent/opa:0.23.0

COPY policy.rego /root/policy.rego

EXPOSE 8181

CMD ["run", "--log-level=debug", "--server", "/share/data.json" ,"/root/policy.rego"]