# Freshbey

An open-source and self-hostable ecommerce application with a focus on developer productivity and ease of customization.

### Here's the homepage of [Freshbey](https://freshbey.herokuapp.com/) ✨ to showcase the working of the application.

![homepage-freshbey](https://user-images.githubusercontent.com/70762571/167148307-718dabc9-057d-4296-853a-6da097d800d4.png)

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

Freshbey is an open-source and self-hostable ecommerce application with a focus on developer productivity and ease of customization.

## Current State

As of now, Freshbey is built using MERN stack. Additionally, [React Bootstrap](https://react-bootstrap.github.io/) along with [Bootswatch Zephyr](https://bootswatch.com/zephyr/) theme is used for styling and [React Redux](https://react-redux.js.org/) is used for state management.

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

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGODB_URI =
JWT_SECRET =
EMAIL_USERNAME =
EMAIL_PASSWORD =
EMAIL_HOST =
EMAIL_PORT =
CLOUDINARY_CLOUD_NAME =
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 
```

### Add data in .env file

The backend folder in this repository serves as the codebase for the API server which connects to a MongoDB instance to store and retrieve user, products, orders data.

#### MONGODB_URI

MongoDB version = 5.0.12. You can either spin up a local/Docker instance or can use MongoDB Atlas (Recommended). 

Here's the similar URI which can be used to connect with the cluster
`mongodb+srv://admin:<password>@cluster0.p2u97.mongodb.net/freshbey?retryWrites=true&w=majority`

Replace <password> with the password for the admin user.

#### JWT_SECRET

Add any string like YOUR_NAME_ANY_SIGN (eg. chrismathew7) is used to create a private key which will authenticate.

#### EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT

To get this credentials you need a [Mailtrap](https://mailtrap.io) account. Mailtrap is an Email testing tool. We can simulate this for the forget and reset password functions.

Select Nodemailer from integrations. You will get credentials similar to this,

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
  
#### CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
Product images are hosted in Cloudinary. Create an account in Cloudinary and add appopriate credentials in `.env` file.

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

Server should be running on `PORT` specified in env file (or `5000` by default)

To test, type `localhost:PORT/` in your browser and following output should appear.

```
{
  message: 'Welcome to Freshbey Backend',
  version: process.env.VERSION,
  license: 'MIT',
}
```

## Mail Service

[Mailtrap](https://www.example.com) (A Email Sandbox Service) is used as an email inbox to reset passwords.

## Image Service

The Images for product, slide, category are manually hosted in [Cloudinary](https://cloudinary.com/)

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
