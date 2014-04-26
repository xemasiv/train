var log = console.log
    , assert = require( 'assert' )
    , Train = require( '../' )
    , t = Train()
    , qhead = t.qhead
    , qtail = t.qtail
    , qroll = null
    , a = []
    , l = 16
    , i = l
    , hlen = l >> 1
    , tlen =  l + 1 - hlen
    , offset = hlen >> 1
    ;

// fill array with l + 1 values 
for ( ; ~i; a[ i ] = i-- );

// build queue
qhead.push.apply( qhead, a.slice( 0, hlen ) );
qtail.push.apply( qtail, a.slice( hlen ) );

log( '- queue filled with %d items. %d in t.qhead, %d in t.qtail', a.length, hlen, a.length - hlen );

// move head position
t.hpos = offset;

log( '- moved head position to index %d.', offset );

// start rollup
t.rollUp();

log( '- rollUp started.' );

// check roll property
assert.equal( t.roll, true );

log( '- pop %d items reaching the end of t.qhead, then perform a single shift.', offset );

// pop and move head position to the end
t.pop( offset );

// hpos === qhead.length || ! qroll.length

t.shift();

log( '- check items in the roll queue.' );

// check qroll result
assert.deepEqual( t.qroll, a.slice( offset, offset << 1 ) );

log( '- perform %d shifts leaving only one item.', t.qhead.length - 1 );

// shift to the end of queue - 1
i = 0;

for ( ; i < t.qhead.length - 1; ++i, t.shift() );

log( '- now try to pop %d elements ( only 1 left ).', a.length );
// empty t.qhead, there is only 1 element,
// however test pop with a greater number.
t.pop( a.length );

log( '- check items in the roll queue.' );

// check qroll result
assert.deepEqual( t.qroll, a.slice( offset ) );

log( '- rollBack() queue.' );
t.rollBack();

log( '- check qhead items.' );
// check qhead result
assert.deepEqual( t.qhead, a.slice( offset ) );

log( '- check other properties.' );

assert.equal( t.qtail.length, 0 );
assert.equal( t.qroll.length, 0 );
assert.equal( t.hpos, 0 );
assert.equal( t.roll, false );