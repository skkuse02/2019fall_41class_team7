

(function () {
	var upload_form = document.getElementById('upload-form');
    var input_title = document.getElementById('input-title');
    var input_select1 = document.getElementById('input-select1');
    var input_select2 = document.getElementById('input-select2');
    var input_price = document.getElementById('input-price');
    var input_content = document.getElementById('input-content');
    var fileInput = document.getElementById("input-file");
    var videoInput = document.getElementById("input-video");
    var storageRef = firebase.storage().ref();
  //var databaseRef = firebase.database().ref();
	var video;
	var video_url;
    var fileList = [];
    var img_urlList=[];

  /*var formData = {
    "title": input_title.value,
    "category": input_select1.value,
    "region": input_select2.value,
    "price": input_price.value,
    "content": input_content.value,
    "file": img_urlList,
  };*/

upload_form.addEventListener('submit', function (evnt, callback) {
        evnt.preventDefault();
    //이미지와 동영상 storage에 업로드
    var formData = {
      "title": input_title.value,
      "category": input_select1.value,
      "region": input_select2.value,
      "price": input_price.value,
      "content": input_content.value,
      "image":img_urlList,
      "user":user_name,
      "status": '0',
    };

    if(input_title.value=="")
        alert("No Title!");
    else if(input_select1.value==0)
        alert("No Category!");
    else if(input_select2.value==0)
        alert("No Region!");
    else if(input_price.value=="")
        alert("No Price!");
    else if(fileList[0]==undefined)
        alert("No Image!");
    else if(input_content.value=="")
        alert("No Content!");
    else {
        let wait_div = document.getElementById("wait-upload");
        wait_div.innerHTML = "<p>uploading, please wait..."
        for (var i = 0; i < fileList.length; i++) {
            console.log(fileList.length);
            storageRef.child('image/' + fileList[i].name).put(fileList[i]).then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(function (url) {
                    // console.log('Uploaded a blob or file!',img_urlList);
                    img_urlList.push(url);
                    console.log(img_urlList);
                    //   console.log( img_urlList.length );

                    if (img_urlList.length == i) {
                        if (video == undefined) {
                            console.log('undefined!');
                            firebase.database().ref('/Product').push(formData);
                            firebase.database().ref('/users/'+userid).push(formData);
                            setTimeout(function () {
                                window.location.href = '/product/';
                            }, 5000);
                        } else {
                            console.log('there is video!');
                            storageRef.child('video/' + video.name).put(video).then(function (snapshot2) {
                                console.log('videosubmit2');
                                snapshot2.ref.getDownloadURL().then(function (url2) {
                                    //   video_url=url2;
                                    formData["video"] = url2;
                                    //   console.log('videosubmit3', formData);
                                    firebase.database().ref('/Product').push(formData);
                                    firebase.database().ref('/users/'+userid).push(formData);
                                    setTimeout(function () {
                                window.location.href = '/product/';
                            }, 5000);
                                });
                            });
                        }
                    }
                    //   firebase.database().ref('/Product').push( formData );
                });
            });
            // downloadURL에 올린 파일에 대한 downloadurl값이 저장
        }
    }
  //  firebase.initializeApp(config); //Initialize your firebase here passing your firebase account config object
  //  firebase.database().ref('/Product').push( formData );
});

  fileInput.addEventListener('change', function (evnt) {
 		fileList = [];
  //  fileList=this.fileList;
  //    console.log('Uploaded a blob or file!',this.fileList[0]);
  	for (var i = 0; i < fileInput.files.length; i++) {
    	fileList.push(fileInput.files[i]);
    }
  });

  	videoInput.addEventListener('change', function (evnt) {
	//	console.log('videoupload');
			video=this.files[0];
	//		console.log('hi',video.name);
  //  fileList=this.fileList;

  });

/*  renderFileList = function () {
  	fileListDisplay.innerHTML = '';
    fileList.forEach(function (file, index) {
    	var fileDisplayEl = document.createElement('p');
      fileDisplayEl.innerHTML = (index + 1) + ': ' + file.name;
      fileListDisplay.appendChild(fileDisplayEl);
    });
  };*/


})();
