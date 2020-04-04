# GraphQL Tutorial

### To The Start Server
- Run `npm start`
- Server will run locally on port 4000

### A basic query to get a list of Links:
```
query {
  feed {
    id
    description
    url
  }
}
```

### A basic mutation to create a new Link:
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
