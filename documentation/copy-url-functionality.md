
## Copy Url Functionality
Here we'll use a ForEach method to call a function for each element in our array

The forEach method is an iterative method that executes a specified function for each element in an array. This method calls a callback function, that iterates once through an array, in an ascending indexed order. 

The forEach method takes in two parameters, a callback function as it's parameter, and an optional argument

Syntax `forEach(callbackFn, arg)`

### Copy URL functionality breakdwon
1. For the copy, section, we created a function called copyURL()

2. Inside the function, we created a copyButtons variable and assigned it a queryselector method that will select all the elements with the classname `copy-new-url`. This CSS selector is from the HTML structure we defined earlier.

3. Then we call the variable and use the forEach method, to create a callback function, that takes in a button argument
4. We then add an eventlistener that listens for the user's actions whenever they click the button.

5. The forEach method iterates over every `button` element in the copyButtons array. This button element we've passed it into the callback function as an argument. 

For each button element, the function adds an event listener for the "click" event. When the button is clicked, the actions below are executed:

First we define three variables `urlText, body, area` which we'll use to excecute these tasks:
1. The function retrieves the closest ancestor element with the classname `url-shorten-result` by using the closest() method. The classname is the first css selector in the html structure function

- *The closest() method checks your elements until it finds the closest node that matches the css selector you specified*

2. Then we select the body tag with the body variable
3. Then we create a new element with the createElement() method. 

These three variable methods will be used to append the body with the area element we just created, then create a new value which we'll assign to the urlText. 

Next, we use the clipboard API which enables you to copy and paste data. 

## Understanding the forEach method
The forEach method iterates an array of items such as objects. A forEach method takes in a callback function as it's parameter. the callback takes in three parameter options i.e. an element, index and array. The element is compulsory, but the other two are optional.

- The element is used as a variable to store the element in an array
- Index is the element's index in the array
- The array is the array the callback was called on

## Understanding the copy URL functionality
I am trying to achieve a scenario where whenever the user clicks on the copy button, the data they copied can be stored temporarily until they paste that data elsewhere.

For this to happen, we need this flow:

- Define a function
- Create a variable and assign it a classname that point to the button element with the query selector method. Why? I want to create a dynamic copy button, where the user can copy and paste url data. This data will be stored in the clipboardAPI. 

- Next, we can then call the variable we assigned the classname above, then create a callback function with the forEach method. This allows you to always execute the same functionality whenever a user clicks the copy button. We're basically instructing the callback function to execute the logic, everytime the user clicks on the button. What we're basically saying is that "for each button click, execute the logic associated with it in a synchronous manner"

- The callback function takes in a button parameter which we're getting from the html structure function we defined earlier. 

We will then use the eventListerner method to listen for every action the user performs when they click on the button.

So what's the logic that powers the copy button functionality?

We first need to dynamically define the text areas where we'll place the original, & shortened url. Then we'll define the delete button area. This is the flow:

1. Start by defining a urlText variable that we'll assign the following values:
- The closest css selector that gives us access to the whole html structure. In this case, it's "url-shorten-results.
- The querySelector method that selects the css selector that contains the shortened url structure. In this case it's "new-url"
- Finally, the paragraph element that contains the shortened url

2. Next, define a variable called body that selects the body element of the overall html document with the querySelector() method. This "opens up" the html document to allow us to add JS logic to the url section. If you don't select the body tag, html will not "allow" you access to that sepcific section that we're assigning the logic. 

3. Define another variable called "textArea" and assign it the createElement method. This method "tells" html to create a text area that will help us add our copy url functionality.

4. We now want to append the text area we've created to the html document, so we'll use the append method and pass in the textArea variable as the type of element we want to create. 

5. Next, because we used the createElement method, we now have access to properties that we can use to manipulate the DOM. We're using the value prop to assign the value from the textArea valriable to the urlText variavle. In simpler terms, we want the textArea we created to hold the value from the urlText variable. 

6. So now we've defined the urltext, the text area and appended both to the body of the html element. We now need the ability to select all the content within the copy button. We'll use the select() method to allow to enable the user to select all the content in the text area we defined earlier.  

7. Once the user selects the content, how do they copy to the clipboard? By using the clipborad API, which temporarily stores copied data. We're trying to dynamically add the copy text on the button so that JavaScript rerenders the same button and labels it everytime the user clicks on a button. 

This means that we'll use the navigator.clipboard.writeText() API which takes in a parameter of the textArea value that we assigned the urlText value. This value will be appended to the button and rerender anytime the user wants to copy the shortened urls.

8. Next, we'll use the classlist.add() property of JavaScript to add the "copied" css selector to our document section. The classList method allows us to directly manipulate a css attribute. The return value of a classList property is an array

9. Then we'll use the innerHTML DOM property to add the "Copied" string to the button

10. Because we want to render and rerender the copy and copied strings on the button element, we'll use a settimeout function which removes and rerenders the copied & copy text on the button after every 2 seconds
 
## Understanding the Delete Button Functionality










  
