import * as React from 'react';
import { Transaction, Ticket } from '../models/_DataModels'
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import * as moment from 'moment';

interface ListItemProps {
    transaction: Transaction;
} 

interface ListItemState {
    ticket: Ticket;
}

export default class TransactionListItem extends React.Component<ListItemProps, ListItemState> {
    constructor(props){
        super(props);

        this.state = {
            ticket: this.props.transaction.ticket,
        }
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

    private renderView() {
        return <ListGroupItem
            key={'listGroupItem'+this.state.ticket.ticketId}
            tag='div'
            color='warning'>
            <ListGroupItemHeading>
                TicketId: {this.state.ticket.ticketId}
            </ListGroupItemHeading>
            <div className="row" key={'ticketItem'+ this.state.ticket.ticketId}>
                <div className="col-md-3">
                    ${this.props.transaction.ticket.ticketPrice}
                    <br/>
                    {this.props.transaction.ticket.fastPass ? "FastPass Enabled" : ""}
                </div>
                <div className="col-md-3">
                    Effective Date: {this.props.transaction.ticket.effectiveDate}
                </div>
                <div className="col-md-3">
                    Expiration Date: {this.props.transaction.ticket.expirationDate}
                </div>
            </div>     
        </ListGroupItem>
    }
}


