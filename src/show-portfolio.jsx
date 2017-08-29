'use strict';

import React from 'react';
import ClassNames          from 'classnames';
import S from 'string';
import {ReactActionStatePath, ReactActionStatePathClient} from 'react-action-state-path';


export class ShowPortfolio extends React.Component {
    render() {
        return (
        <ReactActionStatePath {...this.props}>
            <RASPShowPortfolio />
        </ReactActionStatePath>
        )
    }
}

class RASPShowPortfolio extends ReactActionStatePathClient {
    state={headerWidths: []};

    constructor(props){
        super(props,'key',1);
        this.props.portfolio.columns=this.props.portfolio.columns.filter(c=>c!=='assetClass');
        this.props.portfolio.columns.unshift('assetClass');
        this.title = 'portfolio'; 
        this.props.rasp.toParent({ type: "SET_TITLE", title: this.title }); // used in debug messages
    };

    segmentToState(action,initialRASP){
        // if an article is open, the article id is the path segment
        var nextRASP={}, delta={};
        let parts=action.segment.split(',');
        parts.forEach(p=>{
            if(p==='G') delta.status='statusGreen';
            else if(p==='Y') delta.status='statusYellow';
            else if(p==='R') delta.status='statusRed';
            else if(p==='a') delta.assetClass=this.props.portfolio.summary.assetClass;
            else if(this.props.portfolio.assetClasses.includes(p)) delta.assetClass=p;
            else return;
            delta.shape='open';
        })
        Object.assign(nextRASP,initialRASP,delta);
        this.calcSegment(nextRASP);
        return {nextRASP, setBeforeWait: true};
    }

    calcSegment(nextRASP){
        let parts=[];
        if(nextRASP.status) parts.push(nextRASP.status[6]) // first letter of the color
        if(nextRASP.assetClass && typeof nextRASP.assetClass!=='string') parts.push('a');
        if(nextRASP.assetClass && typeof nextRASP.assetClass==='string') parts.push(nextRASP.assetClass);
        if(parts.length) nextRASP.pathSegment=parts.join(',');
        else nextRASP.pathSegment=null;
    }

    actionToState(action,rasp,source,initialRASP){
        var nextRASP={}, delta={};
        // if the immediate child of this list (an article) changes shape to open, 
        // close all the other articles in the list, to focus on just this one.
        // if the article changes out of open, then show the list again
        if(action.type==="TOGGLE"){
            if(['statusGreen','statusYellow','statusRed'].includes(action.column)){
                if(rasp.status===action.column)
                    delta.status=null; // untoggle the status filter
                else
                    delta.status=action.column;
            }else if('assetClass'===action.column){
                if(rasp.assetClass===action.value){
                    if(typeof action.value!=='string') // a string is one asset class, a number is all asset classes, false it don't show asset classes
                        delta.assetClass=null; // untoggle the assetClass filter
                    else
                        delta.assetClass=this.props.portfolio.summary.assetClass; // show all asset classes -- this will be a number
                } else {
                    delta.assetClass=action.value; 
                }
            }
            // othewise we're clicking on a cell we don't have an action for so just ignore it by setting the state to what it was
        } else
            return null;
        Object.assign(nextRASP,rasp,delta);
        if(nextRASP.status || nextRASP.assetClass) nextRASP.shape='open';
        else nextRASP.shape=initialRASP.shape;
        this.calcSegment(nextRASP);
        return nextRASP;
    }

    static proxyGetEmptyObject={
        get: (obj, name)=>{
            if(typeof obj[name] !== 'undefined')
                return obj[name];
            else
                return {};
        },
        set: (obj, name, value)=>{
            obj[name]=value;
        }
    }

