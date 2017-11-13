    'use strict';
    var app = angular.module('shopcart', ['angular-storage','angularPayments']);
    app.config(['storeProvider', function(storeProvider) {
        storeProvider.setStore('sessionStorage');

    }]);

   app.controller('productCtrl', function($scope, $http,$window) {

      $scope.init = function() {
              

              $http.get(baseurl + 'get-data/').success(function (res) {
                        if (res.status == 'false') {

                        }else {

                         // console.log(res);

                          $scope.products = res ;
                          console.log($scope.products)
                        }
                    }).error(function () {
                    });
          }

    

     });

    app.controller('orderCtrl', function($scope, $http,$window,$location ,$sce, $timeout, store) {
      $window.Stripe.setPublishableKey('pk_test_lTp89fhcIMVEFL2HSVRqJTHO');
      //$window.Stripe.setPublishableKey('pk_live_325verdKtnzQhpKw10fVcXSU');

      $scope.redirect = function () {
        console.log("redirect");
        location.href='index.html';
      }

      $scope.bankorder = function(){

          //  console.log("bank order called");
          //  console.log('qty' , $scope.data.qty);
          //  console.log('Address2', $scope.data.orderaddress2);
          //  console.log('price' ,$scope.data.productprice);
          //  console.log('totalprice' ,$scope.data.totalprice);
          //  console.log('Name',$scope.data.ordername);
          //  console.log('Email', $scope.data.orderemail);
          //  console.log('Phone', $scope.data.orderphone);
          //  console.log('Address1', $scope.data.orderaddress1);
          //  console.log('Address2', $scope.data.orderaddress2);
          //  console.log('Address2', $scope.data.paymenttype);
          //  console.log('Message', $scope.data.ordermessage);
          //  console.log('Order Terms', $scope.data.orderterms);

           console.log($scope.data);
            $http.post(baseurl + 'addbankorder/',$scope.data).success(function(res) {
               $scope.response = res;
              //  console.log(res);
                if (res.status == 'false') {
                  alert(res.message);
                } else {
                  alert(res.message);
                  $("#orderform").hide();
                  $("#preview").hide();
                  $("#thankyou").show();
                  //$location.path("/Cart");
                }
              }).error(function() {
                    // alert("Please check your internet connection or data source..");
              });
           /*$http.post(baseurl + 'addbankorder/',$scope.data)
                .success(function(res) {
                  //console.log(res);
                  $scope.redirect();
                })
                .error(function() {
                  alert("Please check your internet connection or data source..");
                  });*/


      }

      $scope.stripeCallback = function (code, result) {

          if (result.error) {
              //window.alert('it failed! error: ' + result.error.message);
                $scope.paymessage = result.error.message ;
                $scope.transactionid = result.id ;
                console.log("Error");
                console.log('Name',$scope.ordername);
                console.log('Email', $scope.orderemail);
                console.log('Phone', $scope.orderphone);
                console.log('Address1', $scope.orderaddress1);
                console.log('Address2', $scope.orderaddress2);
                console.log('PostalCode', $scope.orderpostalcode);
                console.log('ProductName' ,$scope.productname);
                console.log('price' ,$scope.productprice);
                console.log('qty' , $scope.qty);
                console.log('deliverycharge' ,$scope.deliverycharge);
                console.log('price' ,$scope.productprice);
                console.log('totalprice' ,$scope.totalprice);
                $("#orderform").hide();
                $("#payform").show();
                $("#thankyou").hide();

          } else {
              //window.alert('success! token: ' + result.id);
                $scope.message = "Card Successfully Approved."
                $scope.data.stripeToken = result.id ;
                $scope.paymessage = $scope.message ;
                $("#orderform").hide("slow");
                $("#payform").hide("slow");
                $("#thankyou").show("slow");
                console.log('qty' , $scope.data.qty);
                console.log('deliverycharge' ,$scope.data.deliverycharge);
                console.log('price' ,$scope.data.productprice);
                console.log('totalprice' ,$scope.data.totalprice);
                console.log('Name',$scope.data.ordername);
                console.log('Email', $scope.data.orderemail);
                console.log('Phone', $scope.data.orderphone);
                console.log('Address1', $scope.data.orderaddress1);
                console.log('Address2', $scope.data.orderaddress2);
                console.log('PostalCode', $scope.data.orderpostalcode);



                console.log($scope.data);
                $http.post(baseurl + 'addorder/',$scope.data).success(function(res) {
                  $scope.response = res;
                //  console.log(res);
                  if (res.status == 'false') {
                    alert(res.message);
                  } else {
                    alert(res.message);
                    //$location.path("/Cart");
                  }
                }).error(function() {
                      // alert("Please check your internet connection or data source..");
                });
                /*$http.post(baseurl + 'addorder',$scope.data).success(function(res) {
          				$scope.response = res;
          				console.log(res);
          				if (res.status == 'false') {
          					alert(res.message);
          				} else {
          					alert(res.message);
          					//$location.path("/Cart");
          				}
          			}).error(function() {
          				    // alert("Please check your internet connection or data source..");
          			});*/



          }

      };

        $scope.order = function(){
             $("#alertmessage").hide();
             $scope.formvalidate ="true" ;
             console.log("order called");
             console.log('qty' , $scope.data.qty);
             console.log('Address2', $scope.data.orderaddress2);
             console.log('price' ,$scope.data.productprice);
             console.log('totalprice' ,$scope.data.totalprice);
             console.log('Name',$scope.data.ordername);
             console.log('Email', $scope.data.orderemail);
             console.log('Phone', $scope.data.orderphone);
             console.log('Address1', $scope.data.orderaddress1);
             console.log('Address2', $scope.data.orderaddress2);
             console.log('Address2', $scope.data.paymenttype);
             console.log('Message', $scope.data.ordermessage);
             console.log('Order Terms', $scope.data.orderterms);
             console.log('Schedule Delivery', $scope.data.schedule);

             if(typeof $scope.data.ordername === 'undefined'){
               console.log("ordername is null");
              $scope.formvalidate ="false" ;
               $scope.alertmessage="Name should not be empty";
               $("#alertmessage").show('slow');
             }
             else if(typeof $scope.data.orderemail === 'undefined'){
               console.log("Order Email is null");
               $scope.formvalidate ="false" ;
               $scope.alertmessage="Email should not be empty";
               $("#alertmessage").show('slow');
             }
             else if(typeof $scope.data.orderphone === 'undefined'){
               console.log("Order Phone is null");
               $scope.formvalidate ="false" ;
               $scope.alertmessage="Phone Number should not be empty";
                  $("#alertmessage").show('slow');
             }
             else if(typeof $scope.data.orderaddress1 === 'undefined'){
               console.log("Address Field is null");
               $scope.formvalidate ="false" ;
               $scope.alertmessage="Address should not be empty";
                  $("#alertmessage").show('slow');
             }
             else if(typeof $scope.data.orderaddress2 === 'undefined'){
               console.log("Address2 is null");
               $scope.formvalidate ="false" ;
               $scope.alertmessage="Address-2 should not be empty";
                  $("#alertmessage").show('slow');
             }
             else if(typeof $scope.data.orderpostalcode === 'undefined'){
               console.log("Postalcode is null");
               $scope.formvalidate ="false" ;
               $scope.alertmessage="Postalcode should not be empty";
                   $("#alertmessage").show('slow');
             }
             else if($scope.data.orderterms === 'false'){
               console.log("Terms is not checked");
               $scope.formvalidate ="false" ;
               $scope.alertmessage="Terms should be Selected";
                   $("#alertmessage").show('slow');
             }
             if($scope.formvalidate=="true"){
                 if($scope.data.paymenttype=="Bank Transfer"){
                  console.log($scope.data.paymenttype);
                   $("#orderform").hide();
                   $("#preview").show();
                   $("#payform").hide();
                   $("#thankyou").hide();
                }else {
                  $("#orderform").hide();
                  $("#payform").show("slow");
                  $("#thankyou").hide();
                   $("#preview").hide();
                }

             }


        }

        $scope.calculate = function (){
            console.log('qty', $scope.data.qty)
            $scope.data.deliverycharge = 0 ;
            $scope.data.schedulecharge = 0 ;
            $scope.data.totalprice = 0 ;
            $scope.data.productprice = 15 ;
             if($scope.data.qty<=4){ 
              $scope.data.deliverycharge = 10 ; 
            } 
 
            /*if($scope.data.schedule!=="0"){ 
              $scope.data.schedulecharge = 2 ; 
            } */
            $scope.data.itemprice = $scope.data.qty*$scope.data.productprice;
            $scope.data.totalprice = $scope.data.itemprice+$scope.data.deliverycharge;
            //$scope.data.totalprice = $scope.data.itemprice+$scope.data.deliverycharge+$scope.data.schedulecharge ;
            console.log('totalprice',$scope.data.totalprice);
          }

          $scope.init = function() {

              $scope.data = {};
              $scope.data.productname = "Cupcake";
              $scope.data.qty ="1" ;
              $scope.data.productprice = 15 ;

              var url = window.location.href;
               // console.log(url);
                var parts = url.split("?");
              if(parts.length>0){
                   var urlparams = parts[1];
                   var urlpart = urlparams.split('&');
                   var productId = urlpart[0].split('=');
  
                    $scope.productId= productId[1];
                    $http.get(baseurl + 'get-product-data/'+$scope.productId).success(function (res) {
                        if (res.status == 'false') {
                        }else {

                          //console.log(res.productId);
                          $scope.data.productname = res.productName;
                          $scope.data.qty = 2;
                          $scope.data.productprice = res.productPrice ;
                           
                        }
                    }).error(function () {
                    });
              }

             
              $scope.data.paymenttype = "Credit Card";
              $scope.data.deliverycharge = 10 ;              
              $scope.data.totalprice = ($scope.data.productprice*$scope.data.qty)+$scope.data.deliverycharge ;              
              $scope.data.productsku = "0001";
              $scope.data.schedule = "0"
              $scope.data.schedulecharge = "0" ;
              $scope.data.orderterms ="false" ;
              $scope.data.itemprice = $scope.data.productprice*1 ;
              w3IncludeHTML();
              $("#payform").hide();
              $("#thankyou").hide();
              $("#preview").hide();
              $("#alertmessage").hide();
          }

        
          //var baseurl = "http://localhost:5000/api/" ;
          //var baseurl = "http://128.199.230.90:5000/api/" ;
    });

  if (document.location.hostname == "shelly.80startups.com")
          {
            var baseurl = "https://shelly.80startups.com/api/";
            app.config(['storeProvider', function (storeProvider) {
              storeProvider.setStore('sessionStorage');
            }]);

          }else{

            var baseurl = "http://localhost:6005/api/";
            //var baseurl = "http://crm.fountaintechies.com/api/";
            app.config(['storeProvider', function (storeProvider) {
              storeProvider.setStore('sessionStorage');
            }]);
          }