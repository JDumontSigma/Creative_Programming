# TE2006JDAHRM
Collaborative Piece for University Assessment

#Hints for this tutorial
Within these hint replace <folder_name> with the appropriate replacement

#Changing Folder
###To enter a folder
  To go into a folder type
    cd <folder_name>

###To exit a folder
  To exit one layer
    cd ../

  To exit more than one layer
    cd ../../

###To create a new branch
    git branch <branch_name_here>

###To change merge
    git checkout <the_branch_you_want_to_change_to>

    //Checkout the changes to make sure they work

    Then upload them to git

    git push

###To merge branches after agreement
    First change to the branch you want to merge in to

    Then type

    git merge <the_branch_your_merging>

###Process for uploading

####1.Check which files you have changed
    git status
####2. Add the files
    git add -A
####3. Commit the changes
    git commit -a -m "Your Message Here"
#####if you accidently hit enter to soon and get a weird screen
    type :wq (then enter)

#####4. Push the changes
    git push

    if you get an error message try
    git pull

####5. Rinse and Repeat
