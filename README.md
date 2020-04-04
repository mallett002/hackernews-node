# GraphQL Tutorial

### To The Start Server
- Run `npm start`
- Server will run locally on port 4000

### A query to get a list of Links:
```
query {
  feed {
    id
    description
    url
  }
}
```

### A query for a specific link by id:
```
query {
  link(id: "link-2")
  {
    description
  }
}
```

### A mutation to create a new Link:
```
mutation {
  post(
    url: "www.prisma.io",
    description: "prisma replaces traditional ORMs"
  ) {
    id
  }
}
```

### A update mutation:
```
mutation {
  updateLink(
    id: "link-1",
    description: "this needed changed"
  ) {
    id
  }
}
```

### A mutation to delete by id
```
mutation {
  deleteLink(id: "link-0")
  {
    id
    description
    url
  }
}
```