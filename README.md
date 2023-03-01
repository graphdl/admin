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
  _detail: 
    include: [Album.id<-Photo.albumId]
  title:  string
  userId: User.id
  
Photo:
  _seed:        https://jsonplaceholder.typicode.com/photos
  _id:          id
  _name:        title
  _list:        cards
  albumId:      [Album.id]
  title:        string
  url:          imageUrl
  thumbnailUrl: imageUrl
  
ToDo:
  _seed:      https://jsonplaceholder.typicode.com/todos
  _id:        id
  _name:      title
  _list:      kanban(completed)
  title:      string
  completed:  bool
  
User:
  _seed:      https://jsonplaceholder.typicode.com/users
  _id:        id
  _name:      name
  _list:
    fields:   [name, email, `${address.street}, ${address.city}`, company.name, phone, website]
  _detail:
    _include: [[Post],[Album],[Album->Photo],[ToDo]]
  name:       string
  username:   string
  email:      string
  address:
    street:   string
    suite:    string
    city:     string
    zipcode:  string
    geo:
      lat:    latitude
      lng:    longitude
  phone:      phone
  website:    domain
  company:
    name:     string
    catchPhrase: string
    bs:       string

```
  
  
  
  
  
