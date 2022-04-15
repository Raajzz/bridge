# BRIDGE - BACKEND

# API CALLS

## FILTERING THROUGH QUERY PARAMS

<hr>

### keyword 
> Used to filter based on the name of the product, uses regex to filter. <br><br>
Example, if there are two products named Product1 and Product2, the query param, `keyword=prod` will fetch both product1 and product 2 <br><br>
Pretty much the search functionality of any application.

<br>

### category
> Search based on a particular category. Note, there can be many products using a specific category, therefore search is done through regular string matching.<br><br>
Example, if there are 10 products with the same category `Smart Phone`, then those 10 products will be fetched as a result of fixing the same category. <br><br>
In the frontend, this category shall be a dropdown or similar hardcoded selection fields.

<br>

### price\[gte] and price\[lte]
> `[gte]` refers to `greater than or equal to` and `[lte]` refers to lesser than or equal to. This is used to selected items based on price

<br>

### page
> The page query string is used for pagination. The number of products per page is still yet to be resolved and can be confirmed only after some discussion. Right now the hard coded value is 5 per page. <br>
If the page value is such that there's no product left to be displayed then the last page will be displayed by default