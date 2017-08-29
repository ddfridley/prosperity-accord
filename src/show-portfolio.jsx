'use strict';

import React from 'react';
import ClassNames          from 'classnames';
import S from 'string';

export class ShowPortfolio extends React.Component {
    state={shape: 'all', headerWidths: []};

    constructor(props){
        super(props);
        ShowPortfolio.tableShape.all={};
        this.props.portfolio.columns.forEach(c=>ShowPortfolio.tableShape.all[c]=true);
        this.props.portfolio.columns=this.props.portfolio.columns.filter(c=>c!=='assetClass');
        this.props.portfolio.columns.unshift('assetClass');
    };

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
        statusGreen: {
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
            "statusGreen": true,
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
        statusYellow: {
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
            "statusYellow": true,
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
        statusRed: {
            percentTotalReturnYtd: true,
            ytdReturnAboveCatOrInd: true,
            statusGreen: true,
            statusYellow: true,
            statusRed: true
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
        "1DayReturnAboveCatOrInd": '1d > Avg',
        "percentTotalReturn1Week": '1w',
        "1WeekReturnAboveCatOrInd": '1w > Avg',
        "percentTotalReturn1Month": '1m',
        "1MoReturnAboveCatOrInd": '1m > Avg',
        "percentTotalReturn3Month": '3m',
        "3MoReturnAboveCatOrInd": '3m > Avg',
        "percentTotalReturnYtd": 'YTD',
        "ytdReturnAboveCatOrInd": 'YTD > Avg',
        "percentTotalReturn12Month": '12M',
        "12MoReturnAboveCatOrInd": '12M > Avg',
        "fundManagerTenure": 'Tenure',
        "morningstarRatingForFunds": 'Morningstar',
        "bearMarketPercentileRank": 'Bear %',
        "analysisDate": 'Analysis Date',
        "dateOfMostRecentPortfolio": 'Portfolio Date',
        "news": 'news',
        "totalReturn2016": '2016',
        "2016ReturnAboveCatind": '2016 > Avg',
        "statusGreen": 'Green',
        "statusYellow": 'Yellow',
        "statusRed": 'Red',
        "assetClass": 'Asset Class',
        "US Large-Cap Equity": "US Large-Cap Equity",
        "US Mid-Cap Equity": "US Mid-Cap Equity",
        "US Small-Cap Equity": "US Small-Cap Equity",
        "Foreign Equity": "Foreign Equity",
        "Foreign Bond": "Foreign Bond",
        "US Bond": "US Bond",
        "Real Estate": "Real Estate",
    }

    toggleState(val,state){
        this.setState(Object.assign({},{shape},val))
    }

    buttons ={
        summary: {
            statusYellow: ()=>this.setState({shape: 'statusYellow'}),
            statusGreen: ()=>this.setState({shape:'statusGreen'}),
            statusRed: ()=>this.setState({shape: 'statusRed'}),
            assetClass: ()=>this.setState({shape: 'assetClass'})
        },
        assetClass: {
            statusYellow: ()=>this.setState({shape: 'statusYellow'}),
            statusGreen: ()=>this.setState({shape: 'statusGreen'}),
            statusRed: ()=>this.setState({shape:'statusRed'}),
            assetClass: (asset)=>this.setState({shape: 'showAsset', asset}),
        },
        showAsset: {
            statusYellow: ()=>this.setState({shape: 'statusYellow'}),
            statusGreen: ()=>this.setState({shape: 'statusGreen'}),
            statusRed: ()=>this.setState({shape:'statusRed'}),
            assetClass: (asset)=>this.setState({shape: 'assetClass', asset: null}),
        },
        statusYellow: {
            statusYellow: ()=>this.setState({shape: 'summary'}),
            statusGreen: ()=>this.setState({shape:'statusGreen'}),
            statusRed: ()=>this.setState({shape: 'statusRed'}),
            assetClass: (asset)=>this.setState({shape: 'assetClass'})
        },
        statusGreen: {
            statusYellow: ()=>this.setState({shape: 'statusYellow'}),
            statusGreen: ()=>this.setState({shape:'summary'}),
            statusRed: ()=>this.setState({shape: 'statusRed'}),
            assetClass: (asset)=>this.setState({shape: 'assetClass'})
        },
        statusRed: {
            statusYellow: ()=>this.setState({shape: 'statusYellow'}),
            statusGreen: ()=>this.setState({shape:'statusGreen'}),
            statusRed: ()=>this.setState({shape: 'statusRed'}),
            assetClass: (asset)=>this.setState({shape: 'assetClass'})
        }
    }

    static shapeColumnButtonStyle={
        summary: {
            statusGreen: {color: 'white', backgroundColor: 'green'},
            statusYellow: {color: 'white', backgroundColor: 'orange'},
            statusRed: {color: 'white', backgroundColor: 'red'},
            assetClass: {color: 'white', backgroundColor: 'darkslategray'},
        },
        assetClass: {
            statusGreen: {color: 'white', backgroundColor: 'green'},
            statusYellow: {color: 'white', backgroundColor: 'orange'},
            statusRed: {color: 'white', backgroundColor: 'red'},
            assetClass: {color: 'white', backgroundColor: 'darkslategray'},
        },
        showAsset: {
            statusGreen: {color: 'white', backgroundColor: 'green'},
            statusYellow: {color: 'white', backgroundColor: 'orange'},
            statusRed: {color: 'white', backgroundColor: 'red'},
            assetClass: {color: 'white', backgroundColor: 'darkslategray'},
        },
        statusGreen: {
            statusGreen: {color: 'white', backgroundColor: 'green'},
            statusYellow: {color: 'white', backgroundColor: 'orange'},
            statusRed: {color: 'white', backgroundColor: 'red'},
            assetClass: {color: 'white', backgroundColor: 'darkslategray'},
        },
        statusYellow: {
            statusGreen: {color: 'white', backgroundColor: 'green'},
            statusYellow: {color: 'white', backgroundColor: 'orange'},
            statusRed: {color: 'white', backgroundColor: 'red'},
            assetClass: {color: 'white', backgroundColor: 'darkslategray'},
        },
        statusRed: {
            statusGreen: {color: 'white', backgroundColor: 'green'},
            statusYellow: {color: 'white', backgroundColor: 'orange'},
            statusRed: {color: 'white', backgroundColor: 'red'},
            assetClass: {color: 'white', backgroundColor: 'darkslategray'},
        }
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
            //let height=cells.getBoundingClientRect().height;
            //rowHeights.a.push(height);
            //rowHeights[this.props.portfolio.rows[row]]=height;
            //cells.style.maxHeight=height+'px';
            for(col=0; col<cells.children.length; col++){
                cells.children[col].style.maxWidth='0px';
                //cells.children[col].style.height='0px';
            }
        }
        this.setState({headerWidths, shape: 'summary'});
    }

    render(){
        const {portfolio}=this.props;
        const {shape, asset}=this.state;
        let rows=[];
        var shapeColumnButtonStyle=new Proxy(ShowPortfolio.shapeColumnButtonStyle,ShowPortfolio.proxyGetEmptyObject);
        var shapeColumnButtonOnClick=new Proxy(this.buttons,ShowPortfolio.proxyGetEmptyObject);
        let v;

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
            if(shape==='summary' && row==='summary') return {lineHeight: '100%'}; 
            if(row==='summary') return {lineHeight: '100%'};
            if(['statusYellow', 'statusGreen', 'statusRed'].includes(shape))
                return {lineHeight: this.props.portfolio.a[row][shape] ? '100%' : '0%'};
            if(shape==='showAsset' && asset===portfolio.a[row]['assetClass']) return {lineHeight: '100%'}
            return {lineHeight: '0%'};
        }

        var columnStyle=(column)=>{
            if(!this.state.headerWidths.a) return {display: 'table-cell'}; // render all the rows so that the row width can be calculated
            if(ShowPortfolio.tableShape[shape] && ShowPortfolio.tableShape[shape][column]) return {maxWidth: null};
            else return {maxWidth: '0px'}
        }

        var headerStyle=(column)=>{
            if(!this.state.headerWidths.a) return {display: 'table-cell'}; // render all the rows so that the row width can be calculated
            if(ShowPortfolio.tableShape[shape] && ShowPortfolio.tableShape[shape][column]) return {maxWidth: this.state.headerWidths[column]+'px'};
            return {maxWidth: '0px'}
        }
        
        let header= (
            <thead>
                <tr ref='header' key='header' className='portfolio-head-row'>
                    {   portfolio.columns.map(c=>
                            <th className='portfolio-column-head' style={headerStyle(c)}
                                title={S(c).humanize().s}
                            >
                                <div className='wa-table-header-cell'>
                                    {ShowPortfolio.shortHead[c] ? ShowPortfolio.shortHead[c] : c}
                                </div>
                            </th>
                        )
                    }
                </tr>
            </thead>
        );
        rows.push(
            <tr key='summary' style={rowStyle('summary')} >{portfolio.columns.map(c=>
                <td style={Object.assign({},{color: numberColor(c, portfolio.summary[c])},shapeColumnButtonStyle[shape][c]) }
                    onClick={(v=shapeColumnButtonOnClick[shape][c],v?v.bind(this,portfolio.summary[c] || ''):null)}
                >
                    <div className='wa-table-row-cell'>
                        {(typeof portfolio.summary[c] !=='undefined' && portfolio.summary[c] !== null) ? portfolio.summary[c].toLocaleString(navigator.language,portfolio.formats[c] ? portfolio.formats[c].options : {}) : ''}
                    </div>
                </td>
            )}</tr>
        );
        rows=rows.concat(portfolio.rows.map(r=>
            <tr key={portfolio.a[r]['ticker']} style={rowStyle(r)} >{
                portfolio.columns.map(c=>
                    <td style={Object.assign({},{color: numberColor(c, portfolio.a[r][c])}, columnStyle(c))}>
                        <div className='wa-table-row-cell' onClick={(v=shapeColumnButtonOnClick[shape][c],v?v.bind(this,portfolio.a[r][c] || ''):null)} style={shapeColumnButtonStyle[shape][c]}>
                            {(typeof portfolio.a[r][c] !=='undefined' && portfolio.a[r][c] !== null) ? portfolio.a[r][c].toLocaleString(navigator.language,portfolio.formats[c] ? portfolio.formats[c].options : {}) : ''}
                        </div>
                    </td>
                )
            }</tr>
        ));
        rows=rows.concat(portfolio.assetClasses.map(r=>
            <tr key={r} style={{lineHeight: ['all','assetClass'].includes(shape) || (shape==='showAsset' && asset===portfolio.a[r]['assetClass'])  ? '100%' : '0'}} >{
                portfolio.columns.map(c=>
                    <td style={Object.assign({},{color: numberColor(c, portfolio.a[r][c])}, columnStyle(c))}>
                        <div className='wa-table-row-cell' onClick={(v=shapeColumnButtonOnClick[shape][c],v?v.bind(this,portfolio.a[r][c] || ''):null)} style={shapeColumnButtonStyle[shape][c]}>
                            {(typeof portfolio.a[r][c] !=='undefined' && portfolio.a[r][c] !== null) ? portfolio.a[r][c].toLocaleString(navigator.language,portfolio.formats[c] ? portfolio.formats[c].options : {}) : ''}
                        </div>
                    </td>
                )
            }
            </tr>
        ))
        
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
