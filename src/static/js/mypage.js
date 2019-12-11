var product;
var title;

console.log(user_name);


function gotoView(index){
  index = index.replace('<br><br>','');
  location.href = '/product/info/?'+':'+ index;
}

function changeStatus(t){
  var updates = {};
  updates['Product/'+t+'/status'] = "2";
  firebase.database().ref().update(updates);
  window.location.reload();
}

function startTransfer(product_code){
  var buyer;
  var seller;
  var chat_title1;
  var chat_title2;
  var vDate = new Date();
  var MM = (vDate.getMonth() + 1).toString();
  var dd = vDate.getDate().toString();
  var HH = vDate.getHours().toString();
  var mm = vDate.getMinutes().toString();
  var time = (MM[1] ? MM : '0'+MM[0]) + (dd[1] ? dd : '0'+dd[0]) + (HH[1] ? HH : '0'+ HH[0]) + (mm[1] ? mm : '0'+ mm[0]);
  var time_str = vDate.getHours() + ':' + vDate.getMinutes() + '  |  ' + (vDate.getMonth()+1) + '/' + vDate.getDate();

  var content_num = 0;

  var loop_num = 0;
  var update_num = 0;
  firebase.database().ref('Product/'+product_code).once('value',function(data){
    buyer = data.val()['buyer'];
    seller = data.val()['user'];
    chat_title1 = 'Notice' + ':' + buyer;
    chat_title2 = buyer + ':' + 'Notice';
  });
  firebase.database().ref('Messenger/').once('value', function(data){
    if(Object.keys(data.val()).includes(chat_title1) == true){
        console.log(1);
        firebase.database().ref('Messenger/' + chat_title1 + '/').once('value',function(sec_data){
          content_num = Object.keys(sec_data.val()).length;
          firebase.database().ref('Messenger/' + chat_title1 + '/' + (content_num-1) + '/').set({
              'content': seller + '가 물품 배송을 시작했습니다.',
              'time': time_str,
              'username': 'Notice'
          });
        });
    }
    else if(Object.keys(data.val()).includes(chat_title2) == true){
      console.log(2);
      firebase.database().ref('Messenger/' + chat_title2 + '/').once('value',function(sec_data){
         content_num = Object.keys(sec_data.val()).length;
         firebase.database().ref('Messenger/' + chat_title2 + '/' + (content_num-1) + '/').set({
            'content': seller + '가 물품 배송을 시작했습니다.',
            'time': time_str,
            'username': 'Notice'
         });
      });
    }
    else{
        console.log(3);
        if(loop_num == 0){
          firebase.database().ref('Messenger'+'/'+chat_title1+'/').set({
              'recent' : time
          });
          firebase.database().ref('Messenger'+'/'+chat_title1+'/'+content_num+'/').set({
              'content': seller + '가 물품 배송을 시작했습니다.',
              'time': time_str,
              'username': 'Notice'
          });
          loop_num = loop_num + 1;
        }
    }
 })
}

function showDetail(length){

  var product_list = document.getElementById('tab1');
  var info1 = "";
  var info2 = "";
  var info3 = "";

  console.log(product);
  info1 += '<div class="products-slick1" data-nav="#slick-nav-1">'
  info2 += '<div class="products-slick2" data-nav="#slick-nav-2">'
  info3 += '<div class="products-slick3" data-nav="#slick-nav-3">'
  for (var i = 0; i < length; i++) {
    var info = "";
    info += '<div class = "product">';
    info += '<div class = "product-img">'
    info += '<img src = "' + product[i].image[Object.keys(product[i].image)[0]] + '" style = "height: 250px; width: 250px;" onclick="gotoView(\''+ title[i] +'\')";>'
    info += '</div>'
    info += '<div class = "product-body">'
    info += '<h3 class = "product-name"><a href="#">' + product[i].title + '</a><h3>'
    if(product[i].buyer == user_name){
      if(product[i].status == '1'){
        info2 += info;
        info2 += '<div class="product-btns"><a href="#"><button class="primary-btn cta-btn" onclick ="changeStatus(\''+ title[i] +'\')">구매 확정</button></a></div></div></div>';
      }
      else if(product[i].status == '2'){
        info3 += info;
        info3 += '</div></div>'
      }
    }
    else if(product[i].user == user_name){
      if(product[i].status == '0'){
        info1 += info;
        info1 += '<div class="product-btns"><a href="#"><button class="primary-btn cta-btn" onclick ="changeStatus(\''+ title[i] +'\')">판매 완료</button></a></div></div></div>';
      }
      else if(product[i].status == '1'){
        info2 += info;
        info2 += '<div class="product-btns"><a href="#"><button class="primary-btn cta-btn" onclick ="startTransfer(\''+ title[i] +'\')">배송 시작</button></a></div></div></div>';
      }
      else if(product[i].status == '2'){
        info3 += info;
        info3 += '</div></div>'
      }
     }
 }

  info1 += '</div><div id="slick-nav-1" class="products-slick-nav"></div>'
  info2 += '</div><div id="slick-nav-2" class="products-slick-nav"></div>'
  info3 += '</div><div id="slick-nav-3" class="products-slick-nav"></div>'
  console.log(info3);

  $("#tab1").append(info1);
  $("#tab2").append(info2);
  $("#tab3").append(info3);

  $(".products-slick1").each(function() {
    var $this = $(this),
      $nav = $this.attr("data-nav");

    $this.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });

  $(".products-slick2").each(function() {
    var $this = $(this),
      $nav = $this.attr("data-nav");

    $this.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });

  $(".products-slick3").each(function() {
    var $this = $(this),
      $nav = $this.attr("data-nav");

    $this.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });
}

$(function(){
  product = new Array();
  title = new Array();
  var ind = 0;
  var length = 0;

    var database = firebase.database().ref().child('Product');
    //var db_ref = database.orderByChild('user').equalTo(user_name);
    database.once('value', function(data){
      console.log(Object.keys(data.val()));
      length = Object.keys(data.val()).length;
      title = Object.keys(data.val());
      data.forEach(function(childData){
        product[ind] = childData.val();
        ind = ind + 1;
      });
      showDetail(length)
    });
});
