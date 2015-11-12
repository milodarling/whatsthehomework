whatsthehomework
=============

whatsthehomework is a web app created using Node.js and Jade with the goal of bringing homework online. By 2015, it seems like a given that a teacher would put his/her homework online. However, some teachers still do not. So, I created this web app to allow students to easily access daily assignments online, and for the moderator to easily add and edit assignments. As a result, the site has a clean and accessible home page and homework listing for classes as well as an easy-to-use and robust homework editing interface.

###How to use whatsthehomework

whatsthehomework is a Node.js app, so you'll need Node.js running on your server. Start off by setting up Node.js (and probable nginx too). [Here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) is a great guide to setting up Node.js and nginx for use with web apps.

After you have Node.js running and an nginx reverse proxy pointing towards this Node app (meaning it's pointing to the port specified in `app.js`), you'll want to configure this site for your own needs. Here are a few things you'll want to do:

* Change the port in `app.js` (if you want). The port on which the server runs is configurable, so you can edit that in the `app.js` file if you'd like.
* Change the password to edit and add homework. The SHA-256 hash of the password is configurable in `app.js`, so go ahead and choose your own password, [get the SHA-256 hash](http://www.xorbin.com/tools/sha256-hash-calculator), and put it in `app.js`.
* Change the home page (`views/home.jade`). The home page is pretty generic, so you could keep it the same, however, it currently asks other students to contact you (the moderator) if they have a teacher whose homework they'd like to put on this site, so you can either take that part down or put your real email up there.
* Change the footer. Each homework page has a footer that says "Made with ♥ by Milo Darling." If you want to change or delete that, do so in `views/teacher.jade`.
* Add classes. Classes can be added in the `homeworks` folder. It is fairly easy to change, and there is a readme in the [`/homeworks` folder](/homeworks) with detailed instructions on adding classes.

###License

whatsthehomework is licensed under the MIT License. TL;DR You can use this software pretty much however you want. You can modify and redistribute it, so go ahead and use this to help fellow students!

    Copyright (c) 2015 David Darling



Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.