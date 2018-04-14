import * as React from 'react';
import { Ticket, TicketType } from '../models/_DataModels'
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import * as moment from 'moment';

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
                {this.props.ticketTypeList[this.props.ticket.ticketType-1].ticketType} ticket
            </ListGroupItemHeading>
            <div className="row">
                <div className="col-md-3">
                    ${this.props.ticketTypeList[this.props.ticket.ticketType-1].ticketPrice}
                    <br/>
                    {this.props.ticket.fastPass ? 'FastPass Enabled: +$10' : ''}
                </div>
                <div className="col-md-3">
                    Effective Date: {this.props.ticket.effectiveDate}
                    <br/>
                    Expiration Date: {this.props.ticket.expirationDate}
                </div>
                <div className="col-md-3">
                    Ticket Price: ${this.props.ticket.ticketPrice}
                </div>
                <div className="col-md-3">
                    <Button key={'listItemResetEmployeesButton'+this.props.ticket.ticketId}
                        onClick={this.removeTicket}
                    >Remove Ticket</Button>
                </div>
             </div>            
        </ListGroupItem>
    }
}


