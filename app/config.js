require.config({
  // make components more sensible
  // expose jquery 
  paths: {
    "components": "../bower_components",
    "jquery": "../bower_components/jquery/dist/jquery",
    "d3": "../bower_components/d3/d3"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





