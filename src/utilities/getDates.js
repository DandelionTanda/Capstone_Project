// Reference Samuel Meddows & mohshbool's answer at https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
export default  function getDates() {
  
  var today = new Date();
  var dd_today = String(today.getDate()).padStart(2, '0');
  var mm_today = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy_today = today.getFullYear();

  var past = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000) 
  
  var dd_past = String(past.getDate()).padStart(2, '0');
  var mm_past = String(past.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy_past = past.getFullYear();

  today = yyyy_today + '-' + mm_today + '-' + dd_today;
  past = yyyy_past + '-' + mm_past + '-' + dd_past;
  
  return [past, today]
}