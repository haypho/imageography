# Marker - Data Model

- Firestore already returns the doc id by default

## Definition
```
{
  name: string,
  groupID: string,
  tsCreated: firebase_timestamp,
  tsUpdated?: firebase_timestamp
}
```

## Example
```json
{
  "name": "New Group",
  "groupID": "MMmNTVx11zQdiQrmRXBtoyTgKxX2",
  "tsCreated": "2021-12-31T23:59:59.999999999Z"
}
```
