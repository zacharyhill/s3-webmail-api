### Token Access

Currently, we only have a way to get a token that expires. After testing (i.e. when this backend is finished) I will add a way
to dynamically set the Database name as well as get a token that does not expire. For now we'll keep things simple though.

### Securing Your API

In order to login and get a token for your routes on /secure-api/ you'll need to generate a password and save it to the DB in a Users collection.

#### Generating the Password

Go into the `/setup_scripts/` directory and run `node make_password.js <your_password_here>`

DO NOT send in quotes or they will be part of the password. Copy the entire output from the terminal, then go to the next step.

# CURRENTLY NOT WORKING - DO THIS MANUALLY
## currently saving the password in an edited format (excluding dollars signs)

#### Creating a User with the Secured Password

Go into the `/setup_scripts/` directory and run `node make_user.js <username> <password_output_from_previous_step>`

NOTE: currently, this step will save your user to a *users* collection inside of the *Mail* database. This is the default inside of the app. If you plan to configure your app to use a different database name, you'll have to do this manually. Just setup a users collection and give it a username and password field.
