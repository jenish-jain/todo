/*
{
    id: created by backend, cannot be updated
    caption: user specified, can be updated
    isCompleted: true or false, inititially false, can be updated
}
*/

/*
ToDo

Create ->
    POST , body with it, create an item, insert that into our storage
Read ->
    all of the todos -> the server dosen't need anyting from the client
    only one of the todo -> the server needs an 'id' or identifier
    GET ':todoId' [ i.e. expect one route parameter or no parameter at all]
Update -> 
    identifier or 'id' of a todo 
    POST , body -> 'id' 
    PUT, route param -> 'id' , body
Delete -> 
    DELETE -> route param -'id'
*/
