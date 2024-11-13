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

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

displayTree(testTree.root);