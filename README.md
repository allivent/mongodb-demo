# DemoWebApp

Check it out at: https://tranquil-bayou-25612.herokuapp.com/

Before starting: 
- create Heroku account
  - primary language = node
- create Github account
- install command line tools for each 
  - heroku: https://toolbelt.heroku.com/ 
  - github: https://help.github.com/articles/set-up-git/#setting-up-git
- install Node.js and npm

To set up and run:

- fork project at https://github.com/zsobin/DemoWebApp.git

- `heroku login`
- `git clone https://github.com/YourUserName/DemoWebApp.git`
- `cd DemoWebApp`

- `heroku create`
- `git push heroku master`
- `heroku open` 

- `npm install`
- `heroku local web`
- check out http://localhost:5000

To set up mongodb:

- Add mLab MongoDB Sandbox to Heroku
  - (https://devcenter.heroku.com/articles/mongolab)
  - Add db credentials/URI to your .env file to test locally
- Setup and add Mongoose to your webapp
  - (http://mongoosejs.com/docs/index.html)
- Create a file named .env in the main directory and paste the input from this command 
  - heroku config | grep MONGOLAB_URI
  - You will need to replace the : with a = and remove spaces It should look like: MONGOLAB_URI=mongodb://...
- Take a look at index.js to see how to connect and setup your database as well as handling GET and POST requests
  - Learn more about GET vs POST here (http://www.w3schools.com/tags/ref_httpmethods.asp)
- The data you handle from index.js can be handled and rendered in pages/index.ejs through JavaScript templating
  - Learn more about ejs JavaScript templating here (http://www.embeddedjs.com/)
- Run heroku local in your mongodb-demo folder and go to http://localhost:5000
