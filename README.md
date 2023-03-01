# Dynamic Admin Apps for GraphDL Schemas

```yaml

Post:
  _seed:  https://jsonplaceholder.typicode.com/posts
  _id:    id
  _name:  title
  userId: User.id
  title:  string
  body:   markdown
  
Comment:
  _seed:  https://jsonplaceholder.typicode.com/posts
  _id:    id
  _name:  name
  email:  email
  body:   markdown
  
Album:
  _seed:  https://jsonplaceholder.typicode.com/albums
  _id:    id
  _name:  title
  title:  string
  userId: User.id
  
Photo:
  _seed:        https://jsonplaceholder.typicode.com/photos
  _id:          id
  _name:        title
  title:        string
  url:          imageUrl
  thumbnailUrl: imageUrl
  
ToDo:
  _seed:      https://jsonplaceholder.typicode.com/todos
  _id:        id
  _name:      title
  title:      string
  completed:  bool
  
User:
  
  
  
  
