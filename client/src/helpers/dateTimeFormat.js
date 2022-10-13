export const dateTimeFormat = (date) =>{
   let options = {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: 'numeric', minute: 'numeric',
        hour12: false,
        
      };
    return new Intl.DateTimeFormat('th-TH',options).format(new Date(date))
}