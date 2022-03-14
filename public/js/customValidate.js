$.validator.addMethod(
    "validEmail", function (value, element) {
        var pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        return pattern.test(value);
    },'Please enter a valid email address.'
);

var manageUserRules = {
    first_name : {
        required : true,
        minlength: 3,
        maxlength: 10,
    },
    last_name : {
        required : true,
        minlength: 3,
        maxlength: 10,
    },
    email : {
        required : true,
        validEmail: true,
        maxlength: 40,
    },
    password : {
        required : true,
        minlength: 8,
        maxlength: 16,
    },
    confirm_password : {
        required : true,
        minlength: 8,
        maxlength: 16,
        equalTo:"#password"
    },
    mobile_no : {
        required : true,
    },
    gender : {
        required : true,
    },
    dob : {
        required : true,
    },
    country : {
        required : true,
    },
    state : {
        required : true,
    },
    city : {
        required : true,
    },
    address : {
        required : true,
    },
    pin_code : {
        required : true,
    },
    landmark : {
        required : true,
        minlength: 3,
        maxlength: 10,
    },
    image : {
        required : true,
    }
};

var manageUserMessage = { 
    first_name : {
        required : "Please enter your first name.",
        maxlength: "First name may not be greater than 10 characters.",
    },
    last_name : {
        required : "Please enter your last name.",
        maxlength: "Last name may not be greater than 10 characters.",
    },
    email : {
        required : "Please enter your email.",
        maxlength: "Email may not be greater than 40 characters.",
    },
    password : {
        required : "Please enter your password.",
        minlength: "Confirm password must be at least 8 characters.",
        maxlength: "Confirm password may not be greater than 16 characters.",
    },
    confirm_password : {
        required : "Please enter your confirm password.",
        minlength: "Confirm password must be at least 8 characters.",
        maxlength: "Confirm password may not be greater than 16 characters.",
        equalTo: "Password and confirm password does not match.",
    },
    mobile_no : {
        required : "Please enter your mobile.",
    },
    gender : {
        required : "Please select your gender.",
    },
    dob : {
        required : "Please select your date of birth.",
    },
    country : {
        required : "Please select your country.",
    },
    state : {
        required : "Please select your state.",
    },
    city : {
        required : "Please select your city.",
    },
    address : {
        required : "Please enter your address.",
    },
    pin_code : {
        required : "Please enter your pin code.",
    },
    landmark : {
        required : "Please enter your landmark.",
        maxlength: "Landmark may not be greater than 10 characters.",
    },
    image : {
        required : "Please upload your image.",
    },
};

$('#subAdminForm').validate({
    rules : manageUserRules,
    messages :manageUserMessage,
});

$('#vendorForm').validate({
    rules : Object.assign(manageUserRules, {
                business_name : {
                    required : true,
                    minlength: 3,
                    maxlength: 50,
                },
                alternate_mobile_number : {
                    required : true,
                },
                category : {
                    required : true,
                },
                location : {
                    required : true,
                },
                description : {
                    required : true,
                },
            }),
    messages :Object.assign(manageUserMessage, {
                business_name : {
                    required : "Please enter your title.",
                    maxlength: "Title may not be greater than 50 characters.",
                },
                alternate_mobile_number : {
                    required : "Please enter your aletrnate mobile.",
                },
                category : {
                    required : "Please select your category.",
                },
                location : {
                    required : "Please enter your location.",
                },
                description : {
                    required : "Please enter your description.",
        
                },
            }),
});

$('#userForm').validate({
    rules : manageUserRules,
    messages :manageUserMessage,
});

$('#taxiDriverForm').validate({
    rules : manageUserRules,
    messages :manageUserMessage,
});

$('#hotelForm').validate({
    rules : manageUserRules,
    messages :manageUserMessage,
});

$('#categoryForm').validate({
    rules :{
        title : {
            required : true,
            minlength: 3,
            maxlength: 10,
        },
    },
    messages :{
        title : {
            required : "Please enter title.",
            maxlength: "Title may not be greater than 10 characters.",
        },
    }
});