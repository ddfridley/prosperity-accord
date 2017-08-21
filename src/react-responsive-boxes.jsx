'use strict';

import React from 'react';
import ClassNames          from 'classnames';

export class Boxes extends React.Component {
// if viewport is wider than tall (desktop), lay children out horizontally
// otherwise lay them out vertically (smartphone)
    renderChildren (width,horizontal) {
        return React.Children.map(this.props.children, child => {
            return(
                <div style={{width: width+'%', display: horizontal ? 'inline-block' : 'block'}}
                className={ClassNames(this.props.className, {childhorizontal: horizontal}, {childvertical: !horizontal})}
                >
                    { child }
                </div>
            );
        });
    }
    render(){
        const {className}=this.props;
        let count=this.props.children.length;
        let w=1920; // if this is running on the server, pick something
        let h=1080;
        if(typeof document !== 'undefined'){
            w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        }
        var horizontal=  w > h;
        var widePercent = horizontal ? 100/count : 100;
        return (
        <section className={ClassNames(className, {horizontal: horizontal}, {vertical: !horizontal})} >
            { this.renderChildren(widePercent, horizontal) }
        </section>
        );
    }
}

export default Boxes;

export class Stacks extends React.Component {
// if viewport is wider than tall (desktop), lay children out vertically
// otherwise lay them out horizontally (smartphone)
    renderChildren (horizontal) {
        return React.Children.map(this.props.children, child =>{
                return (
                    <div style={{display: horizontal? 'table-cell' : 'inline-block'}}
                    className={ClassNames(this.props.className, {childhorizontal: horizontal}, {childvertical: !horizontal})}>
                        { child }
                    </div>
                );
        });
    }
    render(){
        let w=1920; // if this is running on the server, pick something
        let h=1080;
        if(typeof document !== 'undefined'){
            w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        }
        var horizontal= !(w > h);
        const {className}=this.props;
        return (
        <section style={{display: horizontal ? 'table' : 'block'}}
            className={ClassNames(className, {horizontal: horizontal}, {vertical: !horizontal})} 
        >
            { this.renderChildren(horizontal) }
        </section>
        );
    }
}