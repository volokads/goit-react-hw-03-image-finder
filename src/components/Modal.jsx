import { Component } from "react" 
import {createPortal} from "react-dom"

class Modal extends Component{
     componentDidMount(){
        window.addEventListener("keydown", this.onEscClick)
    }
    componentWillMount() { 
        window.removeEventListener("keydown", this.onEscClick)
    }
    onEscClick = (e) => { 
        if (e.code === 'Escape') { 
            this.props.switch()
        }
    } 
    handleClose = (e) => { 
        if (e.currentTarget === e.target) { 
            this.props.switch()
        }
    }
    render() {
        return createPortal(
            <div className="Overlay" onClick={this.handleClose}>
                <div className="Modal">{this.props.children}</div>
            </div>,
            document.getElementById('modalRoot')
        )
    }
}
export  {Modal}