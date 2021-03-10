# Marker - Data Model

- Firestore already returns the doc id by default

## Definition
```
{
  group: reference,
  latLng: geopoint,
  name: string,
  tsCreated: timestamp,
  tsUpdated?: timestamp
}
```

## Example
```json
{
  "group": "groupCollection/MMmNTVx11zQdiQrmRXBtoyTgKxX2",
  "latLng": {
    "latitude": 142.354,
    "longitude": -35.243,
  },
  "name": "New Marker",
  "tsCreated": "2021-12-31T23:59:59.999999999Z"
}
```
