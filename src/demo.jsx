'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {ReactActionStatePath, ReactActionStatePathClient} from 'react-action-state-path';
import Accordion from 'react-proactive-accordion';
import {Boxes, Stacks} from './react-responsive-boxes';

class App extends React.Component {
    render(){
        var path=window.location.href; 
        var root=path.split('?');
        var RASPRoot=root[0]+'?/';
        if(root.length===1 && path[path.length-1]!=='?') path+='?'; // append a ? to the end if it's just the file name
        // only the first instance of ReactActionStatePath looks at path and RASPRoot. 
        // in this demo '?' is used to separate the file name from the rest of the URL because when you are opening demo.html on a file system, and the file system does not like demo.html/anything
        // but demo.html? works, and so does demo.html?/
        // if you are strictly serving from a server, the ? is not required
        return (
            <div className="wa-landing">
                <Boxes className='wa-top-box'>
                        <div className='wa-intro-wrapper'>
                            <div className='wa-intro-logo'>
                                <img src="images/Prosperity Accord Logo.png" height={window.fontSize * 4 + 'px'} />
                                <div>For Confidence in Your Invenstment Management</div>
                            </div>
                            <img className='wa-intro-logo-bg' src="images/at table floor.png" width="100%" style={{display: "block"}}/>
                        </div>
                        <div  className='wa-intro-image'>
                            <img src="images/at table.png" width="100%" />
                        </div>
                </Boxes>
                <div className='wa-top-line'>
                    <h1>Why Use Prosperity Accord?</h1>
                </div>
                <Boxes className="wa-whys-boxes">
                    <Stacks className="wa-why-stacks">
                        <i className="fa fa-eye fa-2x" />
                        <div>
                            <h2>See how you are really doing</h2>
                            <p>Whether the market is up or down, today, this week, this month, or this year see how your whole portfolio, across all your accounts, is doing compared to benchmarks.</p>
                            <p>Many high priced wealth manages give you a number, but they don't tell you if that's better or worse than someone else.</p>
                            <p>We want to know, and show you, how were doing compared to other choices.</p>
                        </div>
                    </Stacks>
                    <Stacks className="wa-why-stacks">
                        <i className="fa fa-sliders fa-2x" />
                        <div>
                            <h2>Manage your savings across many accounts</h2>
                            <p>You and your spouse have 401k's with your employers, IRA's with more than one brokerage, and maybe even a joint brokerage account. Easily choose the best funds and asset allocation given your choices, then see and manage your portfolio across all these accounts.</p>
                            <p>Many high priced wealth managers want all your money in their account.</p>
                            <p>We think putting all your eggs in one basket is a risks strategy. </p>
                        </div>
                    </Stacks>
                    <Stacks className="wa-why-stacks">
                        <i className="fa fa-balance-scale fa-2x" />
                        <div>
                            <h2>Our Interests Are Aligned</h2>
                            <p>Our fees are a lot lower, and based on how much money you make, and there is no charge in any month when you don't make money.</p>
                            <p>Many high priced wealth managers charge you based on the total value of your portfolio. So, they make money even when you lose money. Their interests are not aligned with yours.</p>
                            <p>Ours are. We will be working to make sure you make as much money as possible and that you don't lose money. </p>
                        </div>
                    </Stacks>
                </Boxes>
            </div>
        );
    }
}


ReactDOM.render(

  <App />,

  document.getElementById('root')

);


