class Step {
    constructor(value){
      this.value = value;
      this.before = 0;
    }
  }
  
  class Knight {
    constructor(initialPos){
      this.root = initialPos;
    }
  
    _verifyIndex(initialPos, finalPos){
      if (
          initialPos[0] < 0 ||
          initialPos[0] > 7 ||
          initialPos[1] < 0 ||
          initialPos[1] > 7 ||
          finalPos[0] < 0 ||
          finalPos[0] > 7 ||
          finalPos[1] < 0 ||
          finalPos[1] > 7
         )
      {
        console.log('invalid index');
        return false;
      } else {
        return true;
      }
    }
  
    knightMoves(initialPos, finalPos){
      if(!this._verifyIndex(initialPos, finalPos)){
        return;
      }
  
      let newStep = new Step(initialPos);
  
      let directions = [
        [-1, -2],
        [-2, -1],
        [1, -2],
        [2, -1],
        [1, 2],
        [2, 1],
        [-1, 2],
        [-2, 1],
      ]
  
      let queue = [[initialPos]];
      let nextQueue = [];
  
      while(queue.length){
        while(queue.length){
          queue.shift();
          let current = [newStep.value[0], newStep.value[1]]
      
          let beforeObj = newStep;
  
          for(let d of directions){
            let nextX = current[0] + d[0];
            let nextY = current[1] + d[1];
      
            if (
              ( nextX !== newStep.before[0] || nextY !== newStep.before[1]) &&
                nextX >= 0 && 
                nextX <= 7 && 
                nextY >= 0 && 
                nextY <= 7
               )
            {
              newStep = new Step([nextX, nextY]);
              newStep.before = beforeObj;
  
              if (nextX === finalPos[0] && nextY === finalPos[1]) {
                this.getSteps(newStep);
                queue = [];
                nextQueue = [];
                break;
              }
              nextQueue.push([nextX, nextY]);
            }
          }
        }
        queue = queue.concat(nextQueue);
        nextQueue = [];
      }
  
    }
  
    getSteps(step, allSteps = []){
      if(step.before === undefined || this.before === 0){
        console.log(allSteps);
      } else {
        allSteps.push(step.value);
        allSteps = this.getSteps(step.before, allSteps);
      }
    }
  }
  
  
  let cavalin = new Knight([0,0]);
  
  cavalin.knightMoves([0,0], [4,1]);