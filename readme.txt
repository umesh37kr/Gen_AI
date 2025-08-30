to call any particular file we can use below command in terminal
cmd => node --env-file .env tool-calling.js

tool-calling.js file => in this file we have taken simple example of tool calling with Tavily. we have mentain message history. but this way is not good because tool calling will call continiously untill it will find the result. In advance we don't know that how much call it will do. for that we need to make it dynamically.

tool-calling2.js file => in this file we have solve the problem that is occuring in tool-calling.js, we have make dynamica call for tool calling.