import React from 'react';
import AnimateHeight from 'react-animate-height';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../res/styles/style-actioncard.css';

const renderProgress = () => {
    return (
        <span style = {{ marginLeft: 20}}>
            <CircularProgress 
                size={20}
                color="primary" />
        </span>
    );
}

const ActionCard = (props) => {
    return(
        <div className = 'card-layout'>
            <AnimateHeight
                duration={500}
                height = {props.height}
            >
                <h1>{props.title}</h1>
                <form autoComplete="off" onSubmit = {props.onPrimaryBtnClicked} id="emperio-form">
                    {props.children}
                    <div>
                        <input type = 'submit' value = {props.primaryBtn} disabled = {(props.isDisabled)? "disabled" : ""}/>
                        {(props.isDisabled && props.isPrimaryBtnClicked) ? renderProgress() : <div />}
                    </div>
                </form>
            </AnimateHeight>
        </div>
    );
}

export default ActionCard;
