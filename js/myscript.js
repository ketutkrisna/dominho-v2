function rubah(angka){
	var reverse = angka.toString().split('').reverse().join(''),
	ribuan = reverse.match(/\d{1,3}/g);
	ribuan = ribuan.join('.').split('').reverse().join('');
	return ribuan;
}


$(function(){

	var dataimages=['<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="5" src="img/g3.gif">',
		'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="12" src="img/g5.gif">',
		'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="23" src="img/g7.gif">',
		'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="17" src="img/g6.gif">',
		'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="8" src="img/g4.gif">',
		'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="3" src="img/g2.gif">',
		'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="2" src="img/g1.gif">',
		'<img class="ambiltambahchip" width="90%" height="90%" data-tambahchip="30" src="img/g8.gif">'
	];
	var spinawalstop=document.getElementById('spinawal');
	var btnstop=document.getElementById('btnstop');
	var reelstop=document.getElementById('reelstop');
	var csfff=document.getElementById('csfff');
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
	var item1,item2,item3;
	var stop1,stop2;
	var tambahchip,betkaliitem;
	var updatechips;
	// var item2=false;
	// var delayinterval = 3600;
	function spinaja(datacount,datajumlah){
		otomatis=true;
		// jumlahspin = $(this).data('spinotomatis');
		jumlahspin=datajumlah;
		$('.changebet').attr('disabled','on');
		$('.disablebtn').attr('disabled','on');
		// spincount=$(this).data('spinotomatis');
		spincount=datacount;
		tunggus();
		$('#startspin').click();
		if(jumlahspin != 'unlimited'){
			$('#tungguspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
			$('#stopspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
		}else{
			$('#tungguspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
			$('#stopspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
		}
		kedip1 = setTimeout(function() {
			stops();
			if(jumlahspin != 'unlimited'){
				$('#tungguspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
				$('#stopspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
			}else{
				$('#tungguspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
				$('#stopspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
			}
		}, 200);
		kedipawal= setTimeout(function() {
			tunggus();
			if(jumlahspin != 'unlimited'){
				$('#tungguspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
				$('#stopspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
			}else{
				$('#tungguspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
				$('#stopspin').html('STOP <sup><span style="font-size:16px;color:lightblue;position:absolute;right:-13px;top:0;">&#8734;</span></sup>');
			}
		}, 2500);
		intervalspin = setInterval(function(){
			$('#startspin').click();
			spincount--;
			if(jumlahspin != 'unlimited'){
				$('#tungguspin').html('STOP <sup><span style="font-size:11px;color:lightblue;position:absolute;right:-13px;top:0;">'+(Number(spincount)-1)+'</span></sup>');
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
		rand1=Math.floor(Math.random()*8);
		rand2=Math.floor(Math.random()*8);
		rand3=Math.floor(Math.random()*8);
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
		$('.takebonus').text('Semoga Beruntung');
		rand1=Math.floor(Math.random()*8);
		rand2=Math.floor(Math.random()*8);
		rand3=Math.floor(Math.random()*8);
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
		}, 300);

		if(rand1 == rand2 && rand1 == rand3 && rand2 == rand3){
			updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			item3 = setTimeout(function() {
				$('#csfff')[0].play();
				csfff.currentTime = 0;
				$('.slot:nth-child(1) .value').css('background-color','orange');
				$('.slot:nth-child(2) .value').css('background-color','orange');
				$('.slot:nth-child(3) .value').css('background-color','orange');
	           	tambahchip=$('.ambiltambahchip').data('tambahchip');
	           	betkaliitem = Number(bet)*4*Number(tambahchip);
	           	$('.takebonus').text(rubah(betkaliitem));
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);
				$('.mychip').text(rubah(localStorage.getItem('mychip')));

				if((betkaliitem/bet/4) >=12 && (betkaliitem/bet/4) <=17){
					// bigwin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('BIG');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else if((betkaliitem/bet/4) >=18 && (betkaliitem/bet/4) <=23){
					// megawin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('MEGA');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else if((betkaliitem/bet/4) >=24){
					// superwin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('SUPER');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else{
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 1000);
					}
				}
			}, 2500);
		}else if(rand1 == rand2){
			updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
			item2 = setTimeout(function() {
				$('#csfff')[0].play();
				csfff.currentTime = 0;
				$('.slot:nth-child(1) .value').css('background-color','orange');
				$('.slot:nth-child(2) .value').css('background-color','orange');
	           	tambahchip=$('.ambiltambahchip').data('tambahchip');
	           	betkaliitem = Number(bet)*Number(tambahchip);
	           	$('.takebonus').text(rubah(betkaliitem));
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);
				$('.mychip').text(rubah(localStorage.getItem('mychip')));

				if((betkaliitem/bet) >=12 && (betkaliitem/bet) <=17){
					// bigwin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('BIG');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else if((betkaliitem/bet) >=18 && (betkaliitem/bet) <=23){
					// megawin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('MEGA');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else if((betkaliitem/bet) >=24){
					// superwin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('SUPER');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else{
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 1000);
					}
				}
			}, 2500);
		}else{
			updatechip = Number(localStorage.getItem('mychip'))-Number(bet);
			localStorage.setItem('mychip',updatechip);
			$('.mychip').text(rubah(localStorage.getItem('mychip')));
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
					}
				}
			}, 2500);
		}
	})

	$('#stopspin').on('click',function(){
		$('#btnstop')[0].play();
        btnstop.currentTime = 0;
        otomatis=false;
        console.log(otomatis);
        spincount=0;
        starts();
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
        clearTimeout(stop1);
        clearTimeout(stop2);
        $('.value div').removeClass('spingo');
        $('.disablebtn').removeAttr('disabled');
        $('.changebet').removeAttr('disabled');

        

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
	           	tambahchip=$('.ambiltambahchip').data('tambahchip');
	           	betkaliitem = Number(bet)*4*Number(tambahchip);
	           	$('.takebonus').text(rubah(betkaliitem));
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);
				$('.mychip').text(rubah(localStorage.getItem('mychip')));

				if((betkaliitem/bet/4) >=12 && (betkaliitem/bet/4) <=17){
					// bigwin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('BIG');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else if((betkaliitem/bet/4) >=18 && (betkaliitem/bet/4) <=23){
					// megawin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('MEGA');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else if((betkaliitem/bet/4) >=24){
					// superwin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('SUPER');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else{
					// if((spincount-1)>0 && otomatis == true){
					// 	clearInterval(intervalspin);
					// 	stop2 = setTimeout(function() {
					// 		spinaja(spincount-1,jumlahspin);
					// 	}, 1000);
					// }
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
	           	tambahchip=$('.ambiltambahchip').data('tambahchip');
	           	betkaliitem = Number(bet)*Number(tambahchip);
	           	$('.takebonus').text(rubah(betkaliitem));
	           	updatechips = Number(localStorage.getItem('mychip'))+Number(betkaliitem);
				localStorage.setItem('mychip',updatechips);
				$('.mychip').text(rubah(localStorage.getItem('mychip')));

				if((betkaliitem/bet) >=12 && (betkaliitem/bet) <=17){
					// bigwin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('BIG');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else if((betkaliitem/bet) >=18 && (betkaliitem/bet) <=23){
					// megawin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('MEGA');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else if((betkaliitem/bet) >=24){
					// superwin
					if((spincount-1)>0 && otomatis == true){
						clearInterval(intervalspin);
						stop2 = setTimeout(function() {
							spinaja(spincount-1,jumlahspin);
						}, 3000);
					}
					$('.popupbox').fadeIn();
					$('.oktext').text('SUPER');
					$('.winchip').text(rubah(betkaliitem));
					setTimeout(function() {
						$('.popupbox').fadeOut();
					}, 3000);
				}else{
					// if((spincount-1)>0 && otomatis == true){
						// clearInterval(intervalspin);
						// stop2 = setTimeout(function() {
						// 	spinaja(spincount-1,jumlahspin);
						// }, 1000);
					// }
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
					$('.bonus2m').show();
					tunggus();
				}else{
					if((spincount-1)>0){
						$('.disablebtn').attr('disabled','on');
					}
				}
			// }, 2500);
		}

        $('.slot:nth-child(1) .value div').removeClass('spingo'); 
        $('.slot:nth-child(1) .value .hasil1').html(dataimages[rand1]);
        $('.slot:nth-child(2) .value div').removeClass('spingo'); 
        $('.slot:nth-child(2) .value .hasil2').html(dataimages[rand2]);
        $('.slot:nth-child(3) .value div').removeClass('spingo'); 
        $('.slot:nth-child(3) .value .hasil3').html(dataimages[rand3]);
	});

})