[demo] (http://prosperityaccord.com)
# prosperity-accord
We need a quick and easy way to look at our retirement/investment portfolio that shows us how we are doing relative to some bench mark.

## Demo
This demo uses react-action-state-path for state and path management, and react-proactive-accordion for smooth opening and closing of the table and rows.

http://prosperityaccord.herokuapp.com


If you git fork https://github.com/ddfridley/prosperity-accord you can open the file dist/demo/demo.html with your browser and it will work. (Tested on windows with edge and chrome). You can also run 

    node dist/server.js 

to fire up a server. http://localhost:5000

To install and run this on heroku, after you have an account and have installed the heroku tool belt:

    heroku create
    heroku config:set NPM_CONFIG_PRODUCTION=false
    heroku config:set MAIL_CHIMP_USER="xxxxxxxxxxxxxxxxxxxxxxxxx"  
    heroku config:set MAIL_CHIMP_ID="xxxxxxxxxx"

    git push heroku master

Mail Chimp user and id should not be stored in your repo so everyone can share.  Set them in the environment, they are unique to each users.

Now go to the URL they created for you when you ran heroku create.  
You have to set NPM_CONFIG_PRODUCTION to false, because other wise npm/heroku won't install the dev dependencies otherwise.

