POST http://localhost:1337/graphql
```graphql
query Group($groupId: ID) {
  group(id: $groupId) {
    name
    members
  }
}

variables {
  "groupId": 8
}
```

# POST http://localhost:1337/graphql
# ```graphql
# mutation CreateGroup($name: String) {
#   createGroup(name: $name) {
#     id
#     name
#     members
#   }
# }
#
# variables {
#   "name": "main group"
# }
# ```
# HTTP 200
# [Captures]
# group-id: jsonpath "$.data.createGroup.id"
#
# POST http://localhost:1337/graphql
# ```graphql
# mutation AddMemberToGroup($groupId: ID, $personId: ID) {
#   addMemberToGroup(groupId: $groupId, personId: $personId) {
#     id
#     name
#     members
#   }
# }
#
# variables {
#   "groupId": {{group-id}},
#   "personId": 1
# }
# ```
#
# POST http://localhost:1337/graphql
# ```graphql
# mutation AddMemberToGroup($groupId: ID, $personId: ID) {
#   addMemberToGroup(groupId: $groupId, personId: $personId) {
#     id
#     name
#     members
#   }
# }
#
# variables {
#   "groupId": {{group-id}},
#   "personId": 2
# }
# ```
#
# POST http://localhost:1337/graphql
# ```graphql
# mutation AddMemberToGroup($groupId: ID, $personId: ID) {
#   addMemberToGroup(groupId: $groupId, personId: $personId) {
#     id
#     name
#     members
#   }
# }
#
# variables {
#   "groupId": {{group-id}},
#   "personId": 3
# }
# ```
