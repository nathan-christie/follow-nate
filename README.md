README.md
------------

follow.me
============

* Gem list is generally up to you but provide details on what you choose and why you chose it.
* Create a task list for this project in the task manager of your choice and share with myself and Tobias.
* Create models that allow a user to follow another user.
* Once designed send an email with relevant screenshots to nate@conjectur.com for approval. 
* The user model’s only attribute is “name”. You may scaffold *only* the create action and project folder.
* Create an interface that accepts post requests that allows users to “follow” other users.
* You may use SASS or LESS but pick one and explain why.
* You may use HAML or ERB but pick one and explain why.
* Should be databased backed; use whatever database you are most comfortable with. 
* Must run in the cloud and on your local environment, use heroku/ec2 whatever you prefer.
* Create a git repo for this project and share it with me on github.com, my user name is Aeramor
* Commit often with details on what you did and why you did it. (This is 'showing your work')
* The user’s “index” action should list all of the users.
* The user's "create" action should allow entering a name and should point to the index page
* The user’s “show” action should show:
    * The user’s name
    * The users the user is currently following (with a button to remove that following)
    * The users the user is not following (with a button to add that following)
    * The users currently following this user
    * The users name must be unique and fail gracefully on conflict.
* Do not create a login system for this exercise.
