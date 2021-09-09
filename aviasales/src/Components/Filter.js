import React from 'react';
import cls from "../App.module.css";
import {connect} from "react-redux";
import {changeFilter} from "../Redux/filter"

class Filter extends React.Component {
    render() {
        return (
            <div className={cls.filter}>
                <p className={cls.filter__name}>Количество пересадок</p>
                <form className={cls.filter__form}>
                    {
                        this.props.filterParams.map((p,i)=>{
                            return <React.Fragment key={i} >
                                <input type="checkbox" id={p.id} onChange={() => this.props.changeFilter(i)} checked={p.checked} />
                                <label htmlFor={p.id}>{p.label}</label>
                                <br/>
                            </React.Fragment>
                        })
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filterParams: state.filterReducer.filterParams
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeFilter: index => dispatch(changeFilter(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)