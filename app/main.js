// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(
["jquery", "d3" ], 

function( $, D3 ) 
{
    var App = 
    {
        /**
         * Initialize the page
         * 
         */
        init : function ( )
        {
            var self = this;
            this.setupCharts();

        },


        /**
        * Set up charts
        *
        * Parses data and initialises the chart set up functions
        */
        setupCharts : function ( )
        {
            //Let's set up our data
            var stats = allData.stats;
            var drawTimes = stats.gamesPlayed - stats.gamesWon - stats.gamesLost;

            var winData = 
            [ 
                { name : "W", value: + stats.gamesWon }, 
                { name : "D", value: + stats.gamesPlayed - stats.gamesWon - stats.gamesLost },
                { name : "L", value: + stats.gamesLost  }
            ] ;


            var passingData =
            [
                { name: "Passing accuracy", value: + stats.passingAccuracy },
                { name: "remains", value: 100 - stats.passingAccuracy }
            ];


            var posessionData =
            [
                { name: "Posession", value: + stats.averagePossession },
                { name: "remains", value: 100 - stats.averagePossession }
            ];


            var goalsFor =
            [
                //rounding to 2dp
                { name: "Goals", value: + stats.goals / stats.gamesPlayed  }
            ];

            var goalsAgainst =
            [
                { name: "Goals Conceded", value: Math.round( ( stats.goalsConceded / stats.gamesPlayed ) * 10) / 10 }
            ];


            //So let's build the charts now
            this.makeDonut( winData, '.js-wdl', 200 );
            this.makeDonut( passingData, '.js-passing-accuracy', 140, true );
            this.makeDonut( posessionData, '.js-posession', 140, true );

            this.makeNumberChart( goalsFor, '.js-goals' );
            this.makeNumberChart( goalsAgainst, '.js-goals--conceded' );
            

        },


        /**
         * Make Number Chart
         *
         * Bulds an animates just a numerical statistic, using the animateNumber
         * method
         * @param  { array }  data    array of data to be parsed into a donut chart
         * @param  {element } element d3 selector for html element
         */
        makeNumberChart : function( data, element )
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
                .append( 'svg' )
                .attr( 'width' , "100%" )
                .attr( 'height' , "100%" )
                .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
                .attr('preserveAspectRatio','xMinYMin')
                .append( 'g' )
                    .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");


            this.animateValues( data, chart, false, true );


        },



        /**
         * Make Donut
         * @param  { array } data    array of data to be parsed into a donut chart
         * @param  { string } element jquery selector to append the chart to
         * @param  { int } width how wide should the chart be in px
         * @param  { boolean } percentage lets jsut display the %
         */
        makeDonut : function ( data, element, width, percentage )
        {
            if ( ! width )
            {
                width = 200;
            }

            var height = width; //lets make it a simple box

            var chart = d3.select( element )
                    .append( 'svg' )
                    .attr( 'width' , width )
                    .attr( 'height' , height )
                    .attr('viewBox','0 0 '+Math.min(width,width)+' '+Math.min(width,height))
                    .attr('preserveAspectRatio','xMinYMin')
                    .append( 'g' )
                    .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");


            var radius = Math.min( width, height ) / 2;


            //Define our colour scheme here
            var color = d3.scale.ordinal()
                // green / grey / red
                .range( [ "#2FA843",  "#E6E6E6",  "#D4000F" ] );

            var arc = d3.svg.arc()
                    .outerRadius( radius )
                    .innerRadius( radius - width /16 ); 

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


            if( ! percentage )
            {
                //then lets add the data.name for each data point
                chart.selectAll(".txt")
                    .data( data )
                    .enter()
                    .append("text")
                    .attr("text-anchor", "middle")
                    .text( function( data )
                    {
                        return data.name
                    } )
                    .attr("class", function(d, i )
                        {
                            return "txt" + "  wdl-" + i
                        })
                    .attr("x", function(d, i) 
                    {

                        return  - 20 - i * 1.2;

                    })
                    .attr("y", function(d, i) 
                    {
                        return  - 25 + i * 35
                    })
            }


            this.animateValues( data, chart, percentage );


        },


        /**
         * animateValues
         * @param  { array } data    array of data to be parsed into a donut chart
         * @param  { object } chart   d3 chart object
         * @param  { boolean } percentage should we only show the percentage
         */
        animateValues : function( data, chart, percentage, show1dp )
        {

            if( percentage )
            {
                //lets only show the first value, which is the percentage
                data = data.splice( 0,1 );
            }


            // and then the values
            chart.selectAll( ".value" )
                .data( data )
                .enter()
                .append( "text" )
                .text( "0" )
                .attr("text-anchor", "middle")
                .attr( "class", function( d,i )
                {
                    if( percentage )
                    {
                        return "value  percentage"
                    }
                    else
                    {
                        return "value"
                        
                    }
                })
                .attr( "x", function( d, i )
                {
                    if( ! percentage && ! show1dp )
                    {
                        return  15;
                    }
                    else
                    {
                        return 0;
                    }
                } )
                .attr( "y", function(d, i) 
                {
                    if( ! percentage && ! show1dp )
                    {
                        return  - 25 + i * 35;
                    }
                    else if( show1dp )
                    {
                        return  100 ;
                    }
                    else
                    {
                        return  12 ;
                    }
                })
                .transition()
                .duration( function( )
                {
                    //lets make this happen as swiftly as the arc (500 per data)
                    return 500 * data.length;
                } )
                    //And now we do the actual text animations.
                .tween( "text" , function( d ) 
                {
                    var i = d3.interpolate( this.textContent, d.value );
                    var prec;

                    if( show1dp)
                    {
                        prec = (d + "").split(".") + 1;
                        
                    }
                    else
                    {
                        prec = (d + "").split(".");
                    }

                    var round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

                    return function(t) 
                    {
                        if( percentage )
                        {
                            this.textContent = Math.round(i(t) * round) / round + "%";
                        }
                        else
                        {
                            this.textContent = Math.round(i(t) * round) / round;

                        }
                    };
                });
            
        }
              

    };



    App.init()
});
