import * as React from 'react';
import { Transaction, Ticket } from '../models/_DataModels'
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import * as moment from 'moment';

import { Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'

interface ListItemProps {
    transaction: Transaction;
} 

interface ListItemState {
    ticket: Ticket;
    color: string;
}

export default class TransactionListItem extends React.Component<ListItemProps, ListItemState> {
    constructor(props){
        super(props);

        this.state = {
            ticket: this.props.transaction.ticket,
            color: '',
        }
    }

    componentDidMount() {
        const today = new Date();
        if (moment(this.props.transaction.ticket.expirationDate)>moment(today)) {
            if (moment(this.props.transaction.ticket.effectiveDate)<moment(today)) {
                this.setState({color: 'success'});
            } else {
                this.setState({color: 'primary'});
            }
        }
    }

    componentDidUpdate() {
    }

    render() {
        return <div>
            {this.renderView()}
        </div>
    }

    private renderView() {
        return <Card>
                <CardBody>
                    <ListGroupItem
                        key={'listGroupItem'+this.state.ticket.ticketId}
                        tag='div'
                        color={this.state.color}>
                        <ListGroupItemHeading>
                            Ticket ID: {this.state.ticket.ticketId}
                        </ListGroupItemHeading>
                        <hr/>
                        <div className="row" key={'ticketItem'+ this.state.ticket.ticketId}>
                            <div className="col-3">
                            </div>
                            <div className="col-3">
                                <h4>Effective: {moment(this.state.ticket.effectiveDate).format('MM-DD-YYYY')}</h4>
                                
                            </div>
                            <div className="col-3">
                                <h4>Expires: {moment(this.state.ticket.expirationDate).format('MM-DD-YYYY')}</h4>
                            </div>
                            <div className="col-3">
                                <h2 className="pull-right">${this.state.ticket.ticketPrice}</h2>
                            </div>
                        </div>     
                    </ListGroupItem>
                </CardBody>
            </Card>
    }
}


