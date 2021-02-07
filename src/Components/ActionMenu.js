import React, {  Component } from 'react';
import "./ActionMenu.css";
import {connect} from "react-redux";
import {Edit,Add,Delete} from "../ActionCreator/MenuActionsCreator"




 class ActionMenu extends Component {

    editClickHandler = (e) =>
    { e.preventDefault();
        var newName = prompt("Enter a new name","");
        if(newName!==""){
            this.props.edit(this.props.targetId,newName)
        }
        
       

    }
    addClickHandler = (e) =>
    {
        e.preventDefault();
        var newName = prompt("Enter new category name","");
        if(newName!==""){
            this.props.add(this.props.targetId,newName)
        }
      
    }
    deleteClickHandler = (e) =>
    {
        e.preventDefault();
        this.props.delete(this.props.targetId)
    }


    //handler for left click
    handleClick = (e) => {
        
        if(this.props.triggerAction){
            let contextmenu = document.getElementById('contextMenu')
            contextmenu.style.display = "none"
        }
     }

     //capturing left click after mounting
    componentDidMount() {
        document.addEventListener("click", this.handleClick);
    }

    //to reopen the contextmenu on rightclicking again(re-rendering)
    componentDidUpdate(prevProps, prevState)
    {
        if(prevProps.triggerAction !== this.props.triggerAction || 
            this.props.triggerAction === true )
            {
                let contextmenu = document.getElementById('contextMenu')
                 contextmenu.style.display = "block"
            }
    }


    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
       //clearing event listner
    }

    render() {

        const menuStyle = {
            width: '200px',
            height: 'auto',
            position: 'absolute',
            opacity:1 ,
            display: this.props.triggerAction? "block" : "none",
            left:this.props.xPosition ,
            top:this.props.yPosition
        }

        
    
       if(menuStyle.display === "block"){return (
         
        <div id="contextMenu" className= "context-menu" style={menuStyle}>
            <ul>
                <li onClick={this.editClickHandler}>Edit Category</li>
                <li onClick={this.addClickHandler}>Add SubCategory</li>
                <li onClick={this.deleteClickHandler} >Delete Category</li>
            </ul>
        </div>
   )}else return null;
        
    }
}

const mapStateToProps = (state) =>
{
    return{
        triggerAction: state.triggerAction,
        xPosition: state.xPosition,
        yPosition: state.yPosition,
        data:state.data,
        targetId:state.targetId
    }

}

const mapDispatchToProps = (dispatch,ownProps) =>
{   //let id = ownProps.targetId;

    return {
        add: (id,newName) => { dispatch(Add(id,newName)) },
        edit: (id,newName) => { dispatch(Edit(id,newName))},
        delete: (id)=>{ dispatch(Delete(id))}

      }
    



}
    

export default connect(mapStateToProps,mapDispatchToProps)(ActionMenu)
