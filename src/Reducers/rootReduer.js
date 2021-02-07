
import {uuid} from "uuidv4";
import {returnFound,appendProps,removeObject,changeProps} from "find-and";



const initialState = {
    
    triggerAction : false,
    xPosition: 0,
    yPosition:0,
    targetId:'',
    data: [
      {
        id: uuid(),
        name: "Parent1",
        children: [
          {
            id: uuid(),
            name: "Child1",
            children: [
              {
                id: uuid(),
                name: "GrandChild1",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: uuid(),
        name: "Parent2",
        children: [
          {
            id: uuid(),
            name: "Child2",
            children: [],
          },
        ],
      },
    ],
      
}


const rootReducer = (state = initialState,action) =>
{
  
    switch(action.type)
    {
        case 'TRIGGER_ACTION_MENU':
            {
                
                return Object.assign({},state,{triggerAction : true,
                    xPosition:action.payload.X + 'px',
                    yPosition:action.payload.Y + 'px',
                    targetId:action.payload.targetId
                    
                })
            }
        case 'EDIT_MENU' : 
        {
            
            let newData = state.data;
              const changedObj = changeProps( newData,{ id: action.id },{name:action.newName})
              return Object.assign({},state,{data:changedObj})
        }
      
        case 'ADD_SUB_MENU':
            {
                
                let newData = state.data;
                const newCategory = {
                  id: uuid(),
                  name: action.newName,
                  children: [],
                };
                const found =returnFound(
                  newData,
                  { id: action.id }
                );
                found.children.push(newCategory);
                
                const changedObj = appendProps(
                  newData,
                  { id: action.id },
                  { children: found.children }
                );
              
                return Object.assign({},state,{data:changedObj})
    
            }
        

        case 'DELETE_MENU':
            {
              let newData = state.data;
              const changedObj = removeObject(newData, { id: action.id });
              return Object.assign({},state,{data:changedObj})
            }
        default:return state;

    }
    

}

export default rootReducer;