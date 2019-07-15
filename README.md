# Contact Keeper
Contact Keeper is an app that you can register with your email 
and keeping your contacts data. 

## Technical Details
This project is a **Fullstack MERN App** for testing **React's new feature Hooks** and 
writing better readable and clean React code. Also by using Context API 
with *useContext* and *useReducer* hooks, you can make a large application without Redux or
any other state management library.

## How to Use
You need to create a **.env** file in the *root folder* and you need to 
give parameters as;

##### .env
```
mongoURI="your mongo uri",
jwtSecret="your secret to sign jwt"
```

### Development
To run Node.js server and React client(webpack) run `npm run dev`

### Production
To run the Node.js server with public distribution folder, 
1. Go to client folder and run `npm run build` to create build folder.
2. Go to root folder and run `npm run start` .
