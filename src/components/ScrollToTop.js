import React from 'react';

function ScrollToTop(){

    let handleClick = () => {
        window.scrollTo(0, 0); // Performs an instantenious scroll to the top left of the window
    }

    return (
        <div>
            <button onClick={() => {handleClick()} }>Go To Top</button>
        </div>
    );
}

export default ScrollToTop;