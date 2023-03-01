# Dynamic Admin Apps for GraphDL Schemas


## Northwind Example

```yaml
_name:        Northwind
_seed:        https://json.fyi/northwind.json
_defaultId:   entityId
_constraints: true

Category:
 _name: ${categoryName} - ${description}
 categoryName: string
 description: string
 picture: https://img.do/northwind/${categoryName}.jpg

Customer:
 _name: companyName
 _icon: 
 companyName: string
 address: string
 city: string
 postalCode: string
 region: string
 country: string
 contactName: string
 contactTitle: string
 phone: phone
 mobile: phone
 fax: phone
 email: email
 
Employee:
 _name: ${firstname} ${lastname}, ${title}
 titleOfCourtesy: string
 firstname: string
 lastname: string
 birthDate: date
 hireDate: date
 title: string
 address: string
 city: string
 postalCode: string
 region: string
 country: string
 phone: phone
 extension: string
 mobile: phone
 email: email
 mgrId: Employee.entityId
 photo: https://img.do/northwind/employee/${entityId}.jpg
 notes: richtext

EmployeeTerritory:
 _name: territoryCode
 employeeId: Employee
 territoryCode: Territory.territoryCode
 
OrderDetail:
 _name: ${quantity} ${productId->name}
 orderId:   Order
 productId: Product
 
Product:
 _name:      productName
 categoryId: Category
 supplierId: Supplier
 
SalesOrder:
 _name: ${date(orderDate)} - ${count(<-OrderDetail)} Items
 customerId: Customer
 employeeId: Employee
 shipperId:  Shipper

Shipper:
 _name: companyName
 
Supplier:
 _name: companyName
 
Region:
 _name: regiondescription
 
Territory:
 regionId: Region
```


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
  
  
  
  
  
