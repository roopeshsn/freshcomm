# Freshbey

## https://freshbey.herokuapp.com/

![homepage-freshbey](https://user-images.githubusercontent.com/70762571/167148307-718dabc9-057d-4296-853a-6da097d800d4.png)

An online grocery store | e-commerce

## Project Purpose!

I am a huge enthusiast of open source. Contributing to open source is a fantastic way to learn and grow. Making open source contributions will require you to have been exposed to a few important concepts, practices, and transferable skills:

- Version control
- Working with tickets & issues
- Working with other developers
- Creating pull requests
- Experiencing a code review process
- Setting up a local development environment
- Contributing code to a pre-existing codebase

## General Idea

Freshbey is an e-commerce platform where users can order grocery items. I built this project originally for a client but they did not pay the agreed amount. After that, I made this project open source.

## Current State

As of now, Freshbey is built using MERN stack. Additionally, React Bootstrap is used for styling and React Redux is used for state management.

## Getting Started

### Setting up the repository

Fork the repository at - [roopeshsn/freshbey](https://github.com/roopeshsn/freshbey) to your GitHub account.

Then clone the forked repository, by typing the following line in your local terminal/powershell. Remember to replace `<your-username>` with your actual GitHub username.

```bash
git clone https://github.com/<your-username>/freshbey.git
```

Navigate to the cloned repository on your local system

```bash
cd freshbey
```

Add remotes to the parent repository. This will help you fetch the code from the
parent repo to avoid any merge conflicts later.

```bash
git remote add upstream https://github.com/roopeshsn/freshbey.git
```

To verify, use the command `git remote -v` to check if you have two remotes - origin and upstream set up.

Finally, fetch the upstream's latest code from the main branch.

```bash
git fetch upstream master
```

### ES Modules in Node

We use ECMAScript Modules in the backend of this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.

<!-- You can also install and setup Babel if you would like -->

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = 
JWT_SECRET = 
EMAIL_USERNAME = 
EMAIL_PASSWORD = 
EMAIL_HOST = 
EMAIL_PORT =
```

###  Add data in .env file
#


### MONGODB_URI


For getting URI go to [MongoDB Site](www.mongodb.com) and make a account there and you will get a uri like this

`
 mongodb+srv://admin=(ADMIN_INFO_TO_BE_INSERTED).mongodb.net/myFirstDatabase?retryWrites=true&w=majoritymyFirstDatabase?retryWrites=true&w=majority
`

### JWT_SECRET


   Add any string like YOUR_NAME_ANY_SIGN (eg-chrismathew@123) is used to create a private key which will authenticate 


### EMAIL_USERNAME , EMAIL_PASSWORD , EMAIL_HOST , EMAIL_PORT


To get this crendentails go to [Mailtrap](https://mailtrap.io) and there sign up for free and you will get all this crendentails there and choose nodemailer in dropdown section there like below 

![dropdown section](https://user-images.githubusercontent.com/91003905/193517826-5647ca92-131c-46e2-85de-fb29e53269ba.png)  
 
#### You will get info like this 
```
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "99195eec06f5",
    pass: "d26fe4c7d762"
  }
});
```


### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Mail Service

[Mailtrap](https://www.example.com) (A Email Sandbox Service) is used as an email inbox to reset passwords.

## Build & Deploy

The project is deployed on Heroku

```
git push heroku master
```

The above command is used to deploy the project on Heroku

## Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data:

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

## Contributing

Please check out [CONTRIBUTING.md](CONTRIBUTING.md) for more information regarding how to contribute.

## Our Contributors ✨

<a href="https://github.com/roopeshsn/freshbey/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=roopeshsn/freshbey" />
</a>

## License

MIT, see [LICENSE](LICENSE)
