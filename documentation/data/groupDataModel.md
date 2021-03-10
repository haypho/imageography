# Group - Data Model

- Firestore already returns the doc id by default

## Definition
{
  name: string,
  color: string,
  tsCreated: firebase_timestamp,
  tsUpdated?: firebase_timestamp
}

## Example
{
  "name": "New Group",
  "color": "#ff21da",
  "tsCreated": "2021-12-31T23:59:59.999999999Z"
}
