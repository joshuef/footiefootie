// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "d3" ], function( $, D3 ) 
{
  $('footer').append('jQuery ' + $.fn.jquery + ' loaded!<br>');

  if( D3 )
  {
      $('footer').append('D3 is here!');

  }
});
