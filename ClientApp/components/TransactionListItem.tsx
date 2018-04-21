import * as React from 'react';
import { Transaction, TicketTransaction } from '../models/_DataModels'
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import * as moment from 'moment';

interface ListItemProps {
    transaction: Transaction;
} 

interface ListItemState {
    ticketPurchaseList: TicketTransaction[];
}

export default class TransactionListItem extends React.Component<ListItemProps, ListItemState> {
    constructor(props){
        super(props);

        this.state = {
            ticketPurchaseList: this.props.transaction.transactionTicketPurchases,
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
            key={'listGroupItem'+this.props.transaction.transactionId}
            tag='div'
            color='warning'>
            <ListGroupItemHeading>
                Purchased On {this.props.transaction.date}
            </ListGroupItemHeading>
            {this.state.ticketPurchaseList.map(ticketPurchase =>
                <div className="row" key={'ticketItem'+ ticketPurchase.ticketId}>
                    <div className="col-md-3">
                        ${ticketPurchase.purchaseAmount}
                        <br/>
                    </div>
                </div>      
            )}
        </ListGroupItem>
    }
}


