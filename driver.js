const treeFactory = require("./binary-search-trees");

const treeTest = treeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
treeTest.buildTree();

console.log("Is balanced? > ", treeTest.isBalanced());
console.log("Level order > ", treeTest.levelOrder());
console.log("Pre order > ", treeTest.preorder());
console.log("Post order > ", treeTest.postorder());
console.log("In order > ", treeTest.inorder());

treeTest.insert(103);
treeTest.insert(150);
treeTest.insert(145);
treeTest.insert(148);

console.log("Inserted 103, 150, 145, 148");
console.log("Is balanced? > ", treeTest.isBalanced());

treeTest.rebalance();

console.log("Balanced tree");
console.log("Is balanced? > ", treeTest.isBalanced());
console.log("Level order > ", treeTest.levelOrder());
console.log("Pre order > ", treeTest.preorder());
console.log("Post order > ", treeTest.postorder());
console.log("In order > ", treeTest.inorder());

treeTest.prettyPrint();
