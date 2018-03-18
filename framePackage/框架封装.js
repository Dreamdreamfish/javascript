var myTrim = function ( str ) {
    if ( str.prototype.trim ) {
        return str.trim();
    } else {
    string = string.replace(/^\s+|\s+$/, '');
}


var select = function ( selector, context, results ) {
    results = results || [];
    var newSelectors = selector.split(',');
    each ( newSelectors, function ( i, v) {
        results.push.apply( results, get ( myTrim ( v ), context) );
    });
    return results;
};


var get = function ( selector, context, results ) {
    results = results || [];
    context = context || document;
    var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
        m = rquickExpr.exec( selector );
    if( m ) {
        if ( context.nodeType ) {
            context = [ context ];
        }
        if ( typeof context == 'string') {
            context = get( context );
        }
    	each ( context, function ( i, v ) {
            if ( m[ 1 ] ) {
    			results = getId ( m[ 1 ], results );
    		} else if ( m[ 2 ] ) {
    			results = getClass ( m[ 2 ], context, results );
    		} else if ( m[ 3 ]) {
    	        results = getTag ( m[ 3 ], context, results );
    	    } else if ( m[ 4 ] ) {
    	    	results = getTag ( m[ 4 ], context, results );
    	    }
        }
    }    
    return results;
};



var mypush = function ( target, els ) {
    var j = target.length,
        i = 0;
    while (target[j++] = els[i++]) {}
        target.length = j - 1;
};

var getTag = function ( tag, context, results ) { 
    results = results || [];
    try {
        results.push.apply ( results, context.getElementsByTagName ( tag ) );
    } catch ( e ) {
        mypush ( results, context.getElementsByTagName ( tag ) );
    }
    return results; 
};

var getId = function ( id,results ) {
    results = results || [];
    results.push.apply ( results, document.getElementById ( id ) );
    return results;
};

var getClass = function ( className, context,results ) {
    var tags = getTag( "*" );    
    results = results || [];
    if (document.getElementsByClassName) {
        results.push.apply( results, context.getElementsByClassName ( className ) );
    } else {
        for ( var i = 0; i < tags.length; i++ ) {
            if( ' ' + tags[i].className + ' '.indexOf(' ' + className + ' ') !== -1 ) {
                results.push( tags[i] );
            }
        }
    }
    return results;
};


var each = function ( arr, fn ) {
    for (var i = 0; i < arr.length; i++) { 
        if ( fn.call( arr[i], i, arr[i]) === false ) {
            break;
        }
    }
};