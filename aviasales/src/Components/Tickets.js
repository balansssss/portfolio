import React from 'react';
import cls from "../App.module.css";
import {connect} from "react-redux";
import {changeSortParam, getTickets, loadTickets,
    formatDuration, formatTimeArrive, formatTimeFlying} from "../Redux/tickets";

class Tickets extends React.Component {

    renderTicket = arr => {
        return arr.map((ticket, i) => {
            if (ticket.unvisible) {
                return null
            } else {
                return <div className={cls.ticket} key={i}>
                    <div className={cls.ticket__container}>
                        <span className={cls.ticket__price}>{ticket.price} P</span>
                        <img className={cls.ticket__company} src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="company" />
                    </div>
                    <div className={cls.ticket__container}>
                        <div className={cls.ticket__info}>
                            <p className={cls.ticket__info__title}>{ticket.segments[0].origin}-{ticket.segments[0].destination}</p>
                            <p className={cls.ticket__info__value}>{formatTimeFlying(ticket.segments[0].date)}-{formatTimeArrive(ticket.segments[0].date, ticket.segments[0].duration)}</p>
                        </div>
                        <div className={cls.ticket__info}>
                            <p className={cls.ticket__info__title}>В пути</p>
                            <p className={cls.ticket__info__value}>{formatDuration(ticket.segments[0].duration)}</p>
                        </div>
                        <div className={cls.ticket__info}>
                            <p className={cls.ticket__info__title}>{ticket.segments[0].stops.length} пересадки</p>
                            <p className={cls.ticket__info__value}>{ticket.segments[0].stops.length ? ticket.segments[0].stops.map(stop => stop).join(",") : "-"}</p>
                        </div>
                    </div>
                    <div className={cls.ticket__container}>
                        <div className={cls.ticket__info}>
                            <p className={cls.ticket__info__title}>{ticket.segments[1].origin}-{ticket.segments[1].destination}</p>
                            <p className={cls.ticket__info__value}>{formatTimeFlying(ticket.segments[1].date)}-{formatTimeArrive(ticket.segments[1].date, ticket.segments[1].duration)}</p>
                        </div>
                        <div className={cls.ticket__info}>
                            <p className={cls.ticket__info__title}>В пути</p>
                            <p className={cls.ticket__info__value}>{formatDuration(ticket.segments[1].duration)}</p>
                        </div>
                        <div className={cls.ticket__info}>
                            <p className={cls.ticket__info__title}>{ticket.segments[1].stops.length} пересадки</p>
                            <p className={cls.ticket__info__value}>{ticket.segments[1].stops.length ? ticket.segments[1].stops.map(stop => stop).join(",") : "-"}</p>
                        </div>
                    </div>
                </div>
            }
        })
    }

    componentDidMount() {
        this.props.getTickets()
    }

    render() {
        return (
            <div className={cls.tickets}>
                <ul className={cls.tickets__sort}>
                    <li className={this.props.sortParamsClass['price']} onClick={() => this.props.changeSortParam('price')}>Самый дешевый</li>
                    <li className={this.props.sortParamsClass['duration']} onClick={() => this.props.changeSortParam('duration')}>Самый быстрый</li>
                </ul>
                <div className={cls.tickets__container}>
                    {
                        this.props.errMes
                            ? <p className={cls.mes + cls.error}>{this.props.errMes}</p>
                            : this.props.tickets
                                ? this.renderTicket(this.props.tickets)
                                : <p className={cls.mes}>Упс, что-то пошло не так! Обновите страницу!</p>
                    }
                    <button onClick={this.props.loadTickets} className={cls.searchButton}>Показать еще 5 билетов!</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        searchId: state.ticketsReducer.searchId,
        errMes: state.ticketsReducer.errMes,
        allTickets: state.ticketsReducer.allTickets,
        tickets: state.ticketsReducer.tickets,
        sortParamsClass: state.ticketsReducer.sortParamsClass,
        sortParam: state.ticketsReducer.sortParam
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTickets: () => dispatch(getTickets()),
        changeSortParam: param => dispatch(changeSortParam(param)),
        loadTickets: () => dispatch(loadTickets())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)