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
		if(whites > blacks){
			alert("you win")
			return;
		}
		else{
			alert("computer wins");
			return;
		}
	}
	
	else{	
		if(!end_flag&&!anySpaceToPut(ifExist,1) && !anySpaceToPut(ifExist,2)){
			end_flag = 1;
			if(whites > blacks){
			alert("you win")
			return;
			}
			else{
				alert("computer wins");
				return;
			}
		}
	}
}
	
	

function computerEvent(){
	if(end_flag)return;
	if(total_times%2 == 1){
								Table = copyStr(ifExist);
								if(!anySpaceToPut(Table,2)){
									alert("computer cannot move");
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
											if(ifToPutChess(2,ifExist,i,j)){
												makeRealMove(i,j,2);
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
								if(countNum <= 6)		
									result = alphaBeta.res(Table,countNum - 1,-Infinity,Infinity);
									
								else	
									result = alphaBeta.res(Table,6,-Infinity,Infinity);
								
								if(result[0] == undefined)
									result = alphaBeta.res(Table,1,-Infinity,Infinity);
									
								while(result[0] == -1 && k >=1){
									result = alphaBeta.res(Table,k,-Infinity,Infinity);
									k--;
								}
								
								
								makeRealMove(result[0],result[1],2);
								
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

function userEvent(this_x,this_y){
								if(end_flag)return;
								
								if(ifExist[this_y][this_x] == 0 && total_times%2 == 0){
									
									var this_turn = total_times%2+1;
									
									Table = copyStr(ifExist);
								if(!anySpaceToPut(Table,1)){
									alert("you cannot move");
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
							.attr('fill','white').attr("stroke","black")
							.attr('value',i*10+j)
							.on('click',function(){
									var this_y = $(this).attr('value')%10;
									var this_x = ($(this).attr('value')-this_y)/10;
									userEvent(this_x,this_y);
									
							})
							.on('mousemove',function(){
									computerEvent();
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