    static tableShape ={
        summary: {
            percentTotalReturnYtd: true,
            ytdReturnAboveCatOrInd: true,
            statusGreen: true,
            statusYellow: true,
            statusRed: true,
            assetClass: true
        }, 
        assetClass: {
            "assetClass": true,
            "ticker": false,
            "52WeekLow": false,
            "dollarCurrentPrice": false,
            "dollarChange": false,
            "percentWeight": true,
            "stockIndustryFundCategory": false,
            "percentTotalReturnYtd": true,
            "ytdReturnAboveCatOrInd": true,
            "percentChange": true,
            "1DayReturnAboveCatOrInd": true,
            "percentTotalReturn1Week": false,
            "1WeekReturnAboveCatOrInd": false,
            "percentTotalReturn1Month": false,
            "1MoReturnAboveCatOrInd": false,
            "percentTotalReturn3Month": false,
            "3MoReturnAboveCatOrInd": false,
            "percentTotalReturn12Month": false,
            "12MoReturnAboveCatOrInd": false,
            "percentBelow52WeekHigh": true,
            "fundManagerTenure": false,
            "morningstarRatingForFunds": false,
            "bearMarketPercentileRank": false,
            "analysisDate": false,
            "dateOfMostRecentPortfolio": false,
            "news": false,
            "totalReturn2016": false,
            "2016ReturnAboveCatind": false,
            "statusGreen": true,
            "statusYellow": true,
            "statusRed": true,
            "US Large-Cap Equity": false,
            "US Mid-Cap Equity": false,
            "US Small-Cap Equity": false,
            "Foreign Equity": false,
            "Foreign Bond": false,
            "US Bond": false,
            "Real Estate": false,
        },
        showAsset: {
            "assetClass": true,
            "ticker": true,
            "52WeekLow": false,
            "dollarCurrentPrice": true,
            "dollarChange": true,
            "percentWeight": true,
            "stockIndustryFundCategory": false,
            "percentTotalReturnYtd": true,
            "ytdReturnAboveCatOrInd": true,
            "percentChange": true,
            "1DayReturnAboveCatOrInd": true,
            "percentTotalReturn1Week": true,
            "1WeekReturnAboveCatOrInd": true,
            "percentTotalReturn1Month": true,
            "1MoReturnAboveCatOrInd": true,
            "percentTotalReturn3Month": true,
            "3MoReturnAboveCatOrInd": true,
            "percentTotalReturn12Month": true,
            "12MoReturnAboveCatOrInd": true,
            "percentBelow52WeekHigh": true,
            "fundManagerTenure": false,
            "morningstarRatingForFunds": false,
            "bearMarketPercentileRank": false,
            "analysisDate": false,
            "dateOfMostRecentPortfolio": false,
            "news": false,
            "totalReturn2016": true,
            "2016ReturnAboveCatind": true,
            "statusGreen": true,
            "statusYellow": true,
            "statusRed": true,
            "US Large-Cap Equity": false,
            "US Mid-Cap Equity": false,
            "US Small-Cap Equity": false,
            "Foreign Equity": false,
            "Foreign Bond": false,
            "US Bond": false,
            "Real Estate": false,
        },
        status: {
            "ticker": true,
            "52WeekLow": false,
            "dollarCurrentPrice": false,
            "percentBelow52WeekHigh": false,
            "dollarChange": false,
            "percentChange": false,
            "percentWeight": true,
            "stockIndustryFundCategory": true,
            "1DayReturnAboveCatOrInd": true,
            "percentTotalReturn1Week": true,
            "1WeekReturnAboveCatOrInd": true,
            "percentTotalReturn1Month": true,
            "1MoReturnAboveCatOrInd": true,
            "percentTotalReturn3Month": true,
            "3MoReturnAboveCatOrInd": true,
            "percentTotalReturnYtd": true,
            "ytdReturnAboveCatOrInd": true,
            "percentTotalReturn12Month": true,
            "12MoReturnAboveCatOrInd": true,
            "fundManagerTenure": true,
            "morningstarRatingForFunds": true,
            "bearMarketPercentileRank": true,
            "analysisDate": false,
            "dateOfMostRecentPortfolio": false,
            "news": false,
            "totalReturn2016": true,
            "2016ReturnAboveCatind": true,
            "statusGreen": false,
            "statusYellow": false,
            "statusRed": false,
            "assetClass": true,
            "US Large-Cap Equity": false,
            "US Mid-Cap Equity": false,
            "US Small-Cap Equity": false,
            "Foreign Equity": false,
            "Foreign Bond": false,
            "US Bond": false,
            "Real Estate": false,
        }
    }

    
    static shortHead ={
        "ticker": 'ticker',
        "52WeekLow": '52w Low',
        "dollarCurrentPrice": 'Price',
        "percentBelow52WeekHigh": '% < 52w Low',
        "dollarChange": '$ change',
        "percentChange": '1d',
        "percentWeight": 'weight',
        "stockIndustryFundCategory": 'Fund Category',
        "1DayReturnAboveCatOrInd": '> Avg',
        "percentTotalReturn1Week": '1w',
        "1WeekReturnAboveCatOrInd": '> Avg',
        "percentTotalReturn1Month": '1m',
        "1MoReturnAboveCatOrInd": '> Avg',
        "percentTotalReturn3Month": '3m',
        "3MoReturnAboveCatOrInd": '> Avg',
        "percentTotalReturnYtd": 'YTD',
        "ytdReturnAboveCatOrInd": '> Avg',
        "percentTotalReturn12Month": '12M',
        "12MoReturnAboveCatOrInd": '> Avg',
        "fundManagerTenure": 'Tenure',
        "morningstarRatingForFunds": 'Morningstar',
        "bearMarketPercentileRank": 'Bear %',
        "analysisDate": 'Analysis Date',
        "dateOfMostRecentPortfolio": 'Portfolio Date',
        "news": 'news',
        "totalReturn2016": '2016',
        "2016ReturnAboveCatind": '> Avg',
        "statusGreen": 'Green',
        "statusYellow": 'Yellow',
        "statusRed": 'Red',
        "assetClass": 'Asset Classes',
        "US Large-Cap Equity": "US Large-Cap Equity",
        "US Mid-Cap Equity": "US Mid-Cap Equity",
        "US Small-Cap Equity": "US Small-Cap Equity",
        "Foreign Equity": "Foreign Equity",
        "Foreign Bond": "Foreign Bond",
        "US Bond": "US Bond",
        "Real Estate": "Real Estate",
    }

