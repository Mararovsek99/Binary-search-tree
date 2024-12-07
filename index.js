class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }

}

class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    }   
    buildTree(array){
        if(array.length === 0) return null;

        array = [...new Set(array)].sort((a,b) => a - b);    // ...new Set(array) uses only unique values, and then i sort it with sort.

        let mid = Math.floor((array.length - 1) / 2);
        let node = new Node(array[mid]);

        node.left = this.buildTree(array.slice(0, mid));
        node.right = this.buildTree(array.slice(mid + 1));

        return node;
    }
    insert(value){

      if (this.root === null){
        this.root = new Node(value);
        return;
      }
      let currNode = this.root;


      function insertNode(currNode,value){
        
        if(value === currNode.data){
        console.log("i already have this data");
        return ;
      }


      if (value < currNode.data) {
        if (currNode.left === null) {
          currNode.left = new Node(value);
          return;
        }
        
        insertNode(currNode.left,value);
      }

      else if (value > currNode.data) {
        if (currNode.right === null) {
          currNode.right = new Node(value);
          return;
        }
        
        insertNode(currNode.right,value);
      }
      return;
      } 

      insertNode(currNode,value);
    }



    deleteItem(value){
      
      const saveThis = this;

        if (this.root === null){
        return;
      }
      let currNode = this.root;
      let parentNode = currNode;

      ///FIRST IT NEEDS TO FIND CORRECT NODE AND PARENT
      function DeleteNode(currNode,value){

        if (currNode.data === value) {
          //when finds correct one, it goes on next function
        DeleteCurrentNode(parentNode,currNode,value);
      }
      else if (currNode.data > value) {
        parentNode = currNode;
        DeleteNode(currNode.left, value);
      }
      else if (currNode.data < value) {
        parentNode = currNode;
        DeleteNode(currNode.right, value);
      }

      function DeleteCurrentNode(parentNode,currNode,value){

        //checks if its leaf element-----------------------------------OPTION 1
        if (currNode.left === null & currNode.right === null) {
          //if its on right side of parent
          if (parentNode.right.data === currNode.data) {
            parentNode.right = null;
            return;
          }
          //and if its on the left side
          else if (parentNode.left.data === currNode.data) {
            parentNode.left = null;
            return;
          }
        }


        //if node has only one child-----------------------------------OPTION 2
        else if (currNode.left === null || currNode.right === null){
          //if its on right side of parent
          if (parentNode.right.data === currNode.data) {
            if (currNode.right){
              parentNode.right = currNode.right;
              return;
            }
            else{
              parentNode.right = currNode.left;
              return;
            } 
          }
          //and if its on the left side of parent
          else{
            if (currNode.right){
              parentNode.left = currNode.right;
              return;
            }
            else{
              parentNode.left = currNode.left;
              return;
            } 
          }
        }
        //delete with both childrens(hard)
        else{
            let nextNode = currNode.right;
            //if this is next one
            if (!nextNode.left) {
              console.log(this);
              saveThis.deleteItem(nextNode.data);
              currNode.data = nextNode.data;
              return;
            }
            //find next on by going left
            else{
              while(nextNode.left){
                nextNode = nextNode.left;
              }
              console.log(this);
              saveThis.deleteItem(nextNode.data);
              currNode.data = nextNode.data;
              return;
            }
        }

      }
      }
      DeleteNode(currNode,value);
    }

    //takes value and return Node
    find(value){
      if (!this.root) {
        return null;
      }
      let currNode = this.root;

      function findValue(currNode,value){
        if (currNode.data === value) {
          return currNode;
        }
        else if (currNode.data > value) {
          if (!currNode.left) {
            return null;
          }
          return findValue(currNode.left,value);
        }
        else{
          if (!currNode.right) {
            return null;
          }
          return findValue(currNode.right,value);
          }
        }
        return findValue( currNode,value);
      }
      levelOrder(callback){

        if (!callback || typeof callback !== "function") {
          throw new Error("A callback function is required!");
        }

        const queue = [this.root];

          while(queue.length > 0){
            const currNode = queue.shift();
            callback(currNode);

            if (currNode.left) {
              queue.push(currNode.left);
            }
            if (currNode.right) {
              queue.push(currNode.right);
            }
            
          }
      }
      inOrder(callback){

        if (!callback || typeof callback !== "function") {
          throw new Error("A callback function is required!");
        }

        function visit(node) {
          if (node === null) {
            return; // Stop when there's no node
          }
      
          visit(node.left);      
          callback(node);       
          visit(node.right);     
        }
      
        visit(this.root); 
      }
      preOrder(callback){
        
        if (!callback || typeof callback !== "function") {
          throw new Error("A callback function is required!");
        }

        function visit(node) {
          if (node === null) {
            return; // Stop when there's no node
          }
          callback(node); 
          visit(node.left);     
          visit(node.right);     
        }
      
        visit(this.root); 
      }
      postOrder(callback){
        
        if (!callback || typeof callback !== "function") {
          throw new Error("A callback function is required!");
        }

        function visit(node) {
          if (node === null) {
            return; // Stop when there's no node
          }
           
          visit(node.left);     
          visit(node.right);
          callback(node);     
        }
      
        visit(this.root); 
      }
      height(node){
        if(node === null){
          return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
      }

      depth(node){
        if(node === null){
          return -1;
        }
        let depth = 0;
        
        function depthMeter(currNode,depth){

            if (currNode === node) {
              return depth;
            }

            if (currNode.data > node.data) {
              depth += 1;
              currNode = currNode.left;
              if (currNode === null) {
                return("node not found");
              }
              return depthMeter(currNode,depth);
            }
            if (currNode.data < node.data) {
              depth += 1;
              currNode = currNode.right;
              if (currNode === null) {
                return("node not found");
              }
              return depthMeter(currNode,depth);
            }
        }
        depthMeter(this.root,depth);

      
      }
      isBalanced() {
        if (!this.root) {
          return true; 
        }
      
        let currNode = this.root; 
      
        function balanceMeter(currNode) {
          if (currNode === null) {
            return 0; 
          }
      
          let leftHeight = balanceMeter(currNode.left);
          if (leftHeight === -1) return -1; 
      
          let rightHeight = balanceMeter(currNode.right);
          if (rightHeight === -1) return -1; 
      
          let difference = Math.abs(leftHeight - rightHeight);
          if (difference > 1) {
            return -1; 
          }

          return 1 + Math.max(leftHeight, rightHeight);
        }
      
        return balanceMeter(currNode) !== -1;
      }
      rebalance(){
        const newArray = [];
        //first i need datta from tree
        testTree.preOrder((node) => newArray.push(node.data));

        this.root = this.buildTree(newArray);
      }
      
}






function displayTree(node){
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
      prettyPrint(node);
}



//Create a binary search tree from an array of random numbers < 100. 

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 65, 34]);
displayTree(testTree.root);

//Confirm that the tree is balanced by calling isBalanced.

testTree.isBalanced(); //true

//Print out all elements in level, pre, post, and in order.

testTree.levelOrder(console.log);
testTree.preOrder(console.log);
testTree.postOrder(console.log);
testTree.inOrder(console.log);

//Unbalance the tree by adding several numbers > 100.

testTree.insert(68);
testTree.insert(69);
testTree.insert(70);

displayTree(testTree.root);

//Confirm that the tree is unbalanced by calling isBalanced 
testTree.isBalanced();  //false

//Balance the tree by calling rebalance.
testTree.rebalance();

//Confirm that the tree is balanced by calling isBalanced.
testTree.isBalanced();  //true

//Print out all elements in level, pre, post, and in order.

testTree.levelOrder(console.log);
testTree.preOrder(console.log);
testTree.postOrder(console.log);
testTree.inOrder(console.log);