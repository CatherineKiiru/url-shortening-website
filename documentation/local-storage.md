### Local Storage
A local storage interface is a web API that allows web applications to store and retrieve data in a user's web browser. The local storage API provides a way of persisting data on the client side. This means that if you refresh or close the webpage, the data will still be available in your local storage. 

Imagine a scenario where you accidentally refresh a webpage when you were writing a post on Twitter. All the content you had written is now lost and you have to rewrite your post again. 

With local storage, you have now have a place to store data locally in your browser, which will still be available even after refreshing a webpage or closing browser. But why is is called a localStorage object? Because the localStorage API provides a key-value storage mechanism that allows web applications to store and retrieve data in a persistent manner, similar to how we store data in objects as properties. It is also called an "object" because it is implemented as an instance of the Storage object in the DOM API. 

### localStorage methods
localStorage API uses methods to pass or access data within the local storage. They include:

1. setItem(Key, value) - This methods allows you to store values in local storage.

2. getItem(key) - This method allows you to retrieve the value stored in the local storage based on the key provides. This method returns the value associated with the key as a string
3. removeItem()
4. clear()
5. key()


### When to use LocalStorage API
Loca storage sounds easy to use and quite accessible. So it's great for storing small amounts of data that you need quick access while navigating your browser. It's however, not ideal for storing large amounts of data or sensitive resources like passwords, banking details, or secret keys because localStorage is accessible to the public. 


### How to access values stored in localStorage
The syntax for accessing a value in localStorage is `localStorage.getItem(keyname)` Where:

- localStorage: The keyword that gives you access to the local storage
- getItem: Method for storing or retrieving data
- (keyname): A string that represents the key you want the get the value of

Note that local storage only stores data as strings so if you want to store lisists, numbers, or objects, you have to convert these data types into strings with the JSON.stringify() method

### Where can you find localStorage 
We mentioned earlier that localStorage stores data as objects that are accessible with 

### Difference between localStorage and sessionStorage 


### Let's build with LocalStorage
This demo will show you how to use local storage in a project - use this example 

## localStorage

```JavaScript
let savedURLs = [];
if (localStorage.getItem("saved")) {
  savedURLs = JSON.parse(localStorage.getItem("saved"));
  RebuildSavedURLS();
}
```

1. The code above starts by declaring an array variable called savedURLs. We'll use the array to store the savedURLS

2. We're using a conditional statement to check if the value represented by the "saved" key is stored in localStorage.

3. Since we're only using the if statement, it means that the condition is true, so we'll retrieve the "saved" value from localStorage, with the getItem() method.

4. The value we're retrieving from localStorage is a string. We'll use JSON.parse() method to convert the string into an array the assign the array to the savedURLs variable. 

5. We're using the JSON.parse() method because any data recieved from a web server comes as a string. Remember, JSON is used to exchange data to and from a web server. 

JSON.parse can also be used to convert strings into objects. The only exeption is date objects. You'd need to convert the date object into a strin in order for it to parse the JSON method. 

Finally, the function calls another function called RebuildSavedURLS which will rebuild and update the HTML structure based on the data saved in the SavedURLs array. 

## Using localStorage and The Map method

```JavaScript
let savedURLs = [];

function RebuildSavedURLS() {
  return savedURLs.map((url) => {
      return htmlStructure(url.id, url.originalUrl, url.shortUrl);
    })
    .join(""); //concatenates the returned values into one string
}
```
1. The function above iterates over the savedURLs array using the map() method. 
2. Inside the map method, we're defining a function that takes an object called url
3. The url function returns another function called htmlStructure, and passes in the url object with the properties we defined earlier in the htmlStructure function. 
4. The mapped values are passed into the savedURLs array, then concatenated into one string by the join() method.  

