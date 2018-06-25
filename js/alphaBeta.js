
var alphaBeta = function(){

function evaluate(table,computer){
	var sum = 0;
	var player = 3 - computer;
	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++){
			if(table[i][j] == player){
				sum--;
				if((i==0||j==0||i==7||j==7))
					sum-=2;
			}
			else if(table[i][j] == computer){
				sum++;
				if((i==0||j==0||i==7||j==7)&&!((i==0&&j==1) || (i==1&&j==0) || (i==0&&j==6) || (i==6&&j==0) || (i==1&&j==7) || (i==7&&j==1) ||(i==7&&j==6) ||(i==6&&j==7)))
					sum++;
				
					
			}
			
			
				
			
		}
		
	if(table[1][1] == computer || table[6][6] == computer || table[6][1] == computer || table[1][6] == computer)
				sum -= 50;
	if((table[0][1] == computer&&table[0][2] == player) || (table[1][0] == computer&&table[2][0] == player) || (table[0][6] == computer&&table[0][5] == player)  || (table[6][0] == computer &&table[5][0] == player) || (table[1][7] == computer&&table[2][7] == player) || (table[7][1] == computer&&table[7][2]==player) || (table[7][6] ==computer&&table[7][5]==player) || (table[6][7] == computer && table[5][7] == player))
				sum -= 40;
	if(table[0][0] == computer || table[7][7] == computer || table[7][0] == computer || table[0][7] == computer)
				sum += 30;
				
	if(table[0][0] == player || table[7][7] == player || table[7][0] == player || table[0][7] == player)
				sum -= 30;
	if(table[0][1] == player || table[1][0] == player || table[0][6] == player || table[6][0] == player || table[1][7] == player || table[7][1] ==player || table[7][6] ==player ||table[6][7] == player)
				sum += 5;
	if(table[1][1] == player || table[6][6] == player || table[6][1] == player || table[1][6] == player)
				sum += 15;
	
	return sum;
}

function alphaBeta(table,depth,alpha,beta,computer){
	var flag = 0;
	var this_turn = (depth+computer-1) % 2 +1;
	var max = - Infinity;
	var sign = [0,-1,1];
	var cur_x = -1;
	var cur_y = -1;
	var tmp_table;
	
	if(!anySpaceToPut(table,this_turn)){
		if(this_turn == 3-computer)
			return Infinity;
		else 
			return -Infinity;
	}
	
	if(depth == 0){
		
		return [-1,-1,evaluate(table,computer)];
		//else if(this_turn == 1)return [-1,-1,-evaluate(table)];
	}
	
	
	
	
		for(var i=0;i<8;i++)                                     //枚举所有可能放置棋子的位置
			for(var j=0;j<8;j++){
				if(ifToPutChess(this_turn,table,i,j)){
					flag = 1;
					tmp_table = makeMove(table,i,j,this_turn);
					
					//console.log(tmp_table);
					
					var val;
					tmp = alphaBeta(tmp_table,depth-1,-beta,-alpha,computer);
					if(tmp.length == 1)
						val = -Infinity;
					else val = - tmp[2];
					
					//console.log(val);
					
						if(val > alpha){
							if(val > beta){
								return val;
							}
							alpha = Math.max(alpha,val);
							
						}	
						
						if(max <= val){
							cur_x = i;
							cur_y = j;
							max = val;
							
						}
				}
			}
			
		if(!flag){
			//return -Infinity;
			if(this_turn == 3-computer)return Infinity;
			else if(this_turn == computer)return -Infinity;
		}
		
		//console.log([alpha,beta,depth]);
					
		return [cur_x,cur_y,max];
}

	return {res:alphaBeta};
}();
	
