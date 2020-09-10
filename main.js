const score = document.querySelector( '.score' );
start = document.querySelector( '.start' );
gameArea = document.querySelector( '.gameArea' );
car = document.createElement( "div" );
car.classList.add( "car" )
start.addEventListener( 'click', startGame );
document.addEventListener( 'keydown', startRun );
document.addEventListener( 'keyup', stopRun );

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false

}

const settings = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
}

function startGame( ) {
    //  console.log( 'start' );
    event.preventDefault( );
    gameArea.innerHTML = "";
    for( let i = 0; i < getQuantityElements( 100 ); i++ ) {
        const line = document.createElement( 'div' );
        line.classList.add( 'line' );
        line.style.top = ( i * 100 ) + 'px';
        line.y = i * 100;
        //    console.log( line.y )
        gameArea.appendChild( line );
    }

    for( let i = 0; i < getQuantityElements( 10 * settings.traffic ); i++ ) {
        const enemy = document.createElement( 'div' );
        enemy.classList.add( 'enemy' );
        enemy.у = -100 * settings.traffic * ( i + 1 );
        enemy.style.left = Math.floor( Math.random( ) * ( gameArea.offsetWidth - 50 ) ) + "px";
        enemy.style.top = enemy.у + 'px';

        enemy.style.background = 'transparent url(./image/enemy2.png) center / cover no-repeat';
        gameArea.appendChild( enemy );
    }

    start.classList.add( 'hide' );
    settings.start = true;


    gameArea.appendChild( car );
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.top = "auto";
    car.style.bottom = "10px";
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;

    requestAnimationFrame( playGame );
}

function getQuantityElements( elementHeight ) {

    return document.documentElement.clientHeight / ( elementHeight + 2 )
}

function makePx( str ) {
    return str + "px";
}

function checkBorder( val, height ) {
    //  console.log( settings.y )
    if( val >= 0 && val < ( gameArea.offsetWidth - car.offsetWidth ) && height >= 0 && height < ( gameArea.offsetHeight - car.offsetHeight ) ) {
        return true;
    } else {
        return false;
    }
    // if( car.style.left > 300 ) {
    //     return false
    // }
    // if( car.style.top < 0 || car.style.top > 300 ) {
    //     return false
    // }


}

function playGame( ) {
    //  console.log( 'playGame' );
    if( settings.start === true ) {
        settings.score += settings.speed;
        score.innerHTML = 'SCORE</br>' + settings.score;
        //   var x = checkBorder( );
        //   console.log( car.style.left )
        //  console.log( x )
        moveRoad( );
        moveEnemy( );
        if( keys.ArrowLeft && checkBorder( settings.x - settings.speed, settings.y ) ) {
            settings.x -= settings.speed;

        } else if( keys.ArrowRight && checkBorder( settings.x + settings.speed, settings.y ) ) {
            settings.x += settings.speed;

        } else if( keys.ArrowUp && checkBorder( settings.x, settings.y - settings.speed ) ) {
            settings.y -= settings.speed;

            //  console.log( settings.y );
        } else if( keys.ArrowDown && checkBorder( settings.x, settings.y + settings.speed ) ) {
            settings.y += settings.speed;
            //console.log( settings.y );
        }
        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';
        requestAnimationFrame( playGame )
    }

}


function startRun( ) {
    // console.log( 'start' );
    // console.log( event.key );
    keys[ event.key ] = true;
    event.preventDefault( );
}

function stopRun( ) {
    // console.log( event.key );
    // console.log( 'stop' )
    keys[ event.key ] = false;
    event.preventDefault( );
};

function moveRoad( ) {

    let lines = document.querySelectorAll( '.line' );

    lines.forEach( function ( line ) {

        line.у += settings.speed;
        //  console.log( line );
        let temp = parseInt( line.style.top )

        temp += settings.speed;
        //  console.log( temp );
        line.style.top = temp + "px";
        //  console.log( line.style.top );
        if( parseInt( line.style.top ) > document.documentElement.clientHeight ) {
            // line.у = -100;
            line.style.top = -100 + "px";

        }
    } );
}

function moveEnemy( ) {
    //   console.log( "moveEnemy" );

    let enemy = document.querySelectorAll( '.enemy' );
    enemy.forEach( function ( item ) {
        let carRect = car.getBoundingClientRect( );
        let enemyRect = item.getBoundingClientRect( );



        if( carRect.top <= enemyRect.bottom && carRect.right >= enemyRect.left && carRect.left <= enemyRect.right && carRect.bottom >= enemyRect.top ) {
            settings.start = false;
            //  console.warn( 'ДТП' );
            start.classList.remove( 'hide' );
            start.style.top = score.offsetHeight;

        }

        item.y = parseInt( item.style.top );
        // console.log( item.y );
        item.у += settings.speed / 2;
        item.style.top = item.у + 'px';

        if( item.у > document.documentElement.clientHeight ) {
            item.у = -100 * settings.traffic;
            item.style.left = Math.floor( Math.random( ) * ( gameArea.offsetWidth - 50 ) ) + "px";
        }
    } );
}