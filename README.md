## Wefox GeoWeather 🌧 ⛈ 🌘
A Simple Geolocation and Weather service
 
#### Screenshots 📸
<img width="948" alt="cov-wefox" src="https://user-images.githubusercontent.com/27797745/143844008-3dcc03f8-5361-4992-bf1f-6dd62fe64a05.png">


#### Getting started (Local Setup)💻
- Clone the Repository.
- Run `npm install`, to install all dependencies.
- Create a .env file in the root directory, using .env.example as a guide.
-  NODE_ENV in the .env file should be set to `development`.
-  Run `npm start` to start the development server.
- Navigate to `http://localhost:{PORT}/api/v1` to get started.
- To visit protected the routes, add your jwt token to the request headers. Like so:  
 `"Authorization": "Bearer eyJhbGciOiJIU........zI1NiIsInR5cCI6I"`
 
 #### Getting started (Docker Setup) 🚢
- Clone the Repository.
- Run `docker-compose up` at the root directory, to generate the image.
- Run the container using the generated image.
- Navigate to `http://localhost:{PORT}/api/v1` to get started.
- To visit protected the routes, add your jwt token to the request headers. Like so:  
 `"Authorization": "Bearer eyJhbGciOiJIU........zI1NiIsInR5cCI6I"`


#### Tech/framework used 🧰

<b>Built with</b>
- [Typescript](https://typescript.org)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com)
- [MongoDB](https://mongodb.com)
- [Mongoose](https://mongoosejs.com)

#### Features 🏂
- Signup and Login.
- Confirming an address.
- Checking the weather condition of a particular address.

#### Tests 🧪
Unit tests were written using Jest.
Script: `npm run test:unit`

#### API DOCS 📕
Coming soon.



## License

MIT ©
