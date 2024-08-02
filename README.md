# Recent Block Explorer

This is a simple project designed to provide basic information for the most recent blocks on the Ethereum blockchain.
To run the application, continue with this README.

## Clone the repo

Firstly, you will need to clone the repo. Navigate to a suitable directory for copying the project data
and type the following:
```
  git clone git@github.com/eggplantzzz/eth-explorer.git
```

This will copy the project files to your local machine. Afterwards, navigate into the directory by entering

```
cd ./eth-explorer
```

Once inside the main project directory, install the dependencies for the project using `npm i`. This will install all the
dependencies necessary for running the app.

## Set up your secrets file

To run the app, you will need an Infura key. This README assumes you already have an
Infura key that will allow you to access their API's.

In the root directory for this project, create a file called `.env`. Inside this file, include your Infura API key in the following format:

```
  INFURA_API_KEY="MY_INFURA_KEY"
```

Everything inside the "" should be your unique Infura API key.

After you install the dependencies and create `.env`, you will be able to run the application.

## Running the application

First, start the back-end server. Open a new terminal window, navigate to the project directory, and enter
`npm run start:server`. You should eventually see a message stating `App listening on port 3001`. Next you will have to
start the front end server.

With the back end server running, open a new terminal window. Once again, navigate to the project directory and enter
`npm run start:ui`. You should see the server for the front end initialize.

After both servers have started, you can open a browser window and navigate to "http://localhost:3000". This will bring
you to the app and display information for the latest block information that has just been fetched. You should see the
block number, the hash, and the size among other parameters.

The application is simple and will fetch new block information every 30 seconds. You will see the latest block information update in the UI. It will store information for each
block as it fetches it and store it in the database. There are buttons for deleting all blocks stored in the database as well
as a button for displaying information for all of the blocks the application knows about. Enjoy!
