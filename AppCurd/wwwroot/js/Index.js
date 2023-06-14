let _modelEmployee = {
    IdEmployee: 0,
    FullName: "",
    IdDepartment: 0,
    Salary: 0,
    HireDate: ""
}


function ShowEmployees() {


    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Home/GetEmployeeList',
        //data: JSON.stringify(model),
        success: function (result) {
            if (result.length > 0) {

                //clean the table first
                $("#tableEmployee tbody").html("");

                //add information to the table
                result.forEach((employee) => {

                    $("#tableEmployee tbody").append(
                        $("<tr>").append(
                            $("<td>").text(employee.fullName),
                            $("<td>").text(employee.refDepartment.name),
                            $("<td>").text(employee.salary),
                            $("<td>").text(employee.hireDate),
                            $("<td>").append(
                                $("<button>").addClass("btn btn-primary btn-sm button-edit-employee").text("Edit").data("dataEmployee", employee),
                                $("<button>").addClass("btn btn-danger btn-sm button-delete-employee ms-2").text("Delete").data("dataEmployee", employee),
                            )
                        )
                    )


                })
            }

        },
        error: function () {
            alert('Something went wrong!');
        }

    });

    //fetch("/Home/GetEmployeeList")
    //    .then(response => {
    //        return response.ok ? response.json() : Promise.reject(response);
    //    })
    //    .then(responseJson => {

    //        if (responseJson.length > 0) {

    //            //clean the table first
    //            $("#tableEmployee tbody").html("");

    //            //add information to the table
    //            responseJson.forEach((employee) => {

    //                $("#tableEmployee tbody").append(
    //                    $("<tr>").append(
    //                        $("<td>").text(employee.fullName),
    //                        $("<td>").text(employee.refDepartment.name),
    //                        $("<td>").text(employee.salary),
    //                        $("<td>").text(employee.hireDate),
    //                        $("<td>").append(
    //                            $("<button>").addClass("btn btn-primary btn-sm button-edit-employee").text("Edit").data("dataEmployee", employee),
    //                            $("<button>").addClass("btn btn-danger btn-sm button-delete-employee ms-2").text("Delete").data("dataEmployee", employee),
    //                        )
    //                    )
    //                )


    //            })
    //        }

    //    })


}


document.addEventListener('DOMContentLoaded', function () {

    //show employees
    ShowEmployees();

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: '/Home/GetDepartmentList',
        //data: JSON.stringify(model),
        success: function (result) {
            if (result.length > 0) {
                result.forEach((item) => {
                    $("#cboDepartment").append(
                        $("<option>").val(item.idDepartment).text(item.name)
                    )
                })
            }

        },
        error: function () {
            alert('Something went wrong!');
        }

    });

    //show departments in select
    //fetch("/Home/GetDepartmentList")
    //    .then(response => {
    //        return response.ok ? response.json() : Promise.reject(response);
    //    })
    //    .then(responseJson => {
    //        if (responseJson.length > 0) {
    //            responseJson.forEach((item) => {
    //                $("#cboDepartment").append(
    //                    $("<option>").val(item.idDepartment).text(item.name)
    //                )
    //            })
    //        }
    //    })

    //show calendar in input

    $("#txtHireDate").datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true
    })

}, false)


function OpenModal() {

    $("#txtFullName").val(_modelEmployee.FullName);
    $("#cboDepartment").val(_modelEmployee.IdDepartment == 0 ? $("#cboDepartment option:first").val() : _modelEmployee.IdDepartment);
    $("#txtSalary").val(_modelEmployee.Salary)
    $("#txtHireDate").val(_modelEmployee.HireDate)

    //show modal
    $("#modalEmployee").modal("show");

}

//event when press the new employee button
$(document).on("click", ".button-new-employee", function () {

    _modelEmployee.IdEmployee = 0;
    _modelEmployee.FullName = "";
    _modelEmployee.IdDepartment = 0;
    _modelEmployee.Salary = 0;
    _modelEmployee.HireDate = "";

    OpenModal();


})

//event when press the edit button
$(document).on("click", ".button-edit-employee", function () {

    const _employee = $(this).data("dataEmployee");

    _modelEmployee.IdEmployee = _employee.idEmployee;
    _modelEmployee.FullName = _employee.fullName;
    _modelEmployee.IdDepartment = _employee.refDepartment.idDepartment;
    _modelEmployee.Salary = _employee.salary;
    _modelEmployee.HireDate = _employee.hireDate;

    OpenModal();

})

