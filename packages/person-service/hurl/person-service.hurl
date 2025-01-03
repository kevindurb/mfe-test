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

POST http://localhost:1337/graphql
```graphql
mutation CreatePerson($name: String) {
  createPerson(name: $name) {
    id
    name
  }
}

variables {
  "name": "kevin"
}
```
