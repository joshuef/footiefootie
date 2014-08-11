# footie

A simple d3 stats page for FootballlllLLL!!!!!!!


## My Take 

This was an interesting one, as I got to play play with some donut, charting which I'd never done before!

I started out utilising the require.js yo generator (https://github.com/danheberden/yeoman-generator-requirejs), and then threw in the latest d3 to get something I could work with. (To get ie8 to work, you'd need to include something like 'aight' https://github.com/shawnbot/aight).

Then it was a matter of setting up a chart generator for re-usability, and then importing the data. The json file sent isn't valid json, which means the normal methods of retrieving the data (d3.json / $.ajax ) failed, so I took the crude step of including the data in the html file. Crass, I know, but I figured retrieving the data from a server wasn't the main focus of the task.

(In the end, if we could know the data and include it server side, this would save us one HTTP request, which is always nice; even if it is async...)

Once I'd built and tweaked the donut generator (in main.js), I included some tween animations for the numeric values and percentages.

Then it was a matter of styling it. There is some basic d3 in there to make the charts responsive, but I fixed the width of the page to not get too deep into the responsive element of this. (If i were too, I think I'd go with a few sets of breakpoints to keep everything looking clean; otherwise you'd need some js maths to position the WDL chart.)

I'm not sure what the font is, so I just went with system fonts, so it loses some of it's style there. But all in all, it fits pretty closely (though admittedly not perfectly), to the designs. 

As a quick (~4 hours) mock up, I'm pretty happy with it.


## Building the code

The generator came with a grunt task (simply run `grunt`) to concat everything into the `dist` folder. So that sorted that out. Although it doesn't include any modifications to the routes, which is possible with grunt, eg: `<!-- build:js scripts/dist/require.js -->` to update the route for the compressed code.

## Improvements

I haven't actually looked at grunt-cdn before, but if you're using a CDN for production this should help serve files as rapidly and efficiently as possible. Especially useful for d3 and jquery here as the files could well already be cached on a users computer / device.

Lazy loading of images isnt needed here, as there are no images. Though it could be applied to grabbing the data, so we could show a placeholder loading icon, while we grab the data and prep the charts. That way the user is already looking at something while another request is going on.

If we're using a CDN, then we could prefetch the content here, and simply apply the HTML5 `rel="dns-prefetch"`.

Something else to speed up the page, could be the prefetching of links to `See All Stats` or the home page. We could prefetch the html in the background while the user is looking at the shiny, graphs, and then when they get bored of that and click elsewhere, we already have the content! On mobile devices, this could be data-intesive running on the links before the user wants them, but we could check for touch-start and grab the content of a link then, before the touch is finished and registered as a proper click on a link.

That could be nice.


Anywho!

I enjoyed building this. So thank's for that! I'd appreciate any feedback even if you're not looking to take this further.

Cheeeeeeers,

j


P.S.: Stock readme for building NPM and bower projects below...




## Getting Started

Make sure you have the latest packages installed

```
npm install
bower install
```

Note: If you don't have `npm` installed, make sure you have
[node](http://nodejs.com) installed. If you don't have bower,
`npm install -g bower`.

The above steps will download all the required software to
build and run this app, such as [grunt](http://gruntjs.com),
[requirejs](http://requirejs.org), and [jquery](http://jquery.com).

## Running the server

You can run your app using `grunt preview`. This will start a
server on `localhost:8000`, meaning you can simply go to the
url [localhost:8000/index.htm](http://localhost:8000/index.htm)
while it's running.

If you'd like to run the compiled version, run
`grunt preview-live`.

## Building the application

This application uses requirejs to load the various modules in
the app folder. However, upon build, all of these files are
concatenated and minified together to create a small, compressed
javascript file.

Running `grunt` by itself will run through all of the steps of
linting the javascript, building out dependencies and ultimately
creating `/dist/require.js`.


## Deploying your application on a server

Assuming you're already ran `npm install` and `bower install`,
the only pieces required to run the application in its built
state is running `grunt`.

If you're using a webserver like apache or nginx, you'll want
to create a redirect from `/components/requirejs/require.js` to
`/dist/require.js`. (*Note: this is exactly what `grunt
preview-live` does*)
