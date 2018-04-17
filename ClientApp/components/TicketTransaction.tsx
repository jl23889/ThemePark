import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as TransactionState from '../store/Transaction';
import * as TransactionActions from '../actions/_TransactionActions'
import TicketTransactionForm from './forms/TicketTransactionForm';
import TicketTransactionListItem from './TicketTransactionListItem';
import TransactionListItem from './TransactionListItem';

import { Button, ListGroupItem, ListGroup } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

import * as moment from 'moment'
import DatePicker from 'react-datepicker'


// At runtime, Redux will merge together...
type DataProps =
    TransactionState.TransactionState        // ... state we've requested from the Redux store
    & typeof TransactionActions.actionCreators       // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class TicketTransaction extends React.Component<DataProps, {}> {    
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestTicketTypes(); // get list of ticket types

        // get user details from stored user
        const storedUser = JSON.parse(localStorage.getItem('user'));
        this.props.requestCustomerTicketTransactions(storedUser.customerId); // get list of customer ticket transactions
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        // update unique toast 
        displayToast(this.props.alert);
    }

    render() {
        return <div>
            { this.renderTicketPurchaseForm()}
            <h1>View My Tickets</h1>
            { this.renderCustomerTicketTransactions()}
        </div>
    }

    addTicket = values => {
        // calculate ticket price
        const amount = values.fastPass // adding on $10 for fastPass option
            ? this.props.ticketTypeList.map(elem => elem.ticketPrice)[values.ticketType-1] + 10
            : this.props.ticketTypeList.map(elem => elem.ticketPrice)[values.ticketType-1]
        // calculate ticket expiration date
        //     hardcoding in the type to ticket length conversion for now
        switch (values.ticketType) {
            case '1': 
                var expirationDate = moment(this.props.effectiveDate).add(1, 'days').toDate().toDateString()
                break;
            case '2': 
                var expirationDate = moment(this.props.effectiveDate).add(3, 'days').toDate().toDateString()
                break;
            case '3': 
                var expirationDate = moment(this.props.effectiveDate).add(7, 'days').toDate().toDateString()
                break;
            case '4': 
                var expirationDate = moment(this.props.effectiveDate).add(100, 'years').toDate().toDateString()
                break;
            default: 
                var expirationDate = moment(this.props.effectiveDate).add(1, 'days').toDate().toDateString()
        } 

        var total = 0; // total of tickets
        var ticketList = [] // list of ticket items

        for (var i = 0; i < values.ticketAmount; i++) {
            // create a new ticket from values
            const ticket = {
                ticketId: 'temp'+Math.random(), // temporary Id
                ticketType: values.ticketType,
                ticketPrice: amount,
                effectiveDate: moment(this.props.effectiveDate).toDate().toDateString(),
                expirationDate: expirationDate,
                fastPass: values.fastPass
            }
            ticketList.push(ticket)
            total+=amount;
        }
        
        this.props.updateTransaction({
            ticketList: this.props.ticketList.concat(ticketList),
            transactionTotal: this.props.transactionTotal + total
        });
    }

    // reset the transaction to initial state
    removeAllTickets = () => {
        this.props.updateTransaction({
            ticketList: [], 
            transactionTotal: 0
        });
    }

    // sets date 
    setDate = (date) => {
        this.props.setDate({
            effectiveDate: date
        })
    }

    // begin transaction
    startTransaction = () => {
        // generate unique toast
        const toastId = 
            toast('Purchasing Ticket(s)...', {
                type: 'info',
                autoClose: 30000,
            });

        if (this.props.ticketList.length>0) {
            // get user details from stored user
            const storedUser = JSON.parse(localStorage.getItem('user'));
            // ensure user is a valid user by querying for userId
            TransactionActions.requestCustomer(storedUser.customerId)
            .then(response => {
                if (response.data !== 'undefined') {
                    this.props.createTicketTransaction(this.props.ticketList, storedUser.customerId, toastId);
                }
            })
            .catch(error => {
                toast('You must be a registered customer to buy tickets. Please register and try again.', {
                    type: 'error',
                });
            })
        } else {
            displayToast({
                'toastId': toastId,
                'alertType': 'error',
                'alertMessage': 'You must select at least one ticket to complete transaction! Please try again'
            })
        }
    }
    
    private renderTicketPurchaseForm() {
        var transactionTotal = 0;
        return <div>
            <h1>Select Date</h1>
            <DatePicker
                inline
                selected={moment(this.props.effectiveDate)}
                onChange={this.setDate}
                minDate={moment()}
                maxDate={moment().add(90, "days")}
            />
            <TicketTransactionForm 
                onSubmit={this.addTicket} 
                form="purchaseTicketForm"
                initialValues={{
                    ticketAmount: 1,
                    fastPass: false,
                    ticketType: 1,
                }}
                props={{
                    ticketTypeList: this.props.ticketTypeList,
                }}/>
            <ListGroup>
                {this.props.ticketList.map(ticket =>
                    <TicketTransactionListItem
                        key={'listItem'+ticket.ticketId+Math.random()}
                        ticket={ticket}
                        ticketList={this.props.ticketList}
                        transactionTotal={this.props.transactionTotal}
                        updateTransaction={this.props.updateTransaction}
                        ticketTypeList={this.props.ticketTypeList}
                        >                                      
                    </TicketTransactionListItem>
                )}
            </ListGroup>
            <div className="row">
                <div className="col-md-9">
                    <h3 className="pull-right">Total Amount: ${this.props.transactionTotal}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="pull-right">
                        <Button color='success'
                            onClick={this.startTransaction}
                            >Complete Transaction</Button>
                        <Button
                            onClick={this.removeAllTickets}>Reset</Button>
                    </div>
                </div>
            </div>
        </div>
    }

    private renderCustomerTicketTransactions() {

        console.log(this.props.ticketTransactionList);
        return <ListGroup>
            {this.props.ticketTransactionList.map(transaction =>
                <TransactionListItem
                    key={'listItem'+transaction.transactionId}
                    transaction={transaction}
                    >                                      
                </TransactionListItem>
            )}
        </ListGroup>
    }
}

export default connect(
    (state: ApplicationState) => state.transaction, // Selects which state properties are merged into the component's props
    TransactionActions.actionCreators                 // Selects which action creators are merged into the component's props
)(TicketTransaction) as typeof TicketTransaction;
