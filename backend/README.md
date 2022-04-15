# BRIDGE - BACKEND

# API CALLS

## GET

> Get all the products => http://localhost:4000/api/v1/products

> Get single product => http://localhost:4000/api/v1/product/singleproduct/<`_id` of a document from a collection in a database in mongodb>

>> In MongoDB, database has collections and collections has documents, these documents look similar to [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON), these documents are given an "object id" by MongoDB called `_id` which is unique for every document. 

<hr>

### FILTERING THROUGH QUERY PARAMS  

<br>

### keyword

> Used to filter based on the name of the product, uses regex to filter. <br><br>
Example, if there are two products named Product1 and Product2, the query param, `keyword=prod` will fetch both product1 and product 2 <br><br>
Pretty much the search functionality of any application.

> API Call for searching through keyword => http://localhost:4000/api/v1/products?keyword= \<keyword>

<br>

### category

> Search based on a particular category. Note, there can be many products using a specific category, therefore search is done through regular string matching.<br><br>
Example, if there are 10 products with the same category `Smart Phone`, then those 10 products will be fetched as a result of fixing the same category. <br><br>
In the frontend, this category shall be a dropdown or similar hardcoded selection fields.

> API Call for getting products from a particular category => http://localhost:4000/api/v1/products?category=smart%20watch <br>
Here, the category is `smart watch` we have to provide `smart%20watch` as `%20` is the encoded value of whitespace

<br>

### price\[gte] and price\[lte]

> `[gte]` refers to `greater than or equal to` and `[lte]` refers to lesser than or equal to. This is used to selected items based on price 

> Get product based on price => http://localhost:4000/api/v1/products?price[gte]=1000&price[lte]=12000

<br>

### page

> The page query string is used for pagination. The number of products per page is still yet to be resolved and can be confirmed only after some discussion. Right now the hard coded value is 5 per page. <br>
If the page value is such that there's no product left to be displayed then the last page will be displayed by default

> Get product in pages => http://localhost:4000/api/v1/products?page=2

<hr>

## POST

### Posting New Products

> New products must be posted according to the schema defined [here](./models/ProductModel.js), where the one with `required:true` must be given a key-value pair

> Posting New Products => http://localhost:4000/api/v1/products?page=10

> Use postman for posting the body

<hr>

## PUT

Updating an existing product
> API Call => http://localhost:4000/api/v1/product/delete/<`_id` of a document from a collection in a database in mongodb> <br> The `_id` must already exist and we should be provide a new body altogether for updating the product

<hr>

## DELETE

Delete an existing product
> API Call => http://localhost:4000/api/v1/product/delete/6257b9d1758631102aa5d5cd <br> The `_id` of the product must already exist

<hr>