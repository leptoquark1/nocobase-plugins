# Workflow: JSON Extract

**Extract JSON Values from workflow scope**

### Example

Read a JSON Path from an object in workflow scope with *Dot-Notation*:

*Expected object in scope*
```json
{
  "mqtt": {
    "status": {
      "connected": true
    },
  }
}
```

*Path*
```text
    mqtt.status.connected
```

*Result*
```json
    true
```

<small>Nocobase Plugin Namespace: @leptoquark1/nb-workflow-json-extract</small>
