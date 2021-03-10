# Marker - Data Model

- Firestore already returns the doc id by default

## Definition
```
{
  name: string,
  latLng: geopoint,
  groupID: string,
  tsCreated: timestamp,
  tsUpdated?: timestamp
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
