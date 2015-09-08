  /*
   * Function to create a matrix or vector
   * If either m or n is 1, then a vector (really an Array) is returned.
   * If n is not specified, an m x m matrix is returned.
   * If a value function is not specified, the matrix is filled with zeros
   * If no arguments are specified, null is returned.
   */
  function matrix(m,n, value) {
    if(value === undefined) {
      value = function(i,j) {return 0;}
    }
    if(n === undefined){
      n = m;
    }
    if(arguments.length == 0){
      return null;
    }
    var x = new Array(m);
    for (var i = 0; i < m; i++) {
      var row = new Array(n);
      for(var j=0; j < n ; j++){
        row[j] = value(i,j);
      }
      x[i] = row;
    }
    if(n == 1){
      return row_flatten(x);
    }else if(m == 1){
      return x[0];
    }else{
      return x;
    }
  }

  function rand(m,n){
    return matrix(m,n, function(i,j) { return Math.random(); });
  }

  function eye(m,n){
    return matrix(m,n, function(i,j) { 
      if(i == j) {
        return 1.0;
      } else{
        return 0.0;
      }
    });
  }

  function zeros(m,n){
    return matrix(m,n);
  }

  function flipud(A) {
    return A.reverse();
  }

  function row_flatten(A){
    return [].concat.apply([], A);
  }

  function col_flatten(A){
    return row_flatten(t(A));
  }

  function col_reshape(a){
    var n = Math.floor(Math.sqrt(a.length));
    console.log(n);
    return matrix(n,n,function(i,j) { return a[j*n + i];});    
  }

  function t(A){
    var newA = A[0].map(function(col, i) { 
      return A.map(function(row) { 
        return row[i];
      });
    });
    return newA;
  }

  function timesScalar(A,b){
    return matrix(A.length,A[0].length,function(i,j){ return A[i][j] *b;});     
  }

  function add(A,B){
    if(A.length != B.length){
      throw "A.numrows (" + A.length +") not equal to B.numrows (" +B.length +")"
    }
    if(A[0].length != B[0].length){
      throw "A.numcols (" + A[0].length +") not equal to B.numcols(" +B[0].length +")"
    }
    return matrix(A.length,A[0].length,function(i,j){ return A[i][j] + B[i][j];});     
  }

  function blkdiag(A,nreps){
    var blkA = A;
    var Acols = A[0].length;
    var Arows = A.length;
    
    for(i=0; i < nreps-1; i++){
      blkA = vertcat(horzcat(blkA,zeros(blkA.length, Acols)),
              horzcat(zeros(Arows, blkA[0].length),A));
    }
    return blkA;
  }

  function horzcat(A,B){
    if(typeof A[0] == "number"){
      A = A.map(function(r){return [r];})  
    }
    if(typeof B[0] == "number"){
      B = B.map(function(r){return [r];})  
    }
    if(A.length != B.length){
      throw "A.numrows (" + A.length +") not equal to B.numrows (" +B.length +")"
    }
    return A.map(function(r,i) {return A[i].concat(B[i]);}) 
  }

  function vertcat(A,B){
    if(typeof A[0] == "number"){
      A = A.map(function(r){return [r];})  
    }
    if(typeof B[0] == "number"){
      B = B.map(function(r){return [r];})  
    }
    if(A[0].length != B[0].length){
      throw "A.numcols (" + A[0].length +") not equal to B.numcols(" +B[0].length +")"
    }
    return A.concat(B);
  }
