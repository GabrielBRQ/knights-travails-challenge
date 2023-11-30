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

  knightMoves(finalPos){
    if(!this._verifyIndex(this.root, finalPos)){
      return;
    }

    let newStep = new Step(this.root);

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

    let queue = [newStep];
    let nextQueue = [];
    let stepCounter = 0;
    let seen = [];


    while(queue.length){
      while(queue.length){
        newStep = queue.shift();
        let current = [newStep.value[0], newStep.value[1]]

        let beforeObj = newStep;
        seen.push(beforeObj.value);
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
            if (seen.every((arr) => this._areDifferent(arr, nextX, nextY))) {
              newStep = new Step([nextX, nextY]);
              newStep.before = beforeObj;
  
              if (nextX === finalPos[0] && nextY === finalPos[1]) {
                this._getSteps(newStep, stepCounter);
                queue = [];
                nextQueue = [];
                break;
              }

              nextQueue.push(newStep);
            }
          }
        }
      }
      
      queue = queue.concat(nextQueue);
      nextQueue = [];
    }

  }

  _areDifferent(arr, nextX, nextY) {
    return arr[0] !== nextX || arr[1] !== nextY;
  }

  _getSteps(step, stepCounter, allSteps = []){
    if(step.before === undefined || this.before === 0){
      stepCounter--;
      console.log(`You made it in ${stepCounter} steps!`);
      console.log(allSteps);
    } else {
      stepCounter++;
      allSteps.push(step.value);
      allSteps = this._getSteps(step.before, stepCounter, allSteps);
    }
  }
}


let knightPiece = new Knight([0,0]);

knightPiece.knightMoves([7, 7]);