// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "d3"], function( $, D3 ) 
{
  $('body').append('jQuery ' + $.fn.jquery + ' loaded!<br>');

  if( D3 )
  {
      $('body').append('D3 is here!');

  }
});
