POST http://localhost:1337/graphql
```graphql
query Person($personId: ID) {
  person(id: $personId) {
    name
  }
}

variables {
  "id": 42
}
```
