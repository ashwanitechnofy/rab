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
                    required : "Please enter your business name.",
                    maxlength: "Business name may not be greater than 50 characters.",
                },
                alternate_mobile_number : {
                    required : "Please enter your business aletrnate mobile.",
                },
                category : {
                    required : "Please select your business category.",
                },
                location : {
                    required : "Please enter your business location.",
                },
                description : {
                    required : "Please enter your business description.",
        
                },
            }),
});

$('#userForm').validate({
    rules : manageUserRules,
    messages :manageUserMessage,
});

$('#taxiDriverForm').validate({
    rules : Object.assign(manageUserRules, {
        brand : {
            required : true,
        },
        model : {
            required : true,
        },
        type : {
            required : true,
        },
        registration_number : {
            required : true,
        },
        location : {
            required : true,
        },
        driving_area_radus : {
            required : true,
        },
        license_number : {
            required : true,
        },
        license_expiry_date : {
            required : true,
        },
        license_front_side : {
            required : true,
        },
        license_back_side : {
            required : true,
        },
    }),
    messages :Object.assign(manageUserMessage, {
        brand : {
            required : "Please select brand.",
        },
        model : {
            required : "Please select model.",
        },
        type : {
            required : "Please select type.",
        },
        registration_number : {
            required : "Please enter your registration number.",
        },
        location : {
            required : "Please enter your loaction.",
        },
        driving_area_radus : {
            required : "Please enter your driving area radus.",
        },
        license_number : {
            required : "Please enter your license number.",
        },
        license_expiry_date : {
            required : "Please selete your date.",
        },
        license_front_side : {
            required : "Please upload license.",
        },
        license_back_side : {
            required : "Please upload license.",
        },
    }),
});

$('#hotelForm').validate({
    rules : manageUserRules,
    messages :manageUserMessage,
});

$('#categoryForm').validate({
    rules :{
        title : {
            required : true,
            maxlength: 50,
        },
    },
    messages :{
        title : {
            required : "Please enter title.",
            maxlength: "Title may not be greater than 50 characters.",
        },
    }
});