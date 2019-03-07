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
        console.log('Hello');
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