to call any particular file we can use below command in terminal

cmd to run application ==>
     node --env-file .env tool-calling.js

cmd to run application without deprecation warning ==> 
     node --env-file .env --no-deprecation tool-calling3.js

tool-calling.js file => in this file we have taken simple example of tool calling with Tavily. we have mentain message history. but this way is not good because tool calling will call continiously untill it will find the result. In advance we don't know that how much call it will do. for that we need to make it dynamically.

tool-calling2.js file => in this file we have solve the problem that is occuring in tool-calling.js, we have make dynamica call for tool calling.

tool-calling3.js file => in this file we take input from terminal and get the output in same terminal. it will give you option to continue chat without breaking the application, if you want to close application, you can just type 'bye' and press enter, it will close the application.