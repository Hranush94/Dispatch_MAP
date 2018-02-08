// this state is responsible only for this function state,not for app state
export default function (state , action) {
  switch (action.type){
    case 'MARKER_CLICKED':
      return  action.payload;
    default:
      return []
      
  }
}
