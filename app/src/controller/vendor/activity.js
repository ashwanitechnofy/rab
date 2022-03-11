const ActivityService = require("../../service/activity");
const CommentService = require("../../service/comments");
const CategoryService = require("../../service/category");
const activityListDateService = require("../../service/activity_list_dates");
const activityOtherService = require("../../service/activity_other_details");
const ActivityAddOnService = require("../../service/activity_add_ons");
const fs = require("fs");

const Activity = new ActivityService();
const Comments = new CommentService();
const Category = new CategoryService();
const ActivityOther = new activityOtherService();
const ActivityListDate = new activityListDateService();
const ActivityAddOns = new ActivityAddOnService();
let statusCol = ['deactive','active'];

let controller = {};


controller.add_activity_comment  = async (req, res) => {
    try{
        const {activity_id} = req.body;
        if(activity_id){
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
        message: 'Activity id field not found!.'
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


controller.getAList  = async (req, res) => {
    let {category_id,id} = req.body; let param;
    if(!category_id)
    category_id = await Category.firstCategoryId();
    if(!id)
 param = {user_id:req.user_id,category_id:category_id}
 else
 param = {id:{$lt:id},user_id:req.user_id,category_id:category_id}
    var result = await Activity.getAll(param);

    return res.status(200).json({
        success: true,
        data:result,
        error: false,
        message: 'Successfully fetched Activity data.'
    })
}


controller.activity_add = async (req, res) => {
    try {
        const {items,start} = req.body;
        req.body.user_id = req.user_id;
       var arr = [];
       if (req.files && Object.keys(req.files).length && req.files.v_images && Object.keys(req.files.v_images).length) {
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
    let result = await Activity.register(req.body);
    if(result){
        req.body.activity_id = result.id;
        await ActivityOther.register(req.body);
        if(start && start.length){
            let ends = req.body.end;
    await start.forEach(async (val,index) => {
        req.body.start = val;
        req.body.end = ends[index];
     await ActivityListDate.register(req.body);
        });
    }

    if(items && items.length){
        await items.forEach(async val => {
            req.body.item = val.name;
            req.body.price = val.price;
            await ActivityAddOns.register(req.body);
        });
        } 
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Successfully added Activity!'
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

controller.activity_view  = async (req, res) => {
    let {id} = req.params;
    var result = await Activity.getById({id:id});
    return res.status(200).json({
        success: true,
        data:result,
        error: false,
        message: 'Successfully fetched activity data.'
    })
}

controller.change_activity_status  = async (req, res) => {
    let {id} = req.params;
    let {status} = req.body;

    if(id && status){
    var result = await Activity.getOne({id:id,user_id:req.user_id});
    if(result){
        let st = await statusCol.indexOf(status.toLowerCase());
        var update = await Activity.update({status:st.toString()},{id:id});
     if(update){
    return res.status(200).json({
        success: true,
        error: false,
        message: 'Successfully changed the activity status.'
    });
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Activity not found!'
    });
}
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Activity not found!'
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

controller.activity_delete  = async (req, res) => {
    let {id} = req.params;
    if(id){
        var other = await ActivityOther.getOne({activity_id:req.params.id});
        if(other){
         if(other.v_images && other.v_images.length){
            await deletedOne.forEach( async(item)=>{
                item =await urlData(item);
            await fs.unlink('app/assets/image/activity/' + item, (err) => {
                      if (err)
                      console.log('for save image get error', err);
                      });
           });
          }

         if(other.h_images && other.h_images.length){
            await other.h_images.forEach( async(item)=>{
                item =await urlData(item);
            await fs.unlink('app/assets/image/activity/' + item, (err) => {
                      if (err)
                      console.log('for save image get error', err);
                      });
           });
          }
                      var result = await Activity.delete(id);
                      if(result){
                      return res.status(200).json({
                          success: true,
                          error: false,
                          message: 'Successfully deleted activity data.'
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
                message: 'No one activity found!'
            }) 
        }
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Activity id not found!'
    }) 
}
}

controller.activity_edit = async (req, res) => {
    try {
        const {items,start,deletedImg_h,deletedImg_v} = req.body;
        req.body.user_id = req.user_id;
        const {id} = req.params;
        if(id){
        let result = await Activity.getOne({id:id});
        if(result){
        
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
     result = await Activity.update(req.body,{id:id});
    if(result){
        if(deletedImg_v && deletedImg_v.length){
            await deletedImg_v.forEach( async(item)=>{
            await fs.unlink('app/assets/image/activity/' + item, (err) => {
                      if (err)
                      console.log('for save image get error', err);
                      });
           });
          }

          if(deletedImg_h && deletedImg_h.length){
            await deletedImg_h.forEach( async(item)=>{
            await fs.unlink('app/assets/image/activity/' + item, (err) => {
                      if (err)
                      console.log('for save image get error', err);
                      });
           });
          }
          await ActivityListDate.delete({activity_id:id});
          await ActivityAddOns.delete({activity_id:id});

          req.body.activity_id = id;
          await ActivityOther.update(req.body,{id:id});

          if(start && start.length){
            let ends = req.body.end;
    await start.forEach(async (val,index) => {
        req.body.start = val;
        req.body.end = ends[index];
     await ActivityListDate.register(req.body);
        });
    }

    if(items && items.length){
        await items.forEach(async val => {
            req.body.item = val.name;
            req.body.price = val.price;
            await ActivityAddOns.register(req.body);
        });
        } 

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Successfully updated activity!'
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
        message: 'No activity not found!'
    })
}
}else{
    return res.status(500).json({
        success: false,
        data: null,
        error: true,
        message: 'Activity id not found!'
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

module.exports = controller;