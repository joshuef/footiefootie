// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(
["jquery", "d3" ], 

function( $, D3 ) 
{
    var App = 
    {
        init : function ( )
        {
            $('footer').append('jQuery ' + $.fn.jquery + ' loaded!<br>');

            $('footer').append('D3 is here!');


            var stats = allData.stats;
            var drawTimes = stats.gamesPlayed - stats.gamesWon - stats.gamesLost;


            var winData = 
            [ 
                { name : "W", value: stats.gamesWon }, 
                { name : "D", value: stats.gamesPlayed - stats.gamesWon - stats.gamesLost },
                { name : "L", value: stats.gamesLost  }
            ] ;

            console.log( winData );
            this.makeDonut( winData, '.js-wdl', 16 );


            
        },

        /**
         * Make Donut
         * @param  { array } data    array of data to be parsed into a donut chart
         * @param  { string } element jquery selector to append the chart to
         */
        makeDonut : function ( data, element, thickness )
        {

            // Lets make the chart spacious
            var margin = 
            {
                top:    10, 
                right:  10, 
                bottom: 10, 
                left:   10
            };

            //set our general sizes
            var width = 260 - margin.left - margin.right;
            var height = width - margin.top - margin.bottom;

            var chart = d3.select( element )
                        .append( 'svg')
                        .attr( 'width' , width + margin.left + margin.right)
                        .attr( 'height' , height + margin.top + margin.bottom)
                        .append( 'g' )
                        .attr('transform', 'translate(' + ( (width / 2 ) 
                            + margin.left ) + ',' + ( ( height / 2 )
                            + margin.top ) + ")");


            var radius = Math.min( width, height ) / 2;


            //Define our colour scheme here
            var color = d3.scale.ordinal()
                .range( [ "#2FA843",  "#E6E6E6",  "#D4000F" ] );

            var arc = d3.svg.arc()
                    .outerRadius( radius )
                    .innerRadius( radius - thickness ); //16px thick

            var pie = d3.layout.pie()
                    .sort( null )
                    .startAngle( 0 ) //go from zero
                    .endAngle( 2* Math.PI ) //all the way round
                    .value( function( d ) { return d.value; } );


            var g = chart.selectAll( ".arc" )
                    .data( pie( data ) )
                    .enter().append("g")
                    .attr( "class", "arc" );

            g.append("path") //lets add the path for styling
                .style("fill", function(d) 
                    { 
                        return color( d.data.name ); 
                    })
                .transition().delay( function( d, i ) 
                    { 
                        return i * 500; 
                    })
                .duration(500)
                .attrTween( 'd', function(d) 
                {
                    var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                    return function(t) 
                    {
                       d.endAngle = i(t);
                     return arc(d);
                    }
              });
        }

    };

    App.init()
});
