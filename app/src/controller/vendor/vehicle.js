const VehicleService = require("../../service/vehicles");
const CommentService = require("../../service/comments");
const ModelYearService = require("../../service/model_year");
const VehicleAddOnService = require("../../service/vehicle_add_ons");
const VehicleCategory = require("../../service/vehicle_category");
const fs = require("fs");

const Vehicle = new VehicleService();
const Comments = new CommentService();

const ModelYear = new ModelYearService();
const VehicleAddOns = new VehicleAddOnService();
const vehicle_cat = new VehicleCategory();

let controller = {};


controller.add_comment  = async (req, res) => {
    try{
        const {vehicle_id} = req.body;
        if(vehicle_id){
    var result = await Comments.register(req.body);
    if(result){
    return res.status(200).json({
        success: true,
        data:result,
        error: false,
        message: 'Successfully inserted comments.'
    });
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Something went wrong.'
    })
}
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Vehicle id field not found!.'
    })
}
}catch(err){
    console.log(err);
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Internal server error..'
    });
}
}

controller.categoryList  = async (req, res) => {
    var result = await vehicle_cat.getCompanyModel();
    return res.status(200).json({
        success: true,
        data:result,
        error: false,
        message: 'Successfully fetched data.'
    })
}

controller.getList  = async (req, res) => {
    let {category_id,id} = req.body; let param;
    if(!category_id)
    category_id = await vehicle_cat.firstCategoryId();
    if(!id)
 param = {user_id:req.user_id,category_id:category_id}
 else
 param = {id:{$lt:id},user_id:req.user_id,category_id:category_id}

    var result = await Vehicle.getVendorVehicles(param);

    return res.status(200).json({
        success: true,
        data:result,
        error: false,
        message: 'Successfully fetched vehicles data.'
    })
}


