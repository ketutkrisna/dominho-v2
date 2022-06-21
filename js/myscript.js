function rubah(angka){
	var reverse = angka.toString().split('').reverse().join(''),
	ribuan = reverse.match(/\d{1,3}/g);
	ribuan = ribuan.join('.').split('').reverse().join('');
	return ribuan;
}

function counterwin(win){
	$('.values').text('');
	const counters = document.querySelectorAll('.values');
	const speed = 1234;
	counters.forEach( counter => {
	   const animate = () => {
	      // const value = +counter.getAttribute('akhir');
	      let value = win;
	      const data = +counter.innerText;
	     
	      const time = value / speed;
	     if(data < value) {
	          counter.innerText = Math.ceil(data + time);
	          setTimeout(animate, 1);
	        }else{
	          counter.innerText = rubah(value);
	        }
	     
	   }
	   
	   animate();
	});
}



$(function(){

	// var dataimages=['<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="5" src="img/item/k.png">',
	// 	'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="12" src="img/item/petasan.png">',
	// 	'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="23" src="img/item/kendang.png">',
	// 	'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="17" src="img/item/liontin.png">',
	// 	'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="8" src="img/item/koin.png">',
	// 	'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="3" src="img/item/q.png">',
	// 	'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="2" src="img/item/j.png">',
	// 	'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="30" src="img/item/bocilping.png">'
	// ];
	var dataimages=['<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="5" src="img/item/k.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="19" src="img/item/kakekbiru.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="9" src="img/item/petasan.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="13" src="img/item/kendang.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="17" src="img/item/bocilijo.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="7" src="img/item/koin.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="3" src="img/item/q.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="11" src="img/item/liontin.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="1" src="img/item/j.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="15" src="img/item/bocilping.png">',
		'<img class="ambiltambahchip" width="100%" height="100%" data-tambahchip="21" src="img/item/kakekmerah.png">'
	];
	var spinawalstop=document.getElementById('spinawal');
	var btnstop=document.getElementById('btnstop');
	var reelstop=document.getElementById('reelstop');
	var csfff=document.getElementById('csfff');
	var soundjp=document.getElementById('soundjp');
	var bigwin=document.getElementById('bigwin');
	var megawin=document.getElementById('megawin');
	var superwin=document.getElementById('superwin');
	var midwin=document.getElementById('midwin');
	var rand1,rand2,rand3;
	var spinkolom1,spinkolom2,spinkolom3;
	var spintunggu;
	var updatechip;
	var bet = 100000;

	function starts(){
		$('#tunggus').hide();
		$('#starts').show();
		$('#stops').hide();
	}
	function tunggus(){
		$('#tunggus').show();
		$('#starts').hide();
		$('#stops').hide();
	}
	function stops(){
		$('#tunggus').hide();
		$('#stops').show();
		$('#starts').hide();
	}

	if(localStorage.getItem('mychip')){

	}else{
		localStorage.setItem('mychip',0);
		tunggus();
	}
	$('.mychip').text(rubah(localStorage.getItem("mychip")));

	if(Number(localStorage.getItem("mychip"))<100000){
		$('.bonus2m').show();
		tunggus();
		$('.changebet').attr('disabled','on');
	}else{
		starts();
		$('.bonus2m').hide();
		$('.changebet').removeAttr('disabled');
	}

	$('.changebet').on('change',function(){
		bet = $('.changebet').val();
		if(Number(localStorage.getItem('mychip'))<100000){
			alert('Chip habis!!!');
			return false;
		}
		if(Number(bet) > Number(localStorage.getItem('mychip'))){
			alert('Turunkan bet anda!!!');
			$('.disablebtn').attr('disabled','on');
			$('#startspin').text('SPIN');
			$('#stopspin').text('STOP');
			$('#tungguspin').text('STOP');
			tunggus();
		}else{
			$('.disablebtn').removeAttr('disabled');
			starts();
		}
	});

	$('.bonus2m').on('click',function(){
		localStorage.setItem("mychip", 2000000);
		$('.disablebtn').removeAttr('disabled');
		starts();
		$('.bonus2m').hide();
		$('.changebet').removeAttr('disabled');
		$('.mychip').text(rubah(localStorage.getItem("mychip")));
	});

	var intervalspin=0;
	var spincount = 0;
	var otomatis=false;
	var jumlahspin;
	var kedip1,kedipawal;
	var item1,item2,item3,item4;
	var stop1,stop2;
	var tambahchip,betkaliitem;
	var updatechips;
	// var item2=false;
	// var delayinterval = 3600;
	function animaterotate(dataimgrotate){
		setTimeout(function() {
			dataimgrotate.addClass('bounce7')
			// dataimgrotate.css({
			// 	'transition':'.7s',
			// 	'transform':'rotateY(180deg) translate(0px,-4px) rotate(15deg)'
			// });
			// setTimeout(function() {
			// dataimgrotate.css({
			// 	'transition':'.3s',
			// 	'transform':'rotateY(-0deg) translate(0px,0px)'
			// });	
			// }, 1000);
		}, 500);
	}

	function spinaja(datacount,datajumlah){
		otomatis=true;
		// jumlahspin = $(this).data('spinotomatis');
		// console.log(datajumlah);
		jumlahspin=datajumlah;
		$('.changebet').attr('disabled','on');
		$('.disablebtn').attr('disabled','on');
		// spincount=$(this).data('spinotomatis');
		spincount=datacount;
		tunggus();
		$('#startspin').click();
		if(jumlahspin != 'unlimited'){
			$('#tungguspin').html('STOP');
			$('#stopspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
		}else{
			$('#tungguspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
			$('#stopspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
		}
		kedip1 = setTimeout(function() {
			stops();
			if(jumlahspin != 'unlimited'){
				$('#tungguspin').html('STOP');
				$('#stopspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
			}else{
				$('#tungguspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
				$('#stopspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
			}
		}, 200);
		kedipawal= setTimeout(function() {
			tunggus();
			if(jumlahspin != 'unlimited'){
				$('#tungguspin').html('STOP');
				$('#stopspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
			}else{
				$('#tungguspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
				$('#stopspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
			}
		}, 2700);
		intervalspin = setInterval(function(){
			$('#startspin').click();
			spincount--;
			if(jumlahspin != 'unlimited'){
				$('#tungguspin').html('STOP');
				$('#stopspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
			}else{
				$('#tungguspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
				$('#stopspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
			}
			if((spincount-1) < 1){
				$('#tungguspin').text('STOP');
				$('#stopspin').text('STOP');
				$('#startspin').text('SPIN');
				otomatis=false;
				clearInterval(intervalspin);
				var timeoutstop = setTimeout(function() {
					starts();
					$('.disablebtn').removeAttr('disabled');
				}, 2500);
			}
		}, 2700)
	}

	$('.spinotomatis').on('click',function(){
		spinaja($(this).data('spinotomatis'),$(this).data('spinotomatis'))
	});


	function room(){
		rand1=Math.floor(Math.random()*11);
		rand2=Math.floor(Math.random()*11);
		rand3=Math.floor(Math.random()*11);
		$('.slot:nth-child(1) .value div').removeClass('spingo'); 
        $('.slot:nth-child(1) .value .hasil1').html(dataimages[rand1]);
        $('.slot:nth-child(2) .value div').removeClass('spingo'); 
       	$('.slot:nth-child(2) .value .hasil2').html(dataimages[rand2]);
       	$('.slot:nth-child(3) .value div').removeClass('spingo'); 
       	$('.slot:nth-child(3) .value .hasil3').html(dataimages[rand3]);
	}

	room();


	$('#startspin').on('click',function(){
		// console.log(spincount-2);
		$('#tungguspin').text('STOP');
		$('.takebonus').text('Semoga Beruntung');
		rand1=Math.floor(Math.random()*11);
		rand2=Math.floor(Math.random()*11);
		rand3=Math.floor(Math.random()*11);
		tunggus();
		if(Number(bet) > Number(localStorage.getItem('mychip'))){
			if((spincount-2)>0){
				clearInterval(intervalspin);
				spincount=0;
				tunggus();
				$('.changebet').removeAttr('disabled');
				$('.disablebtn').attr('disabled','on');
			}else{
				spincount=0;
				tunggus();
				$('.changebet').removeAttr('disabled');
				$('.disablebtn').attr('disabled','on');
			}
			if(Number(localStorage.getItem('mychip'))<100000){
				$('.bonus2m').show();
			}else{
				$('.bonus2m').hide();
			}
				otomatis=false;
				alert('Turunkan bet anda!!!');
				return false;
		}
		if(Number(localStorage.getItem('mychip'))<100000){
			if((spincount-1)>0){
				clearInterval(intervalspin);
				spincount=0;
				tunggus();
				$('.changebet').removeAttr('disabled');
				$('.disablebtn').attr('disabled','on');
			}else{
				spincount=0;
				tunggus();
				$('.changebet').removeAttr('disabled');
				$('.disablebtn').attr('disabled','on');
			}
				otomatis=false;
				$('.bonus2m').show();
				alert('Silahkan ambil Reward 2M anda!!');
				return false;
		}

        if(otomatis==true){

        }else{
			$('#startspin').text('SPIN');
			$('#stopspin').text('STOP');
			$('#tungguspin').text('STOP');
			$('.changebet').attr('disabled','on');
        }
        spintunggu = setTimeout(function() {
		$('#spinawal')[0].play();
        spinawalstop.currentTime = 0;
        	stops();
			$('.value div').addClass('spingo');
			$('.value div').css({
				'animation-play-state':'running',
	            'animation-iteration-count':'100'
	        });
        }, 200);

		spinkolom1 = setTimeout(function() {
			$('#reelstop')[0].play();
            reelstop.currentTime = 0;
           	$('.slot:nth-child(1) .value div').removeClass('spingo'); 
           	$('.slot:nth-child(1) .value .hasil1').html(dataimages[rand1]);
		}, 1000);
		spinkolom2 = setTimeout(function() {
			$('#reelstop')[0].play();
            reelstop.currentTime = 0;
           	$('.slot:nth-child(2) .value div').removeClass('spingo'); 
           	$('.slot:nth-child(2) .value .hasil2').html(dataimages[rand2]);
		}, 1500);
		spinkolom3 = setTimeout(function() {
			if(otomatis == true){
				$('.disablebtn').attr('disabled','on');
			}else{
				starts();
				$('.disablebtn').removeAttr('disabled');
			}
			$('#reelstop')[0].play();
            reelstop.currentTime = 0;
           	$('.slot:nth-child(3) .value div').removeClass('spingo'); 
           	$('.slot:nth-child(3) .value .hasil3').html(dataimages[rand3]);
           	if((spincount-1)>0){
           		$('.changebet').attr('disabled','on');
           	}else{
           		$('.changebet').removeAttr('disabled');
           	}
		}, 2000);
		setTimeout(function() {
			$('.slot:nth-child(1) .value').css('background-color','#04e0dd');
			$('.slot:nth-child(2) .value').css('background-color','#04e0dd');
			$('.slot:nth-child(3) .value').css('background-color','#04e0dd');
		}, 200);

		if(rand1 == rand2 && rand1 == rand3 && rand2 == rand3){
			updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			tunggus();
			item3 = setTimeout(function() {
				$('#csfff')[0].play();
				csfff.currentTime = 0;
				$('.slot:nth-child(1) .value').css('background-color','orange');
				$('.slot:nth-child(2) .value').css('background-color','orange');
				$('.slot:nth-child(3) .value').css('background-color','orange');
	           	tambahchip=$('.hasil2 img').data('tambahchip');
	           	betkaliitem = Number(bet)*7*Number(tambahchip);
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);

				if((betkaliitem/bet) >=7 && (betkaliitem/bet) <=17){
					// bigwin
					$('#soundjp')[0].play();
					animaterotate($('.hasil1 img, .hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#bigwin')[0].play();
						$('.popupbox').fadeIn();
						$('.jakpot').text('JAKPOT');
						$('.oktext').text('BIG');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						// $('.values').attr('akhir','0');
						bigwin.currentTime = 0;
						$('#bigwin')[0].pause();
						$('.jakpot').text('');
						$('.popupbox').fadeOut();
					}, 10000);
				}else if((betkaliitem/bet) >=18 && (betkaliitem/bet) <=35){
					// megawin
					$('#soundjp')[0].play();
					animaterotate($('.hasil1 img, .hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#megawin')[0].play();
						$('.popupbox').fadeIn();
						$('.jakpot').text('JAKPOT');
						$('.oktext').text('MEGA');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						megawin.currentTime = 0;
						$('#megawin')[0].pause();
						$('.jakpot').text('');
						$('.popupbox').fadeOut();
					}, 10000);
				}else if((betkaliitem/bet) >=36){
					// superwin
					$('#soundjp')[0].play();
					animaterotate($('.hasil1 img, .hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#superwin')[0].play();
						$('.popupbox').fadeIn();
						$('.jakpot').text('JAKPOT');
						$('.oktext').text('SUPER');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						superwin.currentTime = 0;
						$('#superwin')[0].pause();
						$('.jakpot').text('');
						$('.popupbox').fadeOut();
					}, 10000);
				}else{
					animaterotate($('.hasil1 img, .hasil2 img, .hasil3 img'));
					tunggus();
	           		$('.takebonus').text(rubah(betkaliitem));
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
				}
			}, 2500);
		}else if(rand1 == rand2){
			updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			tunggus();
			item2 = setTimeout(function() {
				$('#csfff')[0].play();
				csfff.currentTime = 0;
				$('.slot:nth-child(1) .value').css('background-color','orange');
				$('.slot:nth-child(2) .value').css('background-color','orange');
	           	tambahchip=$('.hasil1 img').data('tambahchip');
	           	betkaliitem = Number(bet)*Number(tambahchip);
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);

				if((betkaliitem/bet) >=7 && (betkaliitem/bet) <=17){
					// bigwin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil1 img, .hasil2 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#bigwin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('BIG');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						bigwin.currentTime = 0;
						$('#bigwin')[0].pause();
						$('.popupbox').fadeOut();
					}, 10000);
				}else if((betkaliitem/bet) >=18 && (betkaliitem/bet) <=35){
					// megawin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil1 img, .hasil2 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#megawin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('MEGA');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						megawin.currentTime = 0;
						$('#megawin')[0].pause();
						$('.popupbox').fadeOut();
					}, 10000);
				}else if((betkaliitem/bet) >=36){
					// superwin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil1 img, .hasil2 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#superwin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('SUPER');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						superwin.currentTime = 0;
						$('#superwin')[0].pause();
						$('.popupbox').fadeOut();
					}, 10000);
				}else{
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil1 img, .hasil2 img'));
					tunggus();
	           		$('.takebonus').text(rubah(betkaliitem));
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 2000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 2200);
					}
				}
			}, 2500);
		}else if(rand2 == rand3){
			updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			tunggus();
			item4 = setTimeout(function() {
				$('#csfff')[0].play();
				csfff.currentTime = 0;
				$('.slot:nth-child(2) .value').css('background-color','orange');
				$('.slot:nth-child(3) .value').css('background-color','orange');
				tambahchip=$('.hasil3 img').data('tambahchip');
	           	betkaliitem = Number(bet)*Number(tambahchip);
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);

				if((betkaliitem/bet) >=7 && (betkaliitem/bet) <=17){
					// bigwin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#bigwin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('BIG');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						bigwin.currentTime = 0;
						$('#bigwin')[0].pause();
						$('.popupbox').fadeOut();
					}, 10000);
				}else if((betkaliitem/bet) >=18 && (betkaliitem/bet) <=35){
					// megawin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#megawin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('MEGA');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						megawin.currentTime = 0;
						$('#megawin')[0].pause();
						$('.popupbox').fadeOut();
					}, 10000);
				}else if((betkaliitem/bet) >=36){
					// superwin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 10000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 10200);
					}
					setTimeout(function() {
						$('#superwin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('SUPER');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						superwin.currentTime = 0;
						$('#superwin')[0].pause();
						$('.popupbox').fadeOut();
					}, 10000);
				}else{
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil2 img, .hasil3 img'));
					tunggus();
	           		$('.takebonus').text(rubah(betkaliitem));
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							stops();
							spinaja(spincount-1,jumlahspin);
						}, 2000);
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 2200);
					}
				}
			}, 2500);
		}else{
			updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			tunggus();
			item1 =	setTimeout(function() {
				if(Number(updatechip)<100000){
					clearInterval(intervalspin);
					$('#startspin').text('SPIN');
					$('#stopspin').text('STOP');
					$('#tungguspin').text('STOP');
					otomatis=false;
					spincount=0;
					$('.changebet').attr('disabled','on');
					$('.bonus2m').show();
					tunggus();
				}else{
					if((spincount-1)>0){
						$('.disablebtn').attr('disabled','on');
					}else{
						stop2 = setTimeout(function() {
							starts();
						}, 200);
					}
				}
			}, 2500);
		}
	})

	$('#stopspin').on('click',function(){
		tunggus();
		$('#btnstop')[0].play();
		$('#tungguspin').text('SPIN');
        btnstop.currentTime = 0;
        otomatis=false;
        spincount=0;
        clearInterval(intervalspin);
        clearTimeout(spinkolom1);
        clearTimeout(spinkolom2);
        clearTimeout(spinkolom3);
        clearTimeout(kedip1);
        clearTimeout(kedipawal);
        clearTimeout(spintunggu);
        clearTimeout(item1);
        clearTimeout(item2);
        clearTimeout(item3);
        clearTimeout(item4);
        clearTimeout(stop1);
        clearTimeout(stop2);
        $('.value div').removeClass('spingo');

        
        setTimeout(function() {
		if(rand1 == rand2 && rand1 == rand3 && rand2 == rand3){
			// updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			// localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			// item3 = setTimeout(function() {
				$('#csfff')[0].play();
				csfff.currentTime = 0;
				$('.slot:nth-child(1) .value').css('background-color','orange');
				$('.slot:nth-child(2) .value').css('background-color','orange');
				$('.slot:nth-child(3) .value').css('background-color','orange');
	           	tambahchip=$('.hasil2 img').data('tambahchip');
	           	betkaliitem = Number(bet)*7*Number(tambahchip);
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);
				tunggus();

				if((betkaliitem/bet) >=7 && (betkaliitem/bet/4) <=17){
					// bigwin
					$('#soundjp')[0].play();
					animaterotate($('.hasil1 img, .hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#bigwin')[0].play();
						$('.popupbox').fadeIn();
						$('.jakpot').text('JAKPOT');
						$('.oktext').text('BIG');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						bigwin.currentTime = 0;
						$('#bigwin')[0].pause();
						starts();
						$('.jakpot').text('');
						$('.popupbox').fadeOut();
				        $('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else if((betkaliitem/bet) >=18 && (betkaliitem/bet) <=35){
					// megawin
					$('#soundjp')[0].play();
					animaterotate($('.hasil1 img, .hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#megawin')[0].play();
						$('.popupbox').fadeIn();
						$('.jakpot').text('JAKPOT');
						$('.oktext').text('MEGA');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						megawin.currentTime = 0;
						$('#megawin')[0].pause();
						starts();
						$('.jakpot').text('');
						$('.popupbox').fadeOut();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else if((betkaliitem/bet) >=36){
					// superwin
					$('#soundjp')[0].play();
					animaterotate($('.hasil1 img, .hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#superwin')[0].play();
						$('.popupbox').fadeIn();
						$('.jakpot').text('JAKPOT');
						$('.oktext').text('SUPER');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						superwin.currentTime = 0;
						$('#superwin')[0].pause();
						starts();
						$('.jakpot').text('');
						$('.popupbox').fadeOut();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else{
					animaterotate($('.hasil1 img, .hasil2 img, .hasil3 img'));
					tunggus();
	           		$('.takebonus').text(rubah(betkaliitem));
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 1000);
					// }
					setTimeout(function() {
						starts();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 2000);
				}
			// }, 2500);
		}else if(rand1 == rand2){
			// updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			// localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			// item2 = setTimeout(function() {
				$('#csfff')[0].play();
				csfff.currentTime = 0;
				$('.slot:nth-child(1) .value').css('background-color','orange');
				$('.slot:nth-child(2) .value').css('background-color','orange');
	           	tambahchip=$('.hasil1 img').data('tambahchip');
	           	betkaliitem = Number(bet)*Number(tambahchip);
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);
				tunggus();

				if((betkaliitem/bet) >=7 && (betkaliitem/bet) <=17){
					// bigwin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil1 img, .hasil2 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#bigwin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('BIG');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						bigwin.currentTime = 0;
						$('#bigwin')[0].pause();
						starts();
						$('.popupbox').fadeOut();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else if((betkaliitem/bet) >=18 && (betkaliitem/bet) <=35){
					// megawin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil1 img, .hasil2 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#megawin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('MEGA');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						megawin.currentTime = 0;
						$('#megawin')[0].pause();
						starts();
						$('.popupbox').fadeOut();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else if((betkaliitem/bet) >=36){
					// superwin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil1 img, .hasil2 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#superwin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('SUPER');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						superwin.currentTime = 0;
						$('#superwin')[0].pause();
						starts();
						$('.popupbox').fadeOut();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else{
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil1 img, .hasil2 img'));
					tunggus();
	           		$('.takebonus').text(rubah(betkaliitem));
					// if((spincount-1)>0 && otomatis == true){
						// clearInterval(intervalspin);
						// stop2 = setTimeout(function() {
						// 	spinaja(spincount-1,jumlahspin);
						// }, 1000);
					// }
					setTimeout(function() {
						starts();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 2000);
				}
			// }, 2500);
		}else if(rand2 == rand3){
			// updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			// localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			// item2 = setTimeout(function() {
				$('#csfff')[0].play();
				csfff.currentTime = 0;
				$('.slot:nth-child(2) .value').css('background-color','orange');
				$('.slot:nth-child(3) .value').css('background-color','orange');
	           	tambahchip=$('.hasil3 img').data('tambahchip');
	           	betkaliitem = Number(bet)*Number(tambahchip);
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);
				tunggus();

				if((betkaliitem/bet) >=7 && (betkaliitem/bet) <=17){
					// bigwin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#bigwin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('BIG');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						bigwin.currentTime = 0;
						$('#bigwin')[0].pause();
						starts();
						$('.popupbox').fadeOut();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else if((betkaliitem/bet) >=18 && (betkaliitem/bet) <=35){
					// megawin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#megawin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('MEGA');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						megawin.currentTime = 0;
						$('#megawin')[0].pause();
						starts();
						$('.popupbox').fadeOut();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else if((betkaliitem/bet) >=36){
					// superwin
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil2 img, .hasil3 img'));
					tunggus();
					setTimeout(function() {
						$('.mychip').text(rubah(localStorage.getItem('mychip')));
		           		$('.takebonus').text(rubah(betkaliitem));
					}, 9500);
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 3000);
					// }
					setTimeout(function() {
						$('#superwin')[0].play();
						$('.popupbox').fadeIn();
						$('.oktext').text('SUPER');
						$('.values').text('000');
						setTimeout(function() {
							counterwin(betkaliitem);
						}, 200);
					}, 2500);
					// $('.values').attr('akhir',betkaliitem);
					// $('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						superwin.currentTime = 0;
						$('#superwin')[0].pause();
						starts();
						$('.popupbox').fadeOut();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 10000);
				}else{
					setTimeout(function() {
						$('#midwin')[0].play();
					}, 500);
					animaterotate($('.hasil2 img, .hasil3 img'));
					tunggus();
	           		$('.takebonus').text(rubah(betkaliitem));
					// if((spincount-1)>0 && otomatis == true){
						// clearInterval(intervalspin);
						// stop2 = setTimeout(function() {
						// 	spinaja(spincount-1,jumlahspin);
						// }, 1000);
					// }
					setTimeout(function() {
						starts();
						$('.disablebtn').removeAttr('disabled');
				        $('.changebet').removeAttr('disabled');
					}, 2000);
				}
			// }, 2500);
		}else{
			// updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			// localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			// item1 =	setTimeout(function() {
				if(Number(updatechip)<100000){
					clearInterval(intervalspin);
					$('#startspin').text('SPIN');
					$('#stopspin').text('STOP');
					$('#tungguspin').text('STOP');
					otomatis=false;
					spincount=0;
					$('.changebet').attr('disabled','on');
					$('.bonus2m').fadeIn();
					tunggus();
				}else{
					if((spincount-1)>0){
						$('.disablebtn').attr('disabled','on');
					}else{
						tunggus();
						setTimeout(function() {
							starts();
							$('.disablebtn').removeAttr('disabled');
				        	$('.changebet').removeAttr('disabled');
						}, 900);
					}
				}
			// }, 2500);
		}
		}, 100);

        $('.slot:nth-child(1) .value div').removeClass('spingo'); 
        $('.slot:nth-child(1) .value .hasil1').html(dataimages[rand1]);
        $('.slot:nth-child(2) .value div').removeClass('spingo'); 
        $('.slot:nth-child(2) .value .hasil2').html(dataimages[rand2]);
        $('.slot:nth-child(3) .value div').removeClass('spingo'); 
        $('.slot:nth-child(3) .value .hasil3').html(dataimages[rand3]);
	});

})