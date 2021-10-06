# typeform-to-sheet-api
> An API to sync delete action on Typeform and Googlesheet 
## Features
This project makes it easy to:
* Setup for Typeform autentication in a seperate module
* Fetch answers from Typeform survey through API endpoint
* Delete answer entry on both Typeform and Googlesheet with one request 

## Requirements
For development, you will need Node.js and a node global package, Yarn, installed in your environement. Please see [Node.js documentation](https://nodejs.org/en/download/) for details. 

## Configure app
Create `.env` file based on `.env-example` with your own credentials. You will need:
- For `TYPEFORM_API_BASE_URL`, `APPLICATION_URL`, `CLIENT_ID`, `CLIENT_SECRET`, `DEFAULT_FORM_ID` refer to [Typeform API guide](https://developer.typeform.com/get-started/personal-access-token/).
- For `GOOGLE_SCRIPT_URL` refer to Google App Script's [documentation on deployment](https://developers.google.com/apps-script/concepts/deployments)

## Running the project

    $ git clone https://github.com/thanatly/typeform-to-sheet-api
    $ cd typeform-to-sheet-api
    $ npm install
    
### Running `server.js`
    $ Node server.js 
### Running Google App Script
- Create a new Google App Script. See [Getting started documentation](https://script.google.com/home/start)
- Copy the content of `google-appscript.js` and paste on `code.gs`
- Deploy the script. See Google App Script's [documentation on deployment](https://developers.google.com/apps-script/concepts/deployments). 

## Using the API 
Currently this project provides the following endpoints.

|Endpoint|Description|
|--|--|
|`GET /responses`|Get all answers submitted through your Typeform|
|`GET /responses/delete/:id`|DO NOT use this to delete the answer from Typeform. As in [the Spider of Doom](https://news.ycombinator.com/item?id=3103013), if a user can bypass security check by disabling cookies 😱 |
|`DELETE /responses/:id`|Delete an answer entry with a specified tokenId on Typeform and Googlesheet (in making) |


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
