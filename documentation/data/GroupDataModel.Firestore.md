# Group - Data Model

- Firestore already returns the doc id by default

## Definition
```
{
  color: string,
  name: string,
  tsCreated: timestamp,
  tsUpdated?: timestamp
}
```

## Example
```json
{
  "color": "#ff21da",
  "name": "New Group",
  "tsCreated": "2021-12-31T23:59:59.999999999Z"
}
```
