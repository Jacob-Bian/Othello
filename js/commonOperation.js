(function() {
    $.MsgBox = {
        Alert: function(msg) {
            GenerateHtml("alert", msg);
            btnOk(); //alert只是弹出消息，因此没必要用到回调函数callback
            
        },
        Confirm: function(msg, callback) {
            GenerateHtml("confirm", msg);
            btnOk(callback);
            
        }
		 
    }
	var GenerateHtml = function(type, msg) {
        var _html = "";
        _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">notice</span>';
        _html += '<a id="mb_ico">x</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
        if (type == "alert") {
            _html += '<input id="mb_btn_ok" type="button" value="ok" />';
        }
        if (type == "confirm") {
            _html += '<input id="mb_btn_ok" type="button" value="ok" />';
          
        }
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html);
        //生成Css
        GenerateCss();
    }

    //生成Css
    var GenerateCss = function() {
        $("#mb_box").css({
            width: '100%',
            height: '100%',
            zIndex: '99999',
            position: 'fixed',
            filter: 'Alpha(opacity=60)',
            backgroundColor: 'black',
            top: '0',
            left: '0',
            opacity: '0.6'
        });
        $("#mb_con").css({
            zIndex: '999999',
            width: '400px',
            position: 'fixed',
            backgroundColor: 'White',
            borderRadius: '15px'
        });
        $("#mb_tit").css({
            display: 'block',
            fontSize: '14px',
            color: '#444',
            padding: '10px 15px',
            backgroundColor: '#DDD',
            borderRadius: '15px 15px 0 0',
            borderBottom: '3px solid #009BFE',
            fontWeight: 'bold'
        });
        $("#mb_msg").css({
            padding: '20px',
            lineHeight: '20px',
            borderBottom: '1px dashed #DDD',
            fontSize: '13px'
        });
        $("#mb_ico").css({
            display: 'block',
            position: 'absolute',
            right: '10px',
            top: '9px',
            border: '1px solid Gray',
            width: '18px',
            height: '18px',
            textAlign: 'center',
            lineHeight: '16px',
            cursor: 'pointer',
            borderRadius: '12px',
            fontFamily: '微软雅黑'
        });
        $("#mb_btnbox").css({
            margin: '15px 0 10px 0',
            textAlign: 'center'
        });
        $("#mb_btn_ok,#mb_btn_no").css({
            width: '85px',
            height: '30px',
            color: 'white',
            border: 'none'
        });
        $("#mb_btn_ok").css({
            backgroundColor: '#168bbb'
        });
       
        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function() {
            $(this).css({
                backgroundColor: 'Red',
                color: 'White'
            });
        }, function() {
            $(this).css({
                backgroundColor: '#DDD',
                color: 'black'
            });
        });
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();
        //让提示框居中
        $("#mb_con").css({
            top: (_height - boxHeight) / 2 + "px",
            left: (_widht - boxWidth) / 2 + "px"
        });
    }
	var btnOk = function(callback) {
        $("#mb_btn_ok").click(function() {
            $("#mb_box,#mb_con").remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
})();
function gameOver(){
	var sum  = 0;
	var whites = 0,blacks = 0;
	for(var i=0;i<8;i++){
		for(var j=0;j<8;j++){
			if(ifExist[i][j] == 1){whites++;sum++;}
			else if(ifExist[i][j] == 2){blacks++;sum++;}
			
		}
	}
			
	
											
	text_1.remove();
	text_2.remove();
											
	text_1 = svg.append('text').attr('x',500).attr('y',110).attr('font-size','20px').attr('font-family','sans-serif').attr('fill','black').text(whites);
	text_2 = svg.append('text').attr('x',500).attr('y',210).attr('font-size','20px').attr('font-family','sans-serif').attr('fill','black').text(blacks);		
			
	if(!end_flag&&sum == 64){
		end_flag = 1;
		if(computer==2){
			if(whites > blacks){
				$.MsgBox.Alert("you win")
				return;
			}
			else{
				$.MsgBox.Alert("computer wins");
				return;
			}
		}
		else{
			if(whites < blacks){
			 $.MsgBox.Alert("you win")
			return;
		}
		else{
			 $.MsgBox.Alert("computer wins");
			return;
		}
		}
	}
	
	else{	
		if(!end_flag&&!anySpaceToPut(ifExist,1) && !anySpaceToPut(ifExist,2)){
			end_flag = 1;
			if(computer==2){
			if(whites > blacks){
				$.MsgBox.Alert("you win")
				return;
			}
			else{
				$.MsgBox.Alert("computer wins");
				return;
			}
		}
		else{
			if(whites < blacks){
			 $.MsgBox.Alert("you win")
			return;
		}
		else{
			 $.MsgBox.Alert("computer wins");
			return;
		}
		}
		}
	}
}
	
	

function computerEvent(computer){
	if(end_flag)return;
	var this_turn = total_times%2+1;
	if(this_turn == computer){
								Table = copyStr(ifExist);
								if(!anySpaceToPut(Table,computer)){
									 $.MsgBox.Alert("computer cannot move");
									total_times++;
									return ;
								}
								//test(Table);
								var countNum = 0;
								for(var i=0;i<8;i++)
									for(var j=0;j<8;j++)
										if(ifExist[i][j] == 0)
											countNum++;
											
								if(countNum == 1){
									for(var i=0;i<8;i++){
										for(var j=0;j<8;j++){
											if(ifToPutChess(computer,ifExist,i,j)){
												makeRealMove(i,j,computer);
												return;
											}
										}
									}
								}
								
								var result;
								var k ;
								if(countNum <= 6)
									k = countNum;
								else k = 6;
								if(countNum < 6){		
									if(countNum%2==0)result = alphaBeta.res(Table,countNum,-Infinity,Infinity,computer);
									else result = alphaBeta.res(Table,countNum-1,-Infinity,Infinity,computer);
									
								}
									
								else	
									result = alphaBeta.res(Table,6,-Infinity,Infinity,computer);
								
								if(result[0] == undefined)
									result = alphaBeta.res(Table,1,-Infinity,Infinity,computer);
									
								while(result[0] == -1 && k >=1){
									result = alphaBeta.res(Table,k,-Infinity,Infinity,computer);
									k-=2;
								}
								
								
								makeRealMove(result[0],result[1],computer);
								
								num_of_blacks = num_of_whites = 0;
								
										for(var i=0;i<8;i++)
											for(var j=0;j<8;j++){
												if(ifExist[i][j] == 1)num_of_whites++;
												if(ifExist[i][j] == 2)num_of_blacks++;
											}
											
										text_1.remove();
										text_2.remove();
											
										text_1 = svg.append('text').attr('x',500).attr('y',110).attr('font-size','20px').attr('font-family','sans-serif').attr('fill','black').text(num_of_whites);
										text_2 = svg.append('text').attr('x',500).attr('y',210).attr('font-size','20px').attr('font-family','sans-serif').attr('fill','black').text(num_of_blacks);
								
										
								
								total_times++;
							}
							
}

function userEvent(this_x,this_y,player){
								if(end_flag)return;
								var this_turn  = total_times%2+1;
								
								if(ifExist[this_y][this_x] == 0 && this_turn == player){
									
									//var this_turn = total_times%2+1;
									
									
									Table = copyStr(ifExist);
								if(!anySpaceToPut(Table,player)){
									 $.MsgBox.Alert("you cannot move");
									total_times++;
									return ;
								}
								
									
									if(this_y<7&&ifExist[this_y+1][this_x] !=this_turn &&ifExist[this_y+1][this_x] !=0){
										var k = 1;
										while(this_y+k<8 && ifExist[this_y+k][this_x] !=this_turn && ifExist[this_y+k][this_x] !=0)
											k++;
											
										if(this_y+k == 8)k--;
										
										if(ifExist[this_y+k][this_x] == this_turn){
											for(var iter=0;iter<k;iter++){
												//console.log([this_x,this_y+iter,this_turn]);
												
												ifExist[this_y+iter][this_x] = this_turn;
												svg.append('circle').attr('cx',this_x*40+20).attr('cy',(this_y+iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
											}
											//console.log(ifExist);
										}
									}
									
									if(this_y>0&&ifExist[this_y-1][this_x] !=this_turn &&ifExist[this_y-1][this_x] !=0){
										var k = 1;
										while(this_y-k>=0 && ifExist[this_y-k][this_x] !=this_turn && ifExist[this_y-k][this_x] !=0)
											k++;
											
										if(this_y-k == -1)k--;
										
										if(ifExist[this_y-k][this_x] == this_turn){
											for(var iter=0;iter<k;iter++){
												//console.log([this_x,this_y-iter]);
											
												ifExist[this_y-iter][this_x] = this_turn;
												svg.append('circle').attr('cx',this_x*40+20).attr('cy',(this_y-iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
											}
											//console.log(ifExist);
										}
									}
									
									if(this_x<7&&ifExist[this_y][this_x+1] !=this_turn &&ifExist[this_y][this_x+1] !=0){
										var k = 1;
										while(this_x+k<8 && ifExist[this_y][this_x+k] !=this_turn && ifExist[this_y][this_x+k] !=0)
											k++;
											
										if(this_x+k == 8)k--;
										
										if(ifExist[this_y][this_x+k] == this_turn){
											for(var iter=0;iter<k;iter++){
												ifExist[this_y][this_x+iter] = this_turn;
												svg.append('circle').attr('cx',(this_x+iter)*40+20).attr('cy',(this_y)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
											}
											//console.log(ifExist);
										}
									}
									
									if(this_x>0&&ifExist[this_y][this_x-1] !=this_turn &&ifExist[this_y][this_x-1] !=0){
										var k = 1;
										while(this_x-k>=0 && ifExist[this_y][this_x-k] !=this_turn && ifExist[this_y][this_x-k] !=0)
											k++;
											
										if(this_x-k == -1)k--;
										
										if(ifExist[this_y][this_x-k] == this_turn){
											for(var iter=0;iter<k;iter++){
												ifExist[this_y][this_x-iter] = this_turn;
												svg.append('circle').attr('cx',(this_x-iter)*40+20).attr('cy',(this_y)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
											}
											//console.log(ifExist);
										}
									}
									
									if(this_x>0&&this_y<7&&ifExist[this_y+1][this_x-1] !=this_turn &&ifExist[this_y+1][this_x-1] !=0){
										var k = 1;
										while(this_x-k>=0&&this_y+k<8 && ifExist[this_y+k][this_x-k] !=this_turn && ifExist[this_y+k][this_x-k] !=0)
											k++;
											
										if(this_x-k == -1 || this_y+k == 8)k--;
										
										if(ifExist[this_y+k][this_x-k] == this_turn){
											for(var iter=0;iter<k;iter++){
												ifExist[this_y+iter][this_x-iter] = this_turn;
												svg.append('circle').attr('cx',(this_x-iter)*40+20).attr('cy',(this_y+iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
											}
											//console.log(ifExist);
										}
									}
									
									if(this_x>0&&this_y>0&&ifExist[this_y-1][this_x-1] !=this_turn &&ifExist[this_y-1][this_x-1] !=0){
										var k = 1;
										while(this_x-k>=0&&this_y-k>=0 && ifExist[this_y-k][this_x-k] !=this_turn && ifExist[this_y-k][this_x-k] !=0)
											k++;
											
										if(this_x-k == -1 || this_y-k == -1)k--;
										
										if(ifExist[this_y-k][this_x-k] == this_turn){
											for(var iter=0;iter<k;iter++){
												ifExist[this_y-iter][this_x-iter] = this_turn;
												svg.append('circle').attr('cx',(this_x-iter)*40+20).attr('cy',(this_y-iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
											}
											//console.log(ifExist);
										}
									}
									
									if(this_x<7&&this_y<7&&ifExist[this_y+1][this_x+1] !=this_turn &&ifExist[this_y+1][this_x+1] !=0){
										var k = 1;
										while(this_x+k<8&&this_y+k<8 && ifExist[this_y+k][this_x+k] !=this_turn && ifExist[this_y+k][this_x+k] !=0)
											k++;
										
										if(this_x+k == 8 || this_y+k == 8)k--;
										
										if(ifExist[this_y+k][this_x+k] == this_turn){
											for(var iter=0;iter<k;iter++){
												ifExist[this_y+iter][this_x+iter] = this_turn;
												svg.append('circle').attr('cx',(this_x+iter)*40+20).attr('cy',(this_y+iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
											}
											//console.log(ifExist);
										}
									}
									
									if(this_x<7&&this_y>0&&ifExist[this_y-1][this_x+1] !=this_turn &&ifExist[this_y-1][this_x+1] !=0){
										var k = 1;
										while(this_x+k<8&&this_y-k>=0 && ifExist[this_y-k][this_x+k] !=this_turn && ifExist[this_y-k][this_x+k] !=0)
											k++;
										if(this_y-k == -1 || this_x+k == 8)k--;
										if(ifExist[this_y-k][this_x+k] == this_turn){
											for(var iter=0;iter<k;iter++){
												ifExist[this_y-iter][this_x+iter] = this_turn;
												svg.append('circle').attr('cx',(this_x+iter)*40+20).attr('cy',(this_y-iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
											}
											//console.log(ifExist);
										}
									}
									
									
									num_of_blacks = num_of_whites = 0;
									
									if(ifExist[this_y][this_x] != 0){
										for(var i=0;i<8;i++)
											for(var j=0;j<8;j++){
												if(ifExist[i][j] == 1)num_of_whites++;
												if(ifExist[i][j] == 2)num_of_blacks++;
											}
											
										text_1.remove();
										text_2.remove();
											
										text_1 = svg.append('text').attr('x',500).attr('y',110).attr('font-size','20px').attr('font-family','sans-serif').attr('fill','black').text(num_of_whites);
										text_2 = svg.append('text').attr('x',500).attr('y',210).attr('font-size','20px').attr('font-family','sans-serif').attr('fill','black').text(num_of_blacks);	
										
										total_times++;
									}
									//console.log(ifExist);
								
								}
								
								
								
}


function initialize(){
	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++){
			thisRect = svg.append('rect').attr('x',i*40).attr('y',j*40)
							.attr('width',40).attr('height',40)
							.attr('fill','#CC8F33').attr("stroke","black")
							.attr('value',i*10+j)
							.on('click',function(){
									var this_y = $(this).attr('value')%10;
									var this_x = ($(this).attr('value')-this_y)/10;
									userEvent(this_x,this_y,player);
									gameOver();
									computerEvent(computer);
									gameOver();
							});
		rects[i].push(thisRect);
		}

	svg.append('circle').attr('cx',3*40+20).attr('cy',3*40+20).attr('r',18)
								.attr('fill', 'white')
								.attr('stroke','black');
								
	svg.append('circle').attr('cx',4*40+20).attr('cy',4*40+20).attr('r',18)
								.attr('fill', 'white')
								.attr('stroke','black');
								
	svg.append('circle').attr('cx',3*40+20).attr('cy',4*40+20).attr('r',18)
								.attr('fill', 'black')
								.attr('stroke','black');
								
	svg.append('circle').attr('cx',4*40+20).attr('cy',3*40+20).attr('r',18)
								.attr('fill', 'black')
								.attr('stroke','black');	
								
								
								
								
	svg.append('circle').attr('cx',400).attr('cy',100).attr('r',18)
								.attr('fill', 'white')
								.attr('stroke','black');
								
	text_1 = svg.append('text').attr('x',500).attr('y',110).attr('font-size','20px').attr('font-family','sans-serif').attr('fill','black').text(num_of_whites);
								
	svg.append('circle').attr('cx',400).attr('cy',200).attr('r',18)
								.attr('fill', 'black')
								.attr('stroke','black');	
	
	text_2 = svg.append('text').attr('x',500).attr('y',210).attr('font-size','20px').attr('font-family','sans-serif').attr('fill','black').text(num_of_blacks);

	if(computer<player)
		computerEvent(computer);

}

function copyStr(arr){
	var str = [[],[],[],[],[],[],[],[]];
	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++)
			str[i].push(arr[i][j]);
			
	return str;
}


function anySpaceToPut(Table,this_turn){
	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++){
			if(Table[i][j] == 0 && ifToPutChess(this_turn,Table,j,i))
				return true;
		}
	return false;
}


function test(Table){
	var cur_sum = -Infinity;
	var cur_x=0,cur_y=0;
	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++){
			if(ifToPutChess(2,ifExist,i,j)){
				tmp_table = makeMove(Table,i,j,2);
				//console.log(ifExist);
				sum = evaluate(tmp_table);
				if(sum > cur_sum){
					cur_sum = sum;
					cur_x = i;
					cur_y = j;
				}
			}
		}
	
	//console.log([cur_x,cur_y]);
	
	makeRealMove(cur_x,cur_y,2);
	//console.log(ifExist);
}


//检测当前位置是否能落子
function ifToPutChess(this_turn,table,this_x,this_y){								
		if(table[this_y][this_x] != 0)
			return false;
		else{
			if(this_y<7&&table[this_y+1][this_x] !=this_turn &&table[this_y+1][this_x] !=0){
				var k = 1;
				while(this_y+k<8 && table[this_y+k][this_x] !=this_turn && table[this_y+k][this_x] !=0)
						k++;
											
						if(this_y+k == 8)k--;
										
						if(table[this_y+k][this_x] == this_turn)
							return true;
			}
									
			if(this_y>0&&table[this_y-1][this_x] !=this_turn && table[this_y-1][this_x] !=0){
				var k = 1;
				while(this_y-k>=0 && table[this_y-k][this_x] !=this_turn && table[this_y-k][this_x] !=0)
						k++;
											
						if(this_y-k == -1)k--;
										
						if(table[this_y-k][this_x] == this_turn)
							return true;
			}
									
			if(this_x<7&&table[this_y][this_x+1] !=this_turn &&table[this_y][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8 && table[this_y][this_x+k] !=this_turn && table[this_y][this_x+k] !=0)
						k++;
											
						if(this_x+k == 8)k--;
										
						if(table[this_y][this_x+k] == this_turn){
							return true;
											//console.log(ifExist);
						}
			}
									
			if(this_x>0&&table[this_y][this_x-1] !=this_turn &&table[this_y][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0 && table[this_y][this_x-k] !=this_turn && table[this_y][this_x-k] !=0)
						k++;
											
				if(this_x-k == -1)k--;
										
						if(table[this_y][this_x-k] == this_turn)
							return true;
			}
									
			if(this_x>0&&this_y<7&&table[this_y+1][this_x-1] !=this_turn &&table[this_y+1][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0&&this_y+k<8 && table[this_y+k][this_x-k] !=this_turn && table[this_y+k][this_x-k] !=0)
					k++;
											
					if(this_x-k == -1 || this_y+k == 8)k--;
										
					if(table[this_y+k][this_x-k] == this_turn)
						return true;
			}
									
			if(this_x>0&&this_y>0&&table[this_y-1][this_x-1] !=this_turn &&table[this_y-1][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0&&this_y-k>=0 && table[this_y-k][this_x-k] !=this_turn && table[this_y-k][this_x-k] !=0)
					k++;
											
					if(this_x-k == -1 || this_y-k == -1)k--;
										
					if(table[this_y-k][this_x-k] == this_turn)
						return true;
			}
									
			if(this_x<7&&this_y<7&&table[this_y+1][this_x+1] !=this_turn &&table[this_y+1][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8&&this_y+k<8 && table[this_y+k][this_x+k] !=this_turn && table[this_y+k][this_x+k] !=0)
					k++;
										
					if(this_x+k == 8 || this_y+k == 8)k--;
										
					if(table[this_y+k][this_x+k] == this_turn)
						return true;
			}
									
			if(this_x<7&&this_y>0&&table[this_y-1][this_x+1] !=this_turn && table[this_y-1][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8&&this_y-k>=0 && table[this_y-k][this_x+k] !=this_turn && table[this_y-k][this_x+k] !=0)
					k++;
					if(this_y-k == -1 || this_x+k == 8)k--;
					if(table[this_y-k][this_x+k] == this_turn){
						return true;
				}
			}
			
			return false;
		}
}

function makeRealMove(this_x,this_y,this_turn){
		
		console.log(this_x,this_y);
		svg.select("#spot").remove();
		

		if(this_y<7&&ifExist[this_y+1][this_x] !=this_turn &&ifExist[this_y+1][this_x] !=0){
				var k = 1;
				while(this_y+k<8 && ifExist[this_y+k][this_x] !=this_turn && ifExist[this_y+k][this_x] !=0)
						k++;
											
						if(this_y+k == 8)k--;
										
						if(ifExist[this_y+k][this_x] == this_turn){
							for(var iter=0;iter<k;iter++){
									ifExist[this_y+iter][this_x] = this_turn;
									
									svg.append('circle').attr('cx',this_x*40+20).attr('cy',(this_y+iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
							}
						}
		}
		
									
			if(this_y>0&&ifExist[this_y-1][this_x] !=this_turn &&ifExist[this_y-1][this_x] !=0){
				var k = 1;
				while(this_y-k>=0 && ifExist[this_y-k][this_x] !=this_turn && ifExist[this_y-k][this_x] !=0)
						k++;
											
						if(this_y-k == -1)k--;
										
						if(ifExist[this_y-k][this_x] == this_turn){
							for(var iter=0;iter<k;iter++){
									ifExist[this_y-iter][this_x] = this_turn;
									
									svg.append('circle').attr('cx',this_x*40+20).attr('cy',(this_y-iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
							}
						}
			}
									
			if(this_x<7&&ifExist[this_y][this_x+1] !=this_turn &&ifExist[this_y][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8 && ifExist[this_y][this_x+k] !=this_turn && ifExist[this_y][this_x+k] !=0)
						k++;
											
						if(this_x+k == 8)k--;
										
						if(ifExist[this_y][this_x+k] == this_turn){
							for(var iter=0;iter<k;iter++){
									ifExist[this_y][this_x+iter] = this_turn;
									
									svg.append('circle').attr('cx',(this_x+iter)*40+20).attr('cy',(this_y)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
							}
						}	
			}
									
			if(this_x>0&&ifExist[this_y][this_x-1] !=this_turn && ifExist[this_y][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0 && ifExist[this_y][this_x-k] !=this_turn && ifExist[this_y][this_x-k] !=0)
						k++;
											
				if(this_x-k == -1)k--;
										
						if(ifExist[this_y][this_x-k] == this_turn){
							for(var iter=0;iter<k;iter++){
									ifExist[this_y][this_x-iter] = this_turn;
									
									svg.append('circle').attr('cx',(this_x-iter)*40+20).attr('cy',(this_y)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
							}
						}
			}
									
			if(this_x>0&&this_y<7&&ifExist[this_y+1][this_x-1] !=this_turn && ifExist[this_y+1][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0&&this_y+k<8 && ifExist[this_y+k][this_x-k] !=this_turn && ifExist[this_y+k][this_x-k] !=0)
					k++;
											
					if(this_x-k == -1 || this_y+k == 8)k--;
										
					if(ifExist[this_y+k][this_x-k] == this_turn){
						for(var iter=0;iter<k;iter++){
									ifExist[this_y+iter][this_x-iter] = this_turn;
									
									svg.append('circle').attr('cx',(this_x-iter)*40+20).attr('cy',(this_y+iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
						}
					}
			}
									
			if(this_x>0&&this_y>0&&ifExist[this_y-1][this_x-1] !=this_turn && ifExist[this_y-1][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0&&this_y-k>=0 && ifExist[this_y-k][this_x-k] !=this_turn && ifExist[this_y-k][this_x-k] !=0)
					k++;
											
					if(this_x-k == -1 || this_y-k == -1)k--;
										
					if(ifExist[this_y-k][this_x-k] == this_turn){
						for(var iter=0;iter<k;iter++){
									ifExist[this_y-iter][this_x-iter] = this_turn;
									
									svg.append('circle').attr('cx',(this_x-iter)*40+20).attr('cy',(this_y-iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
						}
					}
			}
									
			if(this_x<7&&this_y<7&&ifExist[this_y+1][this_x+1] !=this_turn && ifExist[this_y+1][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8&&this_y+k<8 && ifExist[this_y+k][this_x+k] !=this_turn && ifExist[this_y+k][this_x+k] !=0)
					k++;
										
					if(this_x+k == 8 || this_y+k == 8)k--;
										
					if(ifExist[this_y+k][this_x+k] == this_turn){
						for(var iter=0;iter<k;iter++){
									ifExist[this_y+iter][this_x+iter] = this_turn;
									
									svg.append('circle').attr('cx',(this_x+iter)*40+20).attr('cy',(this_y+iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
						}
					}
			}
									
			if(this_x<7&&this_y>0&&ifExist[this_y-1][this_x+1] !=this_turn && ifExist[this_y-1][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8&&this_y-k>=0 && ifExist[this_y-k][this_x+k] !=this_turn && ifExist[this_y-k][this_x+k] !=0)
					k++;
					if(this_y-k == -1 || this_x+k == 8)k--;
					if(ifExist[this_y-k][this_x+k] == this_turn){
						for(var iter=0;iter<k;iter++){
									ifExist[this_y-iter][this_x+iter] = this_turn;
									
									svg.append('circle').attr('cx',(this_x+iter)*40+20).attr('cy',(this_y-iter)*40+20).attr('r',18)
																.attr('fill',function(){
																		if(this_turn == 1)return 'white';
																		else if(this_turn ==2)return 'black';
																})
																.attr('stroke','black');
						}
					}
				
			}
			cur_spot = svg.append('circle').attr('cx',this_x*40+20).attr('cy',this_y*40+20).attr('r',3).attr('id',"spot")
				.attr('fill','white').attr('stroke','black');
		
}



function makeMove(table,this_x,this_y,this_turn){
		var tmp_table = copyStr(table);
		if(this_y<7&&table[this_y+1][this_x] !=this_turn &&table[this_y+1][this_x] !=0){
				var k = 1;
				while(this_y+k<8 && table[this_y+k][this_x] !=this_turn && table[this_y+k][this_x] !=0)
						k++;
											
						if(this_y+k == 8)k--;
										
						if(table[this_y+k][this_x] == this_turn){
							for(var iter=0;iter<k;iter++){
									tmp_table[this_y+iter][this_x] = this_turn;
							}
						}
		}
		
									
			if(this_y>0&&table[this_y-1][this_x] !=this_turn &&table[this_y-1][this_x] !=0){
				var k = 1;
				while(this_y-k>=0 && table[this_y-k][this_x] !=this_turn && table[this_y-k][this_x] !=0)
						k++;
											
						if(this_y-k == -1)k--;
										
						if(table[this_y-k][this_x] == this_turn){
							for(var iter=0;iter<k;iter++){
									tmp_table[this_y-iter][this_x] = this_turn;
									
							}
						}
			}
									
			if(this_x<7&&table[this_y][this_x+1] !=this_turn &&table[this_y][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8 && table[this_y][this_x+k] !=this_turn && table[this_y][this_x+k] !=0)
						k++;
											
						if(this_x+k == 8)k--;
										
						if(table[this_y][this_x+k] == this_turn){
							for(var iter=0;iter<k;iter++){
									tmp_table[this_y][this_x+iter] = this_turn;
							}
						}	
			}
									
			if(this_x>0&&table[this_y][this_x-1] !=this_turn &&table[this_y][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0 && table[this_y][this_x-k] !=this_turn && table[this_y][this_x-k] !=0)
						k++;
											
				if(this_x-k == -1)k--;
										
						if(table[this_y][this_x-k] == this_turn){
							for(var iter=0;iter<k;iter++){
									tmp_table[this_y][this_x+iter] = this_turn;
							}
						}
			}
									
			if(this_x>0&&this_y<7&&table[this_y+1][this_x-1] !=this_turn &&table[this_y+1][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0&&this_y+k<8 && table[this_y+k][this_x-k] !=this_turn && table[this_y+k][this_x-k] !=0)
					k++;
											
					if(this_x-k == -1 || this_y+k == 8)k--;
										
					if(table[this_y+k][this_x-k] == this_turn){
						for(var iter=0;iter<k;iter++){
									tmp_table[this_y+iter][this_x-iter] = this_turn;
						}
					}
			}
									
			if(this_x>0&&this_y>0&&table[this_y-1][this_x-1] !=this_turn && table[this_y-1][this_x-1] !=0){
				var k = 1;
				while(this_x-k>=0&&this_y-k>=0 && table[this_y-k][this_x-k] !=this_turn && table[this_y-k][this_x-k] !=0)
					k++;
											
					if(this_x-k == -1 || this_y-k == -1)k--;
										
					if(table[this_y-k][this_x-k] == this_turn){
						for(var iter=0;iter<k;iter++){
									tmp_table[this_y-iter][this_x-iter] = this_turn;
						}
					}
			}
									
			if(this_x<7&&this_y<7&&table[this_y+1][this_x+1] !=this_turn && table[this_y+1][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8&&this_y+k<8 && table[this_y+k][this_x+k] !=this_turn && table[this_y+k][this_x+k] !=0)
					k++;
										
					if(this_x+k == 8 || this_y+k == 8)k--;
										
					if(table[this_y+k][this_x+k] == this_turn){
						for(var iter=0;iter<k;iter++){
									tmp_table[this_y+iter][this_x+iter] = this_turn;
						}
					}
			}
									
			if(this_x<7&&this_y>0&&table[this_y-1][this_x+1] !=this_turn && table[this_y-1][this_x+1] !=0){
				var k = 1;
				while(this_x+k<8&&this_y-k>=0 && table[this_y-k][this_x+k] !=this_turn && table[this_y-k][this_x+k] !=0)
					k++;
					if(this_y-k == -1 || this_x+k == 8)k--;
					if(table[this_y-k][this_x+k] == this_turn){
						for(var iter=0;iter<k;iter++){
									tmp_table[this_y-iter][this_x+iter] = this_turn;
						}
					}
				
			}
			
			return tmp_table;
		
}






