
var mysql =require('mysql');
var crud = require('mysql-crud');
var stripe = require("stripe")("sk_live_FvtQkUHNa6GWDL2JlOqt9meI");//sk_live_QuflwPmAKaZMJoZAogwEJlY2 //sk_test_y0BiTcY7tiFEIWTrOggOGKVY
var db = require('./database');
var CRUD = require('mysql-crud');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var orderCRUD = CRUD(db, 'orders');


var transporter = nodemailer.createTransport( {
    host: 'in-v3.mailjet.com',
    port: '587',
    auth: {
      user: '66ca4479851e0bd9cedc629bdff36ee6',
      pass: 'a3ec60f55a89f7fab98891e86818c8db'
    }
  } );



function send_mail( usermail, subject, mailbody ) {
    // var mailOptions = {
    //   from: '<operations@80startups.com>', // sender address
    //   to: usermail, // list of receivers
    //   subject: subject, // Subject line
    //   html: mailbody // html body
    // };
    //
    //
    // transporter.sendMail( mailOptions, function ( error, info ) {
    //   if ( error ) {
    //     console.log( error );
    //   } else {
    //     console.log( 'Message sent: ' + info.response );
    //   }
    //   //jsonp(response);
    // } );


          var auth = {
            auth: {
              api_key: 'key-b4687b67307cb2598abad76006bd7a4a',
              domain: '80startups.com'
            }
          }

          var nodemailerMailgun = nodemailer.createTransport(mg(auth));

          nodemailerMailgun.sendMail({
            from: 'operations@80startups.com',
            to: usermail, // An array if you have multiple recipients.
            subject: subject,
            'h:Reply-To': 'operations@80startups.com',
            //You can use "html:" to send HTML email content. It's magic!
            html: mailbody,
            //You can use "text:" to send plain-text content. It's oldschool!
            text: mailbody
          }, function (err, info) {
            if (err) {
              console.log('Error: ' + err);
            }
            else {
              console.log('Response: ' + info);
            }
          });





  };




exports.addorder = function(req, res){
        //console.log(req.body);
        var token = req.body.stripeToken;
        var amount = req.body.totalprice ;
        var stripeToken = "" ;
        amount = amount*100 ;
        var data = req.body ;
        // Charge the user's card:
        var charge = stripe.charges.create({
          amount: amount,
          currency: "sgd",
          description: data.ordername,
          source: token
        }, function(err, charge) {
          // asynchronously called
        //  console.log('err',err);
            if(!err){
              //  console.log('charge',charge);
                stripetoken = charge.id ;
                orderCRUD.create({
                  ordername:data.ordername,
                  orderemail:data.orderemail,
                  orderphone: data.orderphone,
                  orderaddress1: data.orderaddress1,
                  orderaddress2: data.orderaddress2,
                  orderpostalcode: data.orderpostalcode,
                  qty:data.qty,
                  productprice: data.productprice,
                  deliverycharge: data.deliverycharge,
                  totalprice: data.totalprice,
                  productname: data.productname,
                  productsku: data.productsku,
                  status: "Approved",
                  stripeToken: stripetoken,
                  paymenttype: data.paymenttype,
                  schedule: data.schedule,
                 }, function (err, vals) {
                  //mysql callback
                        if(err){
                          //console.log(err);
                        }else{

                            console.log('return',vals.insertId) ;

                             var delivery = "";

                            if(data.schedule == 0){
                              delivery = "Standard - 900hrs -2200hrs";
                            }else if(data.schedule == 1){
                              delivery = "Slot A (09:00 - 12:00)";
                            }else if(data.schedule == 2){
                              delivery = "Slot B (12:00 - 15:00)";
                            }else if(data.schedule == 3){
                            delivery = "Slot C (15:00 - 18:00)";
                            }else{
                              delivery = "Slot D (18:00 - 22:00)";
                            }

                            var orderID = vals.insertId ;
                            var agentemail = "ceo@80startups.com";
                            var officeremail = "shital.talole@fountaintechies.com";
                            var subject = "New Order - "+orderID;
                            var mailbody = "Hello,</br><p>New Order  : </p>"


                             + "<p></br><p><b> Name: </b> " + data.ordername + "</p>"
                             + "</br><p><b> Email:</b> " + data.orderemail + "</p>"
                             + "</br><p><b> Phone: </b> " + data.orderphone + "</p>"
                             + "</br><p><b> Address 1:</b> " + data.orderaddress1 + "</p>"
                             + "</br><p><b> Address 2:</b> " + data.orderaddress2 + "</p>"
                             + "</br><p><b> Postal Code:</b> " + data.orderpostalcode + "</p>"
                             + "</br><p><b> Product :</b> " + data.productname + "</p>"
                             + "</br><p><b> Qty :</b> " + data.qty + " Tray</p>"
                             + "</br><p><b> Product Price:</b> " + data.productprice + "</p>"
                             + "</br><p><b> Delivery Charge:</b> " + data.deliverycharge + "</p>"
                             + "</br><p><b> Delivery Charge:</b> " + data.deliverycharge + "</p>"
                             + "</br><p><b> Total Price:</b> SGD " + data.totalprice + "</p>"
                             + "</br><p><b> Payment Type:</b> " +  data.paymenttype + "</p>"
                             + "</br><p><b> Schedule Delivery:</b> " +  delivery + "</p>"

                             + "<p></br><p><b></p>"
                             + "</br><p><b> Token:</b> " + stripetoken + "</p>"
                             + "Thanks, Shelley Cupcakes";

                             send_mail( agentemail, subject, mailbody );
                             send_mail( officeremail, subject, mailbody );
                             send_mail( data.orderemail, subject, mailbody );
                             //mail to ordering customer
                             //send_mail( data.orderemail, subject, mailbody );

                        }

                  });
            }else{
                  console.log('err',err);
                }

        });


        // Send an email






};