    static columnButtonStyle={
            statusGreen: {color: 'white', backgroundColor: 'green'},
            statusYellow: {color: 'white', backgroundColor: 'orange'},
            statusRed: {color: 'white', backgroundColor: 'red'},
            assetClass: {color: 'white', backgroundColor: 'darkslategray'},
    }

    componentDidMount(){
        // set the max-width of the header columns just after it reders
        // then set the max-width of all the cells in the body to 0
        // this way we can animate the column width through the header max-width
        let header=this.refs.header;
        var headerWidths={};
        headerWidths.a=[];
        let i=0; 
        for(i=0; i<header.children.length; i++){ // because Element.children.forEach does exist
            let width=header.children[i].getBoundingClientRect().width;
            header.children[i].style.maxWidth=width+'px';
            headerWidths.a.push[width];
            headerWidths[this.props.portfolio.columns[i]]=width;
        }
        let tbody=this.refs.tbody;
        let row=0, col=0;
        for(row=0; row < tbody.children.length; row++){
            let cells=tbody.children[row];
            for(col=0; col<cells.children.length; col++){
                cells.children[col].style.maxWidth='0px';
            }
        }
        this.setState({headerWidths});
    }

    render(){
        const {portfolio, rasp}=this.props;
        let rows=[];
        var columnButtonStyle=new Proxy(RASPShowPortfolio.columnButtonStyle,RASPShowPortfolio.proxyGetEmptyObject);

        var numberColor=(column, value)=>{
            if(typeof value !=='undefined' && value !== null){
                if(['percent', 'dollar', 'return', 'number'].some(t=>portfolio.formats[column].format===t)
                &&  value<0)
                    return 'red'; 
                else if(column==='statusGreen') return value ? 'white':'green';
                else if(column==='statusYellow') return value ? 'white': 'darkorange';
                else if(column==='statusRed') return value ? 'white':'red';
            }
            return 'inherit';
        }

        var rowStyle=(row)=>{
            if(!this.state.headerWidths.a) return {}; // render all the rows so that the row height can be calculated
            if((row==='summary')
            || ((rasp.status && portfolio.a[row][rasp.status])&&!rasp.assetClass)
            || ((rasp.status && portfolio.a[row][rasp.status])&& rasp.assetClass ==='string' && rasp.assetClass === portfolio.a[row]['assetClass'])
            || (rasp.assetClass && typeof rasp.assetClass ==='string' && rasp.assetClass === portfolio.a[row]['assetClass']) 
            || (rasp.assetClass && typeof rasp.assetClass !=='string' && portfolio.assetClasses.includes(row)) 
            ){
                var obj={lineHeight: '100%'};
                if(portfolio.assetClasses.includes(row)) obj.backgroundColor='lightgray';
                if(row==='summary') obj.backgroundColor='#c5cae9';
                return obj;
            }
            return {lineHeight: '0%'};
        }

        var showColumn=(column)=>{
            return (
                (RASPShowPortfolio.tableShape['summary'][column]) // summary is always shown
            ||  (rasp.status && RASPShowPortfolio.tableShape['status'][column])
            ||  (rasp.status && rasp.status===column)// show the corresponding status column even though its false in the table
            ||  (rasp.assetClass && typeof rasp.assetClass!=='string' && RASPShowPortfolio.tableShape['assetClass'][column])
            ||  (rasp.assetClass && typeof rasp.assetClass==='string' && RASPShowPortfolio.tableShape['showAsset'][column])
            ) 
        }

        var columnStyle=(column)=>{
            if(!this.state.headerWidths.a) return {display: 'table-cell'}; // render all the rows so that the row width can be calculated
            if(showColumn(column)) return {maxWidth: null};
            else return {maxWidth: '0px'}
        }

        var headerStyle=(column)=>{
            if(!this.state.headerWidths.a) return {display: 'table-cell'}; // render all the rows so that the row width can be calculated
            if(showColumn(column)) return {maxWidth: this.state.headerWidths[column]+'px'};
            else return {maxWidth: '0px'}
        }

        let header= (
            <thead>
                <tr ref='header' key='header' className='portfolio-head-row'>
                    {   portfolio.columns.map(c=>
                            <th key={c} className='portfolio-column-head' style={headerStyle(c)}
                                title={S(c).humanize().s}
                            >
                                <div className='wa-table-header-cell'>
                                    {RASPShowPortfolio.shortHead[c] ? RASPShowPortfolio.shortHead[c] : c}
                                </div>
                            </th>
                        )
                    }
                </tr>
            </thead>
        );
        rows.push(
            <tr key='summary' style={rowStyle('summary')} >{portfolio.columns.map(c=>
                <td style={Object.assign({},{color: numberColor(c, portfolio.summary[c])},columnButtonStyle[c]) }
                    onClick={()=>rasp.toParent({type: "TOGGLE", row: 'summary', column: c, value: portfolio.summary[c]|| ''})}
                >
                    <div className='wa-table-row-cell'>
                        {(typeof portfolio.summary[c] !=='undefined' && portfolio.summary[c] !== null) ? portfolio.summary[c].toLocaleString(navigator.language,portfolio.formats[c] ? portfolio.formats[c].options : {}) : ''}
                    </div>
                </td>
            )}</tr>
        );
        rows=rows.concat(portfolio.assetClasses.map(r=>
            <tr key={r} style={rowStyle(r)} >{
                portfolio.columns.map(c=>
                    <td style={Object.assign({},{color: numberColor(c, portfolio.a[r][c])}, columnStyle(c))}>
                        <div className='wa-table-row-cell' onClick={()=>rasp.toParent({type: "TOGGLE", row: r, column: c, value: portfolio.a[r][c]|| ''})} style={columnButtonStyle[c]}>
                            {(typeof portfolio.a[r][c] !=='undefined' && portfolio.a[r][c] !== null) ? portfolio.a[r][c].toLocaleString(navigator.language,portfolio.formats[c] ? portfolio.formats[c].options : {}) : ''}
                        </div>
                    </td>
                )
            }
            </tr>
        ));
        rows=rows.concat(portfolio.rows.map(r=>
            <tr key={portfolio.a[r]['ticker']} style={rowStyle(r)} >{
                portfolio.columns.map(c=>
                    <td style={Object.assign({},{color: numberColor(c, portfolio.a[r][c])}, columnStyle(c))}>
                        <div className='wa-table-row-cell' onClick={()=>rasp.toParent({type: "TOGGLE", row: r, column: c, value: portfolio.a[r][c]|| ''})} style={columnButtonStyle[c]}>
                            {(typeof portfolio.a[r][c] !=='undefined' && portfolio.a[r][c] !== null) ? portfolio.a[r][c].toLocaleString(navigator.language,portfolio.formats[c] ? portfolio.formats[c].options : {}) : ''}
                        </div>
                    </td>
                )
            }</tr>
        ));

        return(
            <table className='wa-table'>
                {header}
                <tbody ref='tbody'>
                    {rows}
                </tbody>
            </table>
        )
    }
}

export default ShowPortfolio;
