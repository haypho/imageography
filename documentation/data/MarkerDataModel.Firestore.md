# Marker - Data Model

- Firestore already returns the doc id by default

## Definition
```
{
  author: string,
  authorID: string,
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
  "author": "JohnDoe123",
  "authorID": "kITE53g942FsO",
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
