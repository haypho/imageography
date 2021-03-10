# Marker - Data Model

- Firestore already returns the doc id by default

## Definition
```
{
  images: Array<string>,
  latLng: geopoint,
  name: string,
  tsCreated: timestamp,
  tsUpdated?: timestamp
}
```

## Example
```json
{
  "images": [
    "https://Firebase-store-download-link",
  ],
  "latLng": {
    "latitude": 142.354,
    "longitude": -35.243,
  },
  "name": "New Marker",
  "tsCreated": "2021-12-31T23:59:59.999999999Z"
}
```
