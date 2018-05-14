
var alphaBeta = function(){

function evaluate(table){
	var sum = 0;
	for(var i=0;i<8;i++)
		for(var j=0;j<8;j++){
			if(table[i][j] == 1){
				if(i == 0 ||i == 7 ||j == 0||j == 7)
				sum-=2;
			}
			else if(table[i][j] == 2){
				
				if(i == 0 ||i == 7 ||j == 0||j == 7)
					sum += 4;
					
				
					
			}
			
			
				
			
		}
		
	if(table[1][1] == 2 || table[6][6] == 2 || table[6][1] == 2 || table[1][6] == 2)
				sum -= 25;
	if(table[0][1] == 2 || table[1][0] == 2 || table[0][6] == 2 || table[6][0] == 2 || table[1][7] == 2 || table[7][1] ==2 || table[7][6] ==2 ||table[6][7] == 2)
				sum -= 20;
	if(table[0][0] == 2 || table[7][7] == 2 || table[7][0] == 2 || table[0][7] == 2)
				sum += 20;
				
	if(table[0][0] == 1 || table[7][7] == 1 || table[7][0] == 1 || table[0][7] == 1)
				sum -= 20;
	if(table[0][1] == 1 || table[1][0] == 1 || table[0][6] == 1 || table[6][0] == 1 || table[1][7] == 1 || table[7][1] ==1 || table[7][6] ==1 ||table[6][7] == 1)
				sum += 5;
	if(table[1][1] == 1 || table[6][6] == 1 || table[6][1] == 1 || table[1][6] == 1)
				sum += 10;
	
	return sum;
}

function alphaBeta(table,depth,alpha,beta){
	var flag = 0;
	var this_turn = (depth+1) % 2 +1;
	var max = - Infinity;
	var sign = [0,-1,1];
	var cur_x = -1;
	var cur_y = -1;
	var tmp_table;
	
	if(!anySpaceToPut(table,this_turn)){
		if(this_turn == 1)
			return Infinity;
		else 
			return -Infinity;
	}
	
	if(depth == 0){
		
		return [-1,-1,evaluate(table)];
		//else if(this_turn == 1)return [-1,-1,-evaluate(table)];
	}
	
	
	
	
		for(var i=0;i<8;i++)                                     //枚举所有可能放置棋子的位置
			for(var j=0;j<8;j++){
				if(ifToPutChess(this_turn,table,i,j)){
					flag = 1;
					tmp_table = makeMove(table,i,j,this_turn);
					
					//console.log(tmp_table);
					
					var val;
					tmp = alphaBeta(tmp_table,depth-1,-beta,-alpha);
					if(tmp.length == 1)
						val = alpha;
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
			if(this_turn == 1)return Infinity;
			else if(this_turn == 2)return -Infinity;
		}
		
		//console.log([alpha,beta,depth]);
					
		return [cur_x,cur_y,max];
}

	return {res:alphaBeta};
}();
	