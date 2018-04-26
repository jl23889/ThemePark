import * as React from 'react';
import { Ticket, TicketType } from '../models/_DataModels'
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import * as moment from 'moment';

import { Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'

interface ListItemProps {
    ticket: Ticket;
    ticketList: Ticket[];
    ticketTypeList: TicketType[];
    transactionTotal: number;
    updateTransaction: Function;
} 

export default class TicketTransactionListItem extends React.Component<ListItemProps, {}> {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        return <div>
            {this.renderView()}
        </div>
    }

    // remove ticket from ticketList
    removeTicket = (event) => {
        //find ticket from ticketList
        const index = this.props.ticketList.map(elem => elem.ticketId).indexOf(this.props.ticket.ticketId)

        // remove element at index
        const spliced = this.props.ticketList.splice(index, 1)

        // calculate new transaction total
        const total = this.props.transactionTotal-spliced[0].ticketPrice

        // update props
        this.props.updateTransaction({
            ticketList: this.props.ticketList,
            transactionTotal: total
        })
    }

    private renderView() {
        return <ListGroupItem
            key={'listGroupItem'+this.props.ticket.ticketId+Math.random()}
            tag='div'
            color='warning'>
            <ListGroupItemHeading>
                <h3>{this.props.ticketTypeList[this.props.ticket.ticketType-1].ticketType} ticket</h3>
            </ListGroupItemHeading>
            <div className="row">
                <div className="col-3">
                    <h2>${this.props.ticketTypeList[this.props.ticket.ticketType-1].ticketPrice}</h2>
                    <br/>
                    {this.props.ticket.fastPass ? 'FastPass Enabled: +$10' : ''}
                </div>
                <div className="col-4">
                    Valid: {moment(this.props.ticket.effectiveDate).format('MM-DD-YYYY')}
                    <br/>
                    Expires: {moment(this.props.ticket.expirationDate).format('MM-DD-YYYY')}
                </div>
                <div className="col-5">
                    <Button key={'listItemRemoveTicketButton'+this.props.ticket.ticketId}
                        className="pull-right"
                        onClick={this.removeTicket}
                    >Remove Ticket</Button>
                </div>
             </div>            
        </ListGroupItem>
    }
}


