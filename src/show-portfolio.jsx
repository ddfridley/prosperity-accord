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
        this.title = 'portfolio'; 
        this.props.rasp.toParent({ type: "SET_TITLE", title: this.title }); // used in debug messages
        this.props.portfolio.columns=RASPShowPortfolio.orderedColumns;
        this.props.portfolio.summary.ticker="all";
        this.props.portfolio.summary.percentWeight=1;
        ["US Large-Cap Equity",
        "US Mid-Cap Equity",
        "US Small-Cap Equity",
        "Foreign Equity",
        "Foreign Bond",
        "US Bond",
        "Real Estate"].forEach(assetClass=>{
            this.props.portfolio.a[assetClass].ticker='sum';
        })
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
            else if(p==='d') delta.details=true;
            else if(p==='s') delta.sortDirection=true;
            else if(p[0]==='_' && this.props.portfolio.columns.includes(p.substr(1))) delta.columnSort=p.substr(1); 
            else if(this.props.portfolio.assetClasses.some((asset)=>S(asset).slugify().s===p ? delta.assetClass=asset : false)) ; // result is set by some
            else return;
            delta.shape='open';
        })
        if(delta.columnSort) this.columnSort(delta.columnSort, delta.sortDirection);
        Object.assign(nextRASP,initialRASP,delta);
        this.calcSegment(nextRASP);
        return {nextRASP, setBeforeWait: true};
    }

    calcSegment(nextRASP){
        let parts=[];
        if(nextRASP.details) parts.push('d');
        if(nextRASP.status) parts.push(nextRASP.status[6]) // first letter of the color
        if(nextRASP.assetClass && typeof nextRASP.assetClass!=='string') parts.push('a');
        if(nextRASP.assetClass && typeof nextRASP.assetClass==='string') parts.push(S(nextRASP.assetClass).slugify().s);
        if(nextRASP.columnSort) parts.push('_'+nextRASP.columnSort);
        if(nextRASP.sortDirection) parts.push('s');
        if(parts.length) nextRASP.pathSegment=parts.join(',');
        else nextRASP.pathSegment=null;
    }

    actionToState(action,rasp,source,initialRASP){
        var nextRASP={}, delta={};
        // if the immediate child of this list (an article) changes shape to open, 
        // close all the other articles in the list, to focus on just this one.
        // if the article changes out of open, then show the list again
        if(action.type==='SORT'){
            delta.columnSort=action.column;
            delta.sortDirection=rasp.columnSort===action.column ? !rasp.sortDirection : false;
            this.columnSort(delta.columnSort,delta.sortDirection);
        }else if(action.type==='RESET'){
            delta.details=false;
            delta.assetClass=null;
            delta.status=null;
        }else if(action.type==='TOGGLE_DETAILS'){
            if(rasp.details) delta.details=false;
            else delta.details=true;
        }else if(action.type==="TOGGLE"){
            if(RASPShowPortfolio.Statuses.includes(action.column)&&action.row==='summary'){ 
                if(rasp.status===action.column)
                    delta.status=null; // untoggle the status filter
                else
                    delta.status=action.column;
            }else if('assetClass'===action.column){
                if('summary'===action.row){
                    if(rasp.assetClass) delta.assetClass=null;
                    else delta.assetClass=this.props.portfolio.summary.assetClass;
                } else if(rasp.assetClass===action.value){
                    if(typeof action.value!=='string') // a string is one asset class, a number is all asset classes, false it don't show asset classes
                        delta.assetClass=null; // untoggle the assetClass filter
                    else
                        delta.assetClass=this.props.portfolio.summary.assetClass; // show all asset classes -- this will be a number
                } else {
                    delta.assetClass=action.value; 
                }
            }else if(['percentTotalReturnYtd','ytdReturnAboveCatOrInd'].includes(action.column)  && 'summary'===action.row){
                if(rasp.assetClass) delta.assetClass=null;
                else delta.assetClass=this.props.portfolio.summary.assetClass; // the number
            }
            // othewise we're clicking on a cell we don't have an action for so just ignore it by setting the state to what it was
        } else
            return null;
        Object.assign(nextRASP,rasp,delta);
        if(nextRASP.details || nextRASP.status || nextRASP.assetClass) nextRASP.shape='open';
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

    static orderedColumns=[
            "assetClass",
            "ticker",
            "percentWeight",
            "percentTotalReturnYtd",
            "ytdReturnAboveCatOrInd",
            "percentChange",
            "1DayReturnAboveCatOrInd",
            "percentTotalReturn1Week",
            "1WeekReturnAboveCatOrInd",
            "percentTotalReturn1Month",
            "1MoReturnAboveCatOrInd",
            "percentTotalReturn3Month",
            "3MoReturnAboveCatOrInd",
            "percentTotalReturn12Month",
            "12MoReturnAboveCatOrInd",
            "totalReturn2016",
            "2016ReturnAboveCatind",
            "statusGreen",
            "statusYellow",
            "statusRed",
            "percentBelow52WeekHigh",
            "dollarCurrentPrice",
            "dollarChange",
            "52WeekLow",
            "fundManagerTenure",
            "morningstarRatingForFunds",
            "bearMarketPercentileRank",
            "analysisDate",
            "dateOfMostRecentPortfolio",
            "news",
            "US Large-Cap Equity",
            "US Mid-Cap Equity",
            "US Small-Cap Equity",
            "Foreign Equity",
            "Foreign Bond",
            "US Bond",
            "Real Estate",
            "stockIndustryFundCategory",
    ];

    static tableShape ={
        summary: {
            percentTotalReturnYtd: true,
            ytdReturnAboveCatOrInd: true,
            percentChange: true,
            "1DayReturnAboveCatOrInd": true,
            statusGreen: true,
            statusYellow: true,
            statusRed: true,
            assetClass: false
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
            "percentBelow52WeekHigh": false,
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
            "percentBelow52WeekHigh": false,
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
        status: {
            "ticker": true,
            "52WeekLow": false,
            "dollarCurrentPrice": false,
            "percentBelow52WeekHigh": false,
            "dollarChange": false,
            "percentChange": false,
            "percentWeight": true,
            "stockIndustryFundCategory": false,
            "1DayReturnAboveCatOrInd": true,
            "percentTotalReturn1Week": false,
            "1WeekReturnAboveCatOrInd": false,
            "percentTotalReturn1Month": false,
            "1MoReturnAboveCatOrInd": false,
            "percentTotalReturn3Month": false,
            "3MoReturnAboveCatOrInd": false,
            "percentTotalReturnYtd": false,
            "ytdReturnAboveCatOrInd": true,
            "percentTotalReturn12Month": true,
            "12MoReturnAboveCatOrInd": false,
            "fundManagerTenure": false,
            "morningstarRatingForFunds": false,
            "bearMarketPercentileRank": false,
            "analysisDate": false,
            "dateOfMostRecentPortfolio": false,
            "news": false,
            "totalReturn2016": false,
            "2016ReturnAboveCatind": false,
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
        },
        details: {
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
            "morningstarRatingForFunds": false,
            "bearMarketPercentileRank": false,
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
        "percentBelow52WeekHigh": '< 52w',
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

    static Statuses=['statusGreen','statusYellow','statusRed'];

    columnSort(column, direction){
        var array=this.props.portfolio.a;
        var comparer=(a,b)=>((typeof array[b][column]==='string')? b.localeCompare(a) : (array[b][column]-array[a][column]));
        var rcomparer=(a,b)=>((typeof array[a][column]==='string')? a.localeCompare(b) : (array[a][column]-array[b][column]));

        if(direction){
            this.props.portfolio.rows.sort(comparer);
            this.props.portfolio.assetClasses.sort(comparer);
        }else{
            this.props.portfolio.rows.sort(rcomparer);
            this.props.portfolio.assetClasses.sort(rcomparer);
        }
    }

    render(){
        const {portfolio, rasp}=this.props;
        let rows=[];

        var columnButtonStyle=(row,column,value)=>{
            if(row==='summary'&&RASPShowPortfolio.Statuses.includes(column)) return RASPShowPortfolio.columnButtonStyle[column];
            if(row==='summary'&&column==='assetClass') return RASPShowPortfolio.columnButtonStyle[column];
            if(portfolio.assetClasses.includes(row)&&column==='assetClass') return RASPShowPortfolio.columnButtonStyle[column];
        }

        var buttonPressedClass=(row,column,value)=>{
            if((row==='summary' && rasp.status===column)
            || (rasp.assetClass && row==='summary' && column==='assetClass')
            || (rasp.assetClass && typeof rasp.assetClass==='string' && row===rasp.assetClass && column==='assetClass')
            )
                 return (' '+'wa-button-active');
            else return '';
        }

        var numberColor=(column, value)=>{
            if(typeof value !=='undefined' && value !== null){
                if(['percent', 'dollar', 'return', 'number'].some(t=>portfolio.formats[column].format===t)
                &&  value<0)
                    return 'red'; 
                else if(column==='statusGreen') return value ? 'green': 'white';
                else if(column==='statusYellow') return value ? 'darkorange':'white';
                else if(column==='statusRed') return value ? 'red':'white';
            }
            return 'inherit';
        }

        var cellValue=(r,c)=>{
            let pRow=(r==='summary')?portfolio.summary:portfolio.a[r];
            if(typeof pRow[c] ==='undefined' || pRow[c] === null) return '';
            if(RASPShowPortfolio.Statuses.includes(c) && pRow[c]===0) return ' ';
            return pRow[c].toLocaleString(navigator.language,portfolio.formats[c] ? portfolio.formats[c].options : {});
        }

        var rowStyle=(row)=>{
            if(!this.state.headerWidths.a) return {}; // render all the rows so that the row height can be calculated
            let isAssetRow=portfolio.assetClasses.includes(row);
            if((row==='summary')
            || ((rasp.status && portfolio.a[row][rasp.status])&& !rasp.assetClass && !isAssetRow) // if no asset class filter, show only the lines with corresponding status and not assetClass lines
            || ((rasp.status && portfolio.a[row][rasp.status])&& typeof rasp.assetClass ==='string' && rasp.assetClass === portfolio.a[row]['assetClass']) // show asset class summary and all holdings if status
            || (!rasp.status && rasp.assetClass && typeof rasp.assetClass ==='string' && rasp.assetClass === portfolio.a[row]['assetClass'])  // no Status show asset class summary and all it's holdings
            || (!rasp.status && rasp.assetClass && rasp.assetClass && typeof rasp.assetClass !=='string' && isAssetRow) // all asset classes
            || (rasp.status && portfolio.a[row][rasp.status] && rasp.assetClass && typeof rasp.assetClass !=='string' && isAssetRow ) // all assetClasses but filtered for matchinig status
            ){
                var obj={lineHeight: '150%'};
                if(portfolio.assetClasses.includes(row)) obj.backgroundColor='lightgray';
                if(row==='summary') obj.backgroundColor='#c5cae9';
                return obj;
            }
            return {lineHeight: '0%'};
        }

        var showColumn=(column)=>{
            if(rasp.status && column!==rasp.status && RASPShowPortfolio.Statuses.includes(column)) return false; // don't show other status columns if one is being filtered on
            return (
                (rasp.details && RASPShowPortfolio.tableShape['details'][column] )
            ||  (RASPShowPortfolio.tableShape['summary'][column]) // the summary list is the minimum
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
                                <div className={ClassNames('wa-table-header-cell',{'wa-table-sort-up': (rasp.columnSort===c && rasp.sortDirection) ? true : false, 'wa-table-sort-down': (rasp.columnSort===c && !rasp.sortDirection) ? true : false})} onClick={()=>rasp.toParent({type: "SORT", column: c})}>
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
                <td key={c} style={Object.assign({},{maxWidth: '0px'}, {color: numberColor(c, portfolio.summary[c])},columnButtonStyle('summary',c,portfolio.summary[c] || '')) }
                    onClick={()=>rasp.toParent({type: "TOGGLE", row: 'summary', column: c, value: portfolio.summary[c]|| ''})}
                >
                    <div className={'wa-table-row-cell'+buttonPressedClass('summary',c,portfolio.summary[c] || '')}>
                        {cellValue('summary',c)}
                    </div>
                </td>
            )}</tr>
        );
        rows=rows.concat(portfolio.assetClasses.map(r=>
            <tr key={r} style={rowStyle(r)} >{
                portfolio.columns.map(c=>
                    <td key={c} style={Object.assign({},{maxWidth: '0px'},{color: numberColor(c, portfolio.a[r][c])}, columnStyle(c))}>
                        <div className={'wa-table-row-cell'+buttonPressedClass(r,c,portfolio.a[r][c] || '')} onClick={()=>rasp.toParent({type: "TOGGLE", row: r, column: c, value: portfolio.a[r][c]|| ''})} style={columnButtonStyle(r,c,portfolio.a[r][c] || '')}>
                            {cellValue(r,c)}
                        </div>
                    </td>
                )
            }
            </tr>
        ));
        rows=rows.concat(portfolio.rows.map(r=>
            <tr key={portfolio.a[r]['ticker']} style={rowStyle(r)} >{
                portfolio.columns.map(c=>
                    <td key={c} style={Object.assign({},{maxWidth: '0px'},{color: numberColor(c, portfolio.a[r][c])}, columnStyle(c))}>
                        <div className={'wa-table-row-cell'+buttonPressedClass(r,c,portfolio.a[r][c] || '')} onClick={()=>rasp.toParent({type: "TOGGLE", row: r, column: c, value: portfolio.a[r][c]|| ''})} style={columnButtonStyle(r,c,portfolio.a[r][c] || '')}>
                            {cellValue(r,c)}
                        </div>
                    </td>
                )
            }</tr>
        ));

        return(
            <section>
                <div style={{display: 'inline-block'}}>
                    <table className='wa-table'>
                        {header}
                        <tbody ref='tbody'>
                            {rows}
                        </tbody>
                    </table>
                    <div className='wa-table-date'>
                        {'as of '+new Date(portfolio.lastModifiedDate)}
                    </div>
                </div>
                <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                    <div style={{display: rasp.shape==='open'?'block':'none'}} className={ClassNames('wa-table-button',{'wa-button-active': rasp.details})} onClick={()=>rasp.toParent({type: "TOGGLE_DETAILS"})}>Details</div>
                    <div style={{display: rasp.shape==='open'?'block':'none', backgroundColor: '#5b9bd5'}} className='wa-table-button' onClick={()=>rasp.toParent({type: "RESET"})}>Reset</div>
                </div>
            </section>
        )
    }
}

export default ShowPortfolio;
