var SHEET_ID = ""; //mock responses

/* 
 * GET Requests
 */
function doGet( req ) {
   var action    = req.parameter.action;
   var table_req = req.parameter.table;

   var db    = SpreadsheetApp.openById( SHEET_ID );
   var table = db.getSheetByName( table_req );

   switch(action) {
       case "read":
           return Read( req, table );
           break;
       case "insert":
           return Insert( req, table );
           break;
       case "update":
           return Update( req, table );
           break;
       case "delete":
           return Delete( req, table );
           break;
       default:
           break;
   }
}

/* Read
 * request for all tables
 *
 * @parameter action=read
 * @parameter table=<TABLE_NAME>
 * @parameter id=<COLUMN_ID>
 *
 * @example-request | ?action=read&table=<TABLE_NAME>
 * @example-request-single-row | ?action=read&table=<TABLE_NAME>&id=<ROW_NUMBER>
 */
function Read( request, table ) {
  var request_id = Number( request.parameter.id );
  
  return response().json({
    success: true,
    data: _read( table, request_id )
  });

}

/* Delete
 * dynamic for all tables
 *
 * @parameter action=delete
 * @parameter table=<TABLE_NAME>
 * @parameter id=<COLUMN_ID>
 * 
 * @example-request | ?action=update&table=<TABLE_NAME>&id=<ID>
 */
function Delete( request, table ) {
  var request_id = String( request.parameter.token );
  var current_data  = _read( table, request_id );
  
  // delete
  table.deleteRow( current_data.row );
  //Error! Exception: The parameters (null) don't match the method signature for SpreadsheetApp.Sheet.deleteRow. (line 66, file "Code")

  return response().json({
    success: true,
    data: current_data
  });
}

/**
 * Build the response content type 
 * back to the user
 */
function response() {
   return {
      json: function(data) {
         return ContentService
            .createTextOutput(JSON.stringify(data))
            .setMimeType(ContentService.MimeType.JSON);
      }
   }
}

/**
* Read from sheet and return map key-value
* javascript object
*/
function _read( sheet, id ) {
  var data         = sheet.getDataRange().getValues();
  var header       = data.shift();
  
  // Find All
  var result = data.map(function( row, indx ) {
    var reduced = header.reduce( function(accumulator, currentValue, currentIndex) {
      accumulator[ currentValue ] = row[ currentIndex ];
      return accumulator;
    }, {});

    reduced.row = indx + 2;
    return reduced;
    
  });
  
  // Filter if id is provided
  //? Can't find right entry??
  if( id ) {
    var filtered = result.filter( function( record ) {
      if ( record.id === id ) {
        return true;
      } else {
        return false;
      }
    });
    
    return filtered.shift();
  } 
  
  return result;
  
}