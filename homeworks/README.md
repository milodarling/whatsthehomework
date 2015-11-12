How to add teachers/classes
=============

Teachers and classes are stored here in JSON files.

###How to set up a class's JSON file

Each JSON file has the following entries:

* `title`: String, mandatory. A simple title for that class's homework page (e.g. `"What's the Mr. Smith homework?"`)
* `customhtml`: String, optional. A place to put your own HTML tags that will be placed below the subtitle for that class's homework page (e.g. `"<p>Mr. Smith Rocks!</p><br/><img src='mrsmith.jpg'>"`)
* `homeworks`: Array, mandatory. An array of homeworks with their due dates and assignments for that date. See below for more information

###The `homeworks` field

**When creating a JSON file for a class, it is recommended to make the `homeworks` field an empty array (i.e. `"homeworks": []`) and to use the web interface for adding/editing assignments. That being said, here is a description of what will go in the `homeworks` array:**

Each item in the `homeworks` array is a dictionary with the following entries:

* `date`: String, mandatory. The due date for the homework assignment.
* `homework`: Array of strings, mandatory. An array of the assignments due that day. Each item in this array will get its own bullet point.

###Example JSON file

    {
    	"title": "What's the Calculus III homework?",
    	"customhtml": "<a href='http://ocw.mit.edu/courses/mathematics/18-02-multivariable-calculus-fall-2007/' target='_blank'>Link to MIT OpenCourseWare for multivariable calculus (very useful for studying)</a>",
    	"homeworks": []
    }

One would then leave the editing of the `homeworks` array to the web interface.