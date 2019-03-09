$(document).ready(function() {
    console.log('Dom Loaded');
    createDatatablesGrid();
});


var createDatatablesGrid = function() {
    var columns = '[{ "name" : "REG_ID", "searchable" : false}, {"name" : "COMPANY_NAME", "searchable": true },';
    columns += '{ "name" : "CITY", "searchable" : false}, {"name" : "PHONE", "searchable": false},';
    columns += '{ "name": "COUNTRY", "searchable": false}';
    if($("#CompanyList th").hasClass("edit")) {
        columns += ',{ "name": "EDIT", "searchable": false, "orderable": false, ';
        columns += '"render": function(data, type, full, meta) { return editColumnContent(); }}';
    }
    if($("#CompanyList th").hasClass("delete")) {
        columns += ',{ "name" : "DELETE", "searchable" : false, "orderable": false, ';
        columns += '"render": function(data, type, full, meta) { return deleteColumnContent(); }}]';
    }
    var columndef = eval(columns); //console.log(columndef);
    $('#CompanyList').show();
    companyTable = $('#CompanyList').DataTable({
        "destroy" : true,
        "dom" : "lftipr",
        "language" : {
            "search" : "Search by Company Name :"
        },
        "columns" : columndef,
        "order" : [[1, "asc"]],
        "processing" : true,
        "serverSide" : true,
        "ajax" : {
            "url" : "/companies/getCompanyList",
            "type" : "POST"
        }
    });
    //Adding functionality after DT initialization
    $('#CompanyList').on('init.dt', function() {
        
        //$("input[type=search]").addClass("BlockSpecialCharacters");
        $('#CompanyList').off('click');
        $('#CompanyList').on('click', 'td', function(e) {
            e.preventDefault();
            //retreive the corresponding data of the cell which was being clicked
            const cellColumnIndex = companyTable.cell(this).index().column;
            const cellColumnHeader = companyTable.column(cellColumnIndex).header();
            const cellColumnHeaderData = $(cellColumnHeader).html().toUpperCase();
            const cellRowIndex = companyTable.cell(this).index().row;
            const cellRowDataRegId = companyTable.row(cellRowIndex).data()[0];
            CellClickListener(cellRowDataRegId, cellRowIndex, cellColumnHeaderData);
        });
    });
};

var CellClickListener = function(regId, rowIndex, columnName, e) {
    
    let value = regId;
    let messageDelete = 'WARNING : Deleting a company willl delete all of its users and the associated records. \
                         Are you sure you want to delete this company?';
    let nameOfColumn = columnName;
    if(nameOfColumn === "EDIT")
    {
        let userId = regId;
        let hiddenId = $('#HiddenId');
        hiddenId.value = eval(userId);
        var url = "/companies/editCompanyDetails" + "?mode='View'" + "&regId=" + userId;
        //console.log('clicked');
        //console.log('ID:', regId);
        ModalWindow("GeneralModal", "Company Details", url);
    }
};
var ModalWindow = function(id, title, url, callback) {
    $("#"+id+"").modal({
        backdrop: 'static'
    });
    $(".modal-title").text(title);
    $(".modal-body").load(url, function(response, status, xhr){
        console.log('Modal Loaded');
        $("#"+id +"").modal('show');
    });
    
};
var editColumnContent = function() {
    var link = "<img src='/public/assets/images/pencil_32.png' alt='Edit' width='16' height='16' title='Edit Company Details' style='cursor:pointer'/>";
    return link;
};

var deleteColumnContent = function() {
    var link = "<img src='/public/assets/images/close_32.png' alt='Delete' width='16' height='16' title='Delete Company' style='cursor:pointer'/>";
    return link;
};