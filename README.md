# Wiki-API
A RESTful API built using Node.js and Express.js which allows you to perform all CRUD operations using MongoDB as the database (along with mongoose) on articles just like on a Wikipedia like website.

# Usage

The "/articles" route is used to access all the articles in one go and thus serves to GET, POST and DELETE requests.
The GET request sent to this route returns all the articles present inside the connected MongoDB database at the time.
The POST request is sent a new article object to be added into the database.
The DELETE request sent to this route deletes all the articles present in the database at the time.

You can also append the article title to the "/article" route as in "/article/oranges" to manipulate that specific article using the HTTP verb requests.
The requests available in this case are the GET, PUT, PATCH and DELETE requests.
The GET request gets the specified article, PUT request replaces the specified article, PATCH request updates the article and DELETE request in this case deletes only the specified article.

All the data exchange happens in JSON format. The articles getting stored or received have two fields: "title" and "content".