exports.addbankorder = function(req, res){
      console.log(req.body);
      var data = req.body ;
            orderCRUD.create({
              ordername:data.ordername,
              orderemail:data.orderemail,
              orderphone: data.orderphone,
              orderaddress1: data.orderaddress1,
              orderaddress2: data.orderaddress2,
              orderpostalcode: data.orderpostalcode,
              qty:data.qty,
              productprice: data.productprice,
              deliverycharge: data.deliverycharge,
              totalprice: data.totalprice,
              productname: data.productname,
              productsku: data.productsku,
              status: "Pending",
              paymenttype: data.paymenttype,
              message: data.ordermessage,
              schedule: data.schedule,
             }, function (err, vals) {
              //mysql callback
                    if(err){
                      //console.log(err);
                      return res.send(err);
                    }else{
                        console.log('return',vals.insertId) ;

                        var delivery = "";

                        if(data.schedule == 0){
                          delivery = "Standard - 900hrs -2200hrs";
                        }else if(data.schedule == 1){
                          delivery = "Slot A (09:00 - 12:00)";
                        }else if(data.schedule == 2){
                          delivery = "Slot B (12:00 - 15:00)";
                        }else if(data.schedule == 3){
                         delivery = "Slot C (15:00 - 18:00)";
                        }else{
                          delivery = "Slot D (18:00 - 22:00)";
                        }

                        var orderID = vals.insertId ;
                        var agentemail = "ceo@80startups.com";
                        var officeremail = "shital.talole@fountaintechies.com";
                        var subject = "New Order - "+orderID;
                        var mailbody = "Hello,</br><p>New Order  : </p>"



                         + "</br><p><b> Name: </b> " + data.ordername + "</p>"
                         + "</br><p><b> Email:</b> " + data.orderemail + "</p>"
                         + "</br><p><b> Phone: </b> " + data.orderphone + "</p>"
                         + "</br><p><b> Address 1:</b> " + data.orderaddress1 + "</p>"
                         + "</br><p><b> Address 2:</b> " + data.orderaddress2 + "</p>"
                         + "</br><p><b> Postal Code:</b> " + data.orderpostalcode + "</p>"
                         + "</br><p><b> Product :</b> " + data.productname + "</p>"
                         + "</br><p><b> Qty :</b> " + data.qty + "</p>"
                         + "</br><p><b> Product Price:</b> " + data.productprice + "</p>"
                         + "</br><p><b> Delivery Charge:</b> " + data.deliverycharge + "</p>"
                         + "</br><p><b> Total Price:</b> " + data.totalprice + "</p>"
                         + "</br><p><b> Payment Type:</b> " +  data.paymenttype + "</p>"
                         + "</br><p><b> Schedule Delivery:</b> " +  delivery + "</p>"

                         + "</br><p><b></p>"
                         + "</br><p><b> Bank Details:</b></p>"
                         + "</br><p><b> Name :</b> OM SAI</p>"
                         + "</br><p><b> Bank :OCBC Current Account</p>"
                         + "</br><p><b> Account Number :695846543001</p>"
                         + "</br><p><b> Remark - [ Order ID ]  :" +  orderID + "</p>"
                         + "Thanks, Desibites";

                         send_mail( agentemail, subject, mailbody );
                         send_mail( officeremail, subject, mailbody );
                         send_mail( data.orderemail, subject, mailbody );


                    }
                    res.send("success");

              });




};

exports.gethi = function(req, res){
        console.log("gethi");
        console.log(req.body);
};

exports.getdata = function(req, res){
    
    var sql = "SELECT * FROM `tbl_products`";
    console.log(sql);
    db.query(sql, function (err, data) {

        //console.log(data);
        res.json(data);
    });

};


exports.getproductdata = function(req, res){
   
    //console.log(req.params.id); 
    productId = req.params.id ;
    var sql = "SELECT * FROM `tbl_products` where productId = "+productId;
    console.log(sql);
    db.query(sql, function (err, data) {

        //console.log(data);
        res.json(data[0]);
    });

};
