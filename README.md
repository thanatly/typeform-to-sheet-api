# typeform-to-sheet-api
> A REST API to sync delete action on Typeform and Googlesheet 
## Features
This project makes it easy to:
* Delete answer entry on both Typeform and Googlesheet with one request 
* Fetch answers from Typeform survey through API endpoint
* Setup for Typeform autentication in a seperate module
## Requirements
For development, you will only need Node.js and a node global package, Yarn, installed in your environement.
### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn
## Running the project

    $ git clone https://github.com/thanatly/typeform-to-sheet-api
    $ cd typeform-to-sheet-api
    $ yarn install

## Configure app
Create `.env` file based on `.env-example` with your own credentials. You will need:
- For `TYPEFORM_API_BASE_URL`, `APPLICATION_URL`, `CLIENT_ID`, `CLIENT_SECRET`, `DEFAULT_FORM_ID` refer to [Typeform API guide](https://developer.typeform.com/get-started/personal-access-token/).
- For `GOOGLE_SCRIPT_URL` refer to Google App Script's [documentation on deployment](https://developers.google.com/apps-script/concepts/deployments)

## Contributing
This project is still work in progress. If you have any suggestions, just [open an issue][issues] and tell me what you think.
If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
## Related projects
- [Link to my sample Typeform](https://finatalie13.typeform.com/to/sY1gauC4?typeform-source=admin.typeform.com)
- [Sample Typefrom API project by Typeform](https://github.com/Typeform/results-example)
- [Google App Script CRUD by Richard Blondet](https://gist.github.com/richardblondet/ce87a397ef669d4d25dd21ea02b9dda1)
## Documentation
- [Typeform's APIs](https://developer.typeform.com)
- [Apps Script | Google Developers](https://developers.google.com/apps-script)
## Licensing
This project is licensed under MIT license. This license does not require you to take the license with you to your project.

[issues]:https://github.com/thanatly/typeform-to-sheet-api/issues