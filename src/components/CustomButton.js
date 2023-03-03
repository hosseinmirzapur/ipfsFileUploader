import {Fragment} from 'react'
import {Button} from "reactstrap";

const CustomButton = ({color = 'primary', text = '', clickEvent, disabled = false, style}) => {
    return (
        <Fragment>
            <Button color={color} onClick={clickEvent} disabled={disabled} style={style}>
                {text}
            </Button>
        </Fragment>
    )
}

export default CustomButton