controller.vehicle_add = async (req, res) => {
    try {
        const {years,items,category_id,company_id,model_id} = req.body;
        req.body.user_id = req.user_id;
        var vehicleOne = await Vehicle.getByAttr({category_id,company_id,model_id,user_id:req.body.user_id});
       if(!vehicleOne){
        if (req.files && Object.keys(req.files).length && req.files.v_images && Object.keys(req.files.v_images).length) {
             var arr = [];
            await req.files.v_images.forEach(file => {
              arr.push(file.filename);
            });
            req.body.v_images = arr;
        }

        if (req.files && Object.keys(req.files).length && req.files.h_images && Object.keys(req.files.h_images).length) {
            var arr = [];
           await req.files.h_images.forEach(file => {
             arr.push(file.filename);
           });
           req.body.h_images = arr;
       }
    let result = await Vehicle.register(req.body);
    if(result){
        req.body.vehicle_id = result.id;
        if(years && years.length){
    await years.forEach(async val => {
        req.body.year = val.name;
        req.body.registration_no = val.registration_no;
     await ModelYear.register(req.body);
        });
    }

    if(items && items.length){
        await items.forEach(async val => {
            req.body.item = val.name;
            req.body.price = val.price;
            await VehicleAddOns.register(req.body);
        });
        } 
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Successfully added vehicle!'
        })
}else{
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'Something went wrong!'
    })
}
}else{
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'vehicle already exists.'
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

controller.vehicle_edit = async (req, res) => {
    try {
        const {years,items,category_id,company_id,model_id,deletedImg_h,deletedImg_v} = req.body;
        const {id} = req.params;
        if(id){
            req.body.user_id = req.user_id;
        let result = await Vehicle.getOne({id:id});
        if(result){
            var vehicleOne = await Vehicle.getByAttr({id:{$ne:id},category_id,company_id,model_id,user_id:req.body.user_id});
       if(!vehicleOne){
        if (req.files && Object.keys(req.files).length && req.files.h_images && Object.keys(req.files.h_images).length) {
             var arr = [];
            await req.files.h_images.forEach(file => {
              arr.push(file.filename);
            });
            req.body.h_images = arr;
        }

        if (req.files && Object.keys(req.files).length && req.files.v_images && Object.keys(req.files.v_images).length) {
            var arr1 = [];
           await req.files.v_images.forEach(file => {
             arr1.push(file.filename);
           });
           req.body.v_images = arr1;
       }

        if(result.h_images && deletedImg_h && deletedImg_h.length){
            var allItem = await result.h_images.map(item =>  urlData(item) );
            var allImg = await diffArray(allItem,deletedImg_h);
            req.body.h_images = [...allImg,req.body.h_images];
        }

        if(result.v_images && deletedImg_v && deletedImg_v.length){
            var allItem = await result.v_images.map(item =>  urlData(item) );
            var allImg = await diffArray(allItem,deletedImg_v);
            req.body.v_images = [...allImg,req.body.v_images];
        }
     result = await Vehicle.update(req.body,{id:id});
    if(result){
        if(deletedImg_v && deletedImg_v.length){
            await deletedImg_v.forEach( async(item)=>{
            await fs.unlink('app/assets/image/vehicles/' + item, (err) => {
                      if (err)
                      console.log('for save image get error', err);
                      });
           });
          }

          if(deletedImg_h && deletedImg_h.length){
            await deletedImg_h.forEach( async(item)=>{
            await fs.unlink('app/assets/image/vehicles/' + item, (err) => {
                      if (err)
                      console.log('for save image get error', err);
                      });
           });
          }
          await ModelYear.delete({vehicle_id:id});
          await VehicleAddOns.delete({vehicle_id:id});
          req.body.vehicle_id = id;

          if(years && years.length){
    await years.forEach(async val => {
        req.body.year = val.name;
        req.body.registration_no = val.registration_no;
     await ModelYear.register(req.body);
        });
    }

    if(items && items.length){
        await items.forEach(async val => {
            req.body.item = val.name;
            req.body.price = val.price;
            await VehicleAddOns.register(req.body);
        });
        } 
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Successfully updated vehicle!'
        })
}else{
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'Something went wrong!'
    })
}
}else{
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'Vehicle already exist!'
    })
}
}else{
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'No Vehicle not found!'
    })
}
}else{
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'Vehicle id not found!'
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

controller.vehicle_delete  = async (req, res) => {
    let {id} = req.params;
    if(id){
        var service = await Vehicle.getOne({id:req.params.id});
        if(service){
            let deletedOne = [...service.v_images,service.h_images];

         if(deletedOne && deletedOne.length){
            await deletedOne.forEach( async(item)=>{
                item =await urlData(item);
            await fs.unlink('app/assets/image/vehicles/' + item, (err) => {
                      if (err)
                      console.log('for save image get error', err);
                      });
           });
          }
                      var result = await Vehicle.delete(id);
                      if(result){
                      return res.status(200).json({
                          success: true,
                          error: false,
                          message: 'Successfully deleted vehicle data.'
                      });
                    }else{
                        return res.status(200).json({
                            success: false,
                            error: true,
                            message: 'Something went wrong!'
                        });  
                    }

        }else{
            return res.status(500).json({
                success: false,
                error: true,
                message: 'No one Vehicle found!'
            }) 
        }
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Vehicle id not found!'
    }) 
}
}


controller.vehicle_view  = async (req, res) => {
    let {id} = req.params;
    var result = await Vehicle.getById({id:id});
    return res.status(200).json({
        success: true,
        data:result,
        error: false,
        message: 'Successfully fetched vehicle data.'
    })
}


/**********MODIFY URL***************/
function urlData(link){
const pieces = link.split('/');
const last = pieces[pieces.length - 1]
return last;
}

function diffArray(arr1, arr2) {
    return arr1
      .concat(arr2)
      .filter(item => !arr1.includes(item) || !arr2.includes(item));
  }

module.exports = controller;