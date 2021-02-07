//its the actionCreator for the actionMenu.
 const EDIT_MENU = 'EDIT_MENU';
 const ADD_SUB_MENU = 'ADD_SUB_MENU';
 const DELETE_MENU = 'DELETE_MENU';


 export function Edit(id,newName)
{ return {
        type:EDIT_MENU,
        id,
        newName
}}

 export function Add(id,newName)
{   return {
        type:ADD_SUB_MENU,
        id,
        newName
}}

 export function Delete(id)
{    return {
        type:DELETE_MENU,
        id
}}