//event when press the save changes button of the modal
$(document).on("click", ".button-save-changes-employee", function () {

    //employee model to save or update
    const model = {
        IdEmployee: _modelEmployee.IdEmployee,
        FullName: $("#txtFullName").val(),
        RefDepartment: {
            IdDepartment: $("#cboDepartment").val()
        },
        Salary: $("#txtSalary").val(),
        HireDate: $("#txtHireDate").val()
    }
    console.log(model)

    if (_modelEmployee.IdEmployee === 0) {



        passData = JSON.stringify({
            IdEmployee: 0,
            FullName: _modelEmployee.FullName,
            IdDepartment: _modelEmployee.IdDepartment,
            Salary: _modelEmployee.Salary,
            HireDate: _modelEmployee.HireDate,
        });


        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/Home/SaveEmployee',
            data: JSON.stringify(model),
            success: function (result) {
                $("#modalEmployee").modal("hide");
                alert("Employee was registered");
                ShowEmployees();

            },
            error: function () {
                alert('Something went wrong!');
            }

        });

        //fetch("/Home/SaveEmployee", {
        //    method: "POST",
        //    headers: { "Content-Type": "application/json; charset=utf-8" },
        //    body: JSON.stringify(model)
        //})
        //    .then(response => {
        //        return response.ok ? response.json() : Promise.reject(response);
        //    })
        //    .then(responseJson => {

        //        if (responseJson.value) {
        //            $("#modalEmployee").modal("hide");
        //            alert("Employee was registered");
        //            ShowEmployees();
        //        }
        //        else
        //            alert("failed to create")

        //    })

    } else {

        passData = JSON.stringify({
            IdEmployee: _modelEmployee.IdEmployee,
            FullName: _modelEmployee.FullName,
            IdDepartment: _modelEmployee.IdDepartment,
            Salary: _modelEmployee.Salary,
            HireDate: _modelEmployee.HireDate,
        });


        $.ajax({

            //url: '/Home/EditEmployee',
            //type: 'PUT',
            //dataType: 'json',
            //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'PUT',
            url: '/Home/EditEmployee',
            data: JSON.stringify(model),
            success: function (result) {
                $("#modalEmployee").modal("hide");
                alert("Employee was registered");
                ShowEmployees();

            },
            error: function () {
                alert('Something went wrong!');
            }

        });

        //fetch("/Home/EditEmployee", {
        //    method: "PUT",
        //    headers: { "Content-Type": "application/json; charset=utf-8" },
        //    body: JSON.stringify(model)
        //})
        //    .then(response => {
        //        return response.ok ? response.json() : Promise.reject(response);
        //    })
        //    .then(responseJson => {

        //        if (responseJson.value) {
        //            $("#modalEmployee").modal("hide");
        //            alert("Employee was updated");
        //            ShowEmployees();
        //        }
        //        else
        //            alert("failed to update")

        //    })


    }
})


//event when press the delete button
$(document).on("click", ".button-delete-employee", function () {

    const _employee = $(this).data("dataEmployee");

    const result = confirm(`Do you want to delete the employee "${_employee.fullName}" ?`);

    $.ajax({

        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'DELETE',
        url: `/Home/DeleteEmployee?idEmployee=${_employee.idEmployee}`,
        data: result,
        success: function (result) {
            $("#modalEmployee").modal("hide");
            alert("employee was deleted");
            ShowEmployees();

        },
        error: function () {
            alert('failed to delete');
        }

    });


    //if (result) {
    //    fetch(`/Home/DeleteEmployee?idEmployee=${_employee.idEmployee}`, {
    //        method: "DELETE"
    //    })
    //        .then(response => {
    //            return response.ok ? response.json() : Promise.reject(response);
    //        })
    //        .then(responseJson => {

    //            if (responseJson.value) {
    //                alert("employee was deleted");
    //                ShowEmployees();
    //            } else
    //                alert("failed to delete")

    //        })

    //}

})



//$(document).ready(function () {
//    $('#searchForm').submit(function (event) {
//        event.preventDefault(); // Prevent form submission

//        var searchTerm = $('#searchTerm').val();

//        $.ajax({
//            url: '/Search', // The URL for your search action in the controller
//            data: { searchTerm: searchTerm },
//            success: function (data) {
//                displaySearchResults(data);
//            },
//            error: function (xhr, status, error) {
//                console.error(error);
//            }
//        });
//    });
//});

//function displaySearchResults(results) {
//    var searchResultsContainer = $('#searchResults');
//    searchResultsContainer.empty();

//    if (results.length > 0) {
//        var ul = $('<ul></ul>');

//        results.forEach(function (result) {
//            var li = $('<li></li>').text(result.name);
//            ul.append(li);
//        });

//        searchResultsContainer.append(ul);
//    } else {
//        searchResultsContainer.text('No results found.');
//    }
//}