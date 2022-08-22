import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ResidualCalc, Result,  Form, Fieldset, Label, Input, Button, Checkbox } from './CalculatorElements';
import { getValue } from '@testing-library/user-event/dist/utils';

const ResV_Calc = () => {
    
    const [ fbtBase, setFbtBase ] = useState( '' );                                             // Divide deals with setting this state
    const [ clear, setClear ] = useState( false );                                              // Clear deals with setting this state
    const [ termYears, setTermYears ] = useState( 0 );                                          // DateDif deals with setting this state
    const [ termMonths, setTermMonths ] = useState( 0 );                                        // DateDif deals with setting this state
    const [ totalFbtYears, setTotalFbtYears ] = useState( 0 );                                  // fbtYearCalc deals with setting this state
    const [ totalTermYears, setTotalTermYears ] = useState( 0 );                                // residualCalc deals with setting this state
    const [ totalTermMonths, setTotalTermMonths ] = useState( 0 );                              // residualCalc deals with setting this state
    const [ newResidual, setNewResidual ] = useState( 0 );                                      // resValue deals with setting this state
    const [ residualRate, setResidualRate ] = useState( 0 );                                    // resValue deals with setting this state
    const [ checked, setChecked ] = useState( true );


    // Hook for setting FBT base value
    useEffect( () => {
        const currentFbtBase = parseInt(document.querySelector( '#OriginalFBTBase' ).value)
        if ( totalFbtYears >= 4 ) {
            let  newFBT = currentFbtBase / 3 * 2;
            setFbtBase( newFBT.toFixed( 2 ) );
        } else if ( totalFbtYears < 4 ) {
            setFbtBase( currentFbtBase );
        } else if (totalFbtYears === 0 ) {
            setFbtBase( currentFbtBase )
        } else {
            alert( 'Error in FBT Base Value Calculation')
        }
    }, [totalFbtYears]);

    // Hook for orginal term length
    const orginalTerm = () => {
        try {
            const start = new Date( document.querySelector( '#OriginalStart' ).value );
            const end = new Date( document.querySelector( '#OriginalEnd' ).value );

            const dates = Math.abs( end - start ) / (1000 * 60 * 60 * 24 );                     // Difference between dates is converted to time format to days
            const months = ( dates / 30.437 );                                                  // 30.437 is the average days in a calendar month. Meaning Dates / 30.437 gives the number of months.
            const termYear = Math.floor( months / 12 );                                         // Math.floor rounds down to closest number of years to be on the safe side.
            const termMonth = Math.floor( months - ( termYear * 12 ));                          // The number of years is multiplied by the months and subtracted from months varible. Math.floor to round down to closest number of months.
            setTermYears( termYear );
            setTermMonths( termMonth );
        } catch ( err ) {
            console.log( `The following error occured DateDif: ${ err }` );
            alert( `Error: ${ err }` );  
        }
    };

    // Hook for the total term length
    useEffect (() => {
        try {
            const refTerm = document.querySelector( '#refinanceTerm' ).value;
            let refYears = Math.floor( refTerm / 12 );
            if ( refYears < 1 ) {
                refYears = 0
                let refMonths = refTerm - ( refYears * 12  );
                let totalYears = Math.abs( refYears + termYears );
                let totalMonths = Math.abs( refMonths + termMonths );
                if ( totalMonths >= 12 ) {
                    totalYears = Math.abs( totalYears + 1 );
                    totalMonths = Math.abs( totalMonths - 12 );
                    setTotalTermYears( totalYears );
                    setTotalTermMonths( totalMonths );
                } else {
                    setTotalTermYears( totalYears );
                    setTotalTermMonths( totalMonths );
                };
            } else if (refYears >= 1 ) {
                let refMonths = refTerm - ( refYears * 12  );
                let totalYears = Math.abs( refYears + termYears );
                let totalMonths = Math.abs( refMonths + termMonths );
                if ( totalMonths >= 12 ) {
                    totalYears = Math.abs( totalYears + 1 );
                    totalMonths = Math.abs( totalMonths - 12 );
                    setTotalTermYears( totalYears );
                    setTotalTermMonths( totalMonths );
                } else {
                    setTotalTermYears( totalYears );
                    setTotalTermMonths( totalMonths );
                };
            } else {
                alert( 'There appears to be an error occuring in refYears calculation')
            }
        } catch ( err ) {
            console.log( `The following error occured residualCalc: ${ err }` )
            alert( `Error: ${ err }` );
        }
    }, [ termYears, termMonths ] );

    // Hook for setting new residual and new residual percentage
    useEffect(() => {
        let resRate = 0;
        const purchasePrice = document.querySelector( '#OriginalFinance' ).value;
        const Year1 = 0.6563;
        const Year2 = 0.5625;
        const Year3 = 0.4688;
        const Year4 = 0.3750;
        const Year5 = 0.2813;
        const Year6 = 0.1875;
        const Year7 = 0.0938;

        if ( !totalTermYears < 1) {
            try {
                if ( totalTermYears < 1 ) {

                    alert( `Total Term Years are  ${ totalTermYears }. This cannot be under 1 year. Please check figures.` )

                } else if ( totalTermYears === 1 ) {
                    
                    resRate = ( purchasePrice * Year1 );
                    setNewResidual( resRate.toFixed( 2 ) );
                    setResidualRate( Year1 );

                } else if ( totalTermYears === 2 ) {
                    
                    resRate = ( purchasePrice * Year2 );
                    setNewResidual( resRate.toFixed( 2 ) );
                    setResidualRate( Year2 );

                } else if ( totalTermYears === 3 ) {
                    
                    resRate = ( purchasePrice * Year3 );
                    setNewResidual( resRate.toFixed( 2 ) );
                    setResidualRate( Year3 );

                } else if ( totalTermYears === 4 ) {

                    resRate = ( purchasePrice * Year4 );
                    setNewResidual( resRate.toFixed( 2 ) );
                    setResidualRate(Year4 );

                } else if ( totalTermYears === 5 ) {

                    resRate = ( purchasePrice * Year5 );
                    setNewResidual( resRate.toFixed( 2 ) );
                    setResidualRate( Year5 );

                } else if ( totalTermYears === 6 ) {

                    resRate = ( purchasePrice * Year6 );
                    setNewResidual( resRate.toFixed( 2 ) );
                    setResidualRate( Year6 );

                } else if ( totalTermYears === 7 ) {

                    resRate = ( purchasePrice * Year7 );
                    setNewResidual( resRate.toFixed( 2 ) );
                    setResidualRate( Year7 );

                } else if ( totalTermYears > 7 ) {

                    alert( `Total Term Years are  ${ totalTermYears }. This cannot be over 7 years. Please check figures.` );

                } else {

                    alert( `Apologies, something went wrong. Please check figures.` )

                }
            } catch ( err ) {

                console.log( `The following error occured ResV Calc: ${ err }` )
                alert( `Error: ${ err }` );
            }};
    }, [ totalTermYears ]);

    const fbtYearCalc = () => {
        
        try {
            const startDate = new Date( document.querySelector( '#OriginalStart' ).value ); // Cannot format the date using format dd/MM/yyyy until after fbtStartYear/fbtEndYear are constructed below, or it creates an invalid date.
            const endDate = new Date( document.querySelector( '#OriginalEnd' ).value );
            let startYear = new Date( startDate ).getFullYear();                            // Extracts the year 
            let fbtStartYear = '04/01/' + startYear + '';                                   // Concats date and start of the fbt year
            let fbtStartDate = new Date( fbtStartYear );                                    // Reformats Concat'd Dates to date format
        
            if ( fbtStartDate.getTime() < startDate.getTime() ) {                           // This IF applies logic testing whether the start date is less than the fbtStartDate. If true it adds a year to the fbtStartDate by resetting the variables. The getTime is for comparing which date is greater.
                startYear = startYear + 1;
                fbtStartYear = '04/01/' + startYear + '';
                fbtStartDate = new Date( fbtStartYear );
                let fbtDays  = Math.abs( endDate - fbtStartDate ) / ( 1000 * 60 * 60 * 24 );
                let fbtYears = Math.floor( fbtDays / 30.437 / 12 );
                setTotalFbtYears( fbtYears ); 
            } else {
                let fbtDays  = Math.abs( endDate - fbtStartDate ) / ( 1000 * 60 * 60 * 24 );
                let fbtYears = Math.floor( fbtDays / 30.437 / 12 );
                setTotalFbtYears( fbtYears );
            };
        } catch ( err ) {
            console.log( `The following error occured in fbtYearCalc: ${ err }` )
            alert( `Error: ${ err }` );
        }
    };

    const handleClick = async ( e ) => {
        e.preventDefault();
        fbtYearCalc();
        orginalTerm();

    };


    const handleClickClear = async ( e ) => {

    };


    return (

        <ResidualCalc>

            <Form>
                <h1>Residual Finance Calculator</h1>
                <Fieldset>
                    <Label>
                        Original Amount Financed: 
                        <br />
                        <Input type="currency" id='OriginalFinance' placeholder='Amount'/>
                        <Checkbox type='checkbox' id='FBTsame'  /> {/* Come back and add an explaination label to the checkbox */}
                    </Label>
                    <br />
                    <Label>
                        Original FBT Basevalue: 
                        <br />
                        <Input type="currency" id='OriginalFBTBase' placeholder='Base Value'/>
                    </Label>
                    <br />
                    <Label>
                        Orginal Lease Start Date: 
                        <br />
                        <Input type="date" id='OriginalStart' placeholder='Start Date'/>
                    </Label>
                    <br />
                    <Label>
                        Orginal Lease End Date: 
                        <br />
                        <Input type="date" id='OriginalEnd' placeholder='End Date'/>
                    </Label>
                    <br />
                    <Label>
                        New Finance Term: 
                        <br />
                        <Input type="number" id='refinanceTerm' placeholder='Enter No. Months'/>
                    </Label>
                    <Button onClick={ handleClick }>Calculate</Button>
                    <Button onClick={ handleClickClear }>Clear</Button>
                </Fieldset>
            </Form>
            <Result>
                Original Term: { termYears } Years { termMonths } Months
                <br />
                <br />
                Total Completed FBT Years: { totalFbtYears }
                <br />
                <br />
                Full Term Length: { totalTermYears } Years { totalTermMonths } Months
                <br />
                <br />
                New Residual Percentage: { residualRate * 100 }%
                <br />
                <br />
                New Residual Value: ${ newResidual } <Button onClick={ () => navigator.clipboard.writeText( newResidual )} >Copy</Button>
                <br />
                <br />
                New FBT Base Value: ${ fbtBase } <Button onClick={ () => navigator.clipboard.writeText( fbtBase )} >Copy</Button>
                
            </Result>
            
        </ResidualCalc>
    )
}


export default ResV_Calc;