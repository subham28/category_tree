import React, { Component } from 'react'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {connect} from "react-redux"



 class Sidebar extends Component {  


  //handler for contextmenu click (right click)
  mouseClickHandler = (nodeId,X,Y) => 
  {
      this.props.triggerActions(X,Y,nodeId);
  }


  //recursive function show data on UI,this returns items of tree
   getTreeItemsFromData = (treeItems) => {
      return treeItems.map((treeItemData) => {
        let children = undefined;
        if (treeItemData.children && treeItemData.children.length > 0) {
          children = this.getTreeItemsFromData(treeItemData.children);
        }

    return (
          <TreeItem
            key={treeItemData.id}
            nodeId={treeItemData.id}
            label={treeItemData.name}
            children={children}
            onContextMenu={(e) => {  e.preventDefault();
            e.stopPropagation();
            this.mouseClickHandler(treeItemData.id,e.clientX,e.clientY) }}
           
          />
        );
      });
    };

    render() {
      
        return (
            <div>
              <h1 style={{backgroundColor:'grey'}}>Hello,Browse through the Categories</h1>
              <TreeView
    
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      style={{border:'3px solid #666' ,
      marginLeft:'20px',
      maxWidth: 200}}
   
    > {this.getTreeItemsFromData(this.props.data)}
    
    </TreeView>
            </div>
        )
    }
}


 const mapStateToProps = (state) => 
{
return {
    data:state.data,}

}

const mapDispatchToProps = (dispatch) => {
  
  return {
    //below action will trigger the action menu, taking its positions and nodeId as targetId as payload
    triggerActions: (x,y,targetId) => 
    dispatch({ type: 'TRIGGER_ACTION_MENU',
    payload:{X:x,Y:y,targetId:targetId}})
   
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
