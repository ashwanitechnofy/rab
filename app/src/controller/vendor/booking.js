const BookingService = require("../../service/booking");
const CouponService = require("../../service/coupon");


const VehicleService = require("../../service/vehicles");
const BookingAddOnService = require("../../service/booking_add_ons");
const BookingAdvenService = require("../../service/booking_adventurers");
const ThridPartyBookingService = require("../../service/third_party_booking");

const Coupon = new CouponService();
const Booking = new BookingService();
const Vehicle = new VehicleService();
const BookingAddons = new BookingAddOnService();
const BookingAdven = new BookingAdvenService();
const ThridPartyBooing = new ThridPartyBookingService();

let statusCol = ['pending','completed','cancel'];
let controller = {};

controller.check_coupon = async(req,res)=>{
    try {
    const {coupon}= req.params;
    if(coupon){
    var result = await Coupon.getByCoupon(coupon);
    if(result){
        return res.status(200).json({
            success: true,
            data: result,
            error: false,
            message: 'Successfully fetch the result.'
        });
     }else{
        return res.status(500).json({
            success: false,
            data: null,
            error: true,
            message: 'No coupon found!.'
        });
    }
    }else{
        return res.status(500).json({
            success: false,
            data: null,
            error: true,
            message: 'No coupon field found!.'
        });
    }
    } catch (err) {
    console.log(err);
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'Something went wrong.'
    });
}
}
controller.booking_create = async (req, res) => {
    try {
        const {addons,adventurers,mobile} = req.body;
        req.body.user_id = req.user_id;
    let result = await Booking.register(req.body);
    if(result){
        req.body.booking_id = result.id;
        if(mobile){
            await ThridPartyBooing.register(req.body);
        }
        console.log(req.body);
        if(addons && addons.length){
            await addons.forEach(async val => {
                req.body.name = val.name;
                req.body.addons_id = val.id;
                req.body.price = val.price;
                req.body.quantity = val.quantity;
             await BookingAddons.register(req.body);
                });
            }

            if(adventurers && adventurers.length){
                await adventurers.forEach(async val => {
                    req.body.first_name = val.first_name;
                    req.body.last_name = val.last_name;
                    req.body.age = val.age;
                    req.body.gender = val.gender;
                 await BookingAdven.register(req.body);
                    });
                }
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Booking successfully created!'
        })
}else{
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'Something went wrong!'
    })
}
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            data: null,
            error: true,
            message: 'Internal Server Error'
        })
    }
}

controller.change_booking_status  = async (req, res) => {
    let {id} = req.params;
    let {status} = req.body;

    if(id && status){
    var result = await Booking.getById({id:id,user_id:req.user_id});
    if(result){
        let st = await statusCol.indexOf(status.toLowerCase());
        var update = await Booking.update({status:st.toString()},{id:id});
     if(update){
    return res.status(200).json({
        success: true,
        error: false,
        message: 'Successfully changed the booking status.'
    });
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Booking not found!'
    });
}
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Booking not found!'
    })
}
}else{
    if(!id)
    var mesg = 'Id not found!'
    if(!status)
    var mesg = 'Status not found!'
    return res.status(500).json({
        success: false,
        error: true,
        message: mesg
    })
}
}


controller.check_vehicle_booking  = async (req, res) => {
    try {
    let {from,to,vehicle_id} = req.body;
    var vehicleOne = await Vehicle.getOne({id:vehicle_id});
if(vehicleOne){
    var result = await Booking.getVBookById(vehicleOne.id,from,to);
  
    return res.status(200).json({
        success: true,
        data:result,
        error: false,
        message: 'Successfully fetched the result'
    });
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'No vehicle found!'
    })
}
}catch(err){
   console.log(err); 
   return res.status(500).json({
    success: false,
    error: true,
    message: 'Something went wrong.'
   });
}
}

controller.check_avail_vehicle  = async (req, res) => {
    try {
    let {model_id,category_id,company_id,from,to} = req.body;
    var vehicleOne = await Vehicle.getById({category_id,company_id,model_id});
if(vehicleOne){
    var result = await Booking.getVehicleQty(vehicleOne.id,from,to);
    if(!result)
    var avail = vehicleOne.quantity;
    else
    var avail = vehicleOne.quantity-result.total_vehicle_used;

    return res.status(200).json({
        success: true,
        data:{total_vehicle:vehicleOne.quantity,available_vehicle:avail,vehicle:vehicleOne},
        error: false,
        message: 'Successfully fetched the result'
    });
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'No vehicle found!'
    })
}
}catch(err){
   console.log(err); 
   return res.status(500).json({
    success: false,
    error: true,
    message: 'Something went wrong.'
   });
}
}

module.exports = controller;