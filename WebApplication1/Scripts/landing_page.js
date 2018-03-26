$(document).ready(function () {
    ShowHideAgency();
});

function ShowHideAgency() {
    if (user == 'Milliman Admin' || user == "Milliman Staff"  ) {
        $('#agencyName').hide();
    }
    else {
        $('#agency-list').hide();
        $('#agencylist').hide();
    }
    //if (user == 'client' || user == 'agency') {
    //    $('#agency-list').hide();
    //    $('#agencylist').hide();

    //} else {
    //    $('#agencyName').hide();
    //}

    if (user !== 'Milliman Admin' && user !== 'Milliman Staff'  && user !== 'Agency Client User' && window.location.pathname.indexOf("/Home/Index") !== -1) {
        $('#agencyName').html($("#selectedAgency option:selected").text());
    } else {
        $('#agencyName').html('<h6>Welcome ,</h6>' + $("#selectedAgency option:selected").text());
    }
    //if (user == 'client' || user == 'agency') {
    //    $('#agency-list').hide();
    //    $('#agencylist').hide();

    //} else {
    //    $('#agencyName').hide();
    //}

    //var pathname = window.location.pathname;
    //if (user == 'agency' && pathname.indexOf("/Home/Index") != -1) {
    //    $('#agencyName').html($("#selectedAgency option:selected").text());
    //} else {
    //    $('#agencyName').html('<h6>Welcome ,</h6>' + $("#selectedAgency option:selected").text());
    //}
}