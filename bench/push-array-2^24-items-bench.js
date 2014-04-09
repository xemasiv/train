var log = console.log
    , print = function ( ms, n ) {
        var avg = 1000 * n / ms;
        log( '- total elements: %d.', n );
        log( '- elapsed: %d secs.', ( ms / 1000 ).toFixed( 4 ) );
        log( '- average: %d el/sec.', avg.toFixed( 0 ) );
    }
    , a = []
    , p = 24
    , k = Math.pow( 2, p )
    , i = 0
    , stime = 0
    , etime = 0
    ;

log( '- running Array#push( 1 ) 2^%d times', p );

i = k;

stime = Date.now();

for ( ; i--; ) {
    a.push( 1 );
};

etime =  Date.now() - stime;

a.length = 0;

print( etime, k );