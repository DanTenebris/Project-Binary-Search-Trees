const treeFactory = (arr = []) => {
  let root = null;

  const _array = arr;

  const _nodeFactory = (data = null, left = null, right = null) => ({
    data,
    left,
    right,
  });

  const _removeDuplicates = (arrVal) => {
    const newArr = [];
    for (let i = 0; i < arrVal.length; i++) {
      if (arrVal[i] !== arrVal[i + 1]) {
        newArr.push(arrVal[i]);
      }
    }
    return newArr;
  };

  const _sortedArrayToBTS = (arrVal, start, end) => {
    if (start > end) return null;

    const mid = Math.round((start + end) / 2);
    const node = _nodeFactory(arrVal[mid]);
    node.left = _sortedArrayToBTS(arrVal, start, mid - 1);
    node.right = _sortedArrayToBTS(arrVal, mid + 1, end);

    return node;
  };

  const buildTree = (arrVal = _array) => {
    arrVal.sort((a, b) => a - b);
    arrVal = _removeDuplicates(arrVal);
    const sortedArrLength = arrVal.length;

    root = _sortedArrayToBTS(arrVal, 0, sortedArrLength - 1);
  };

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const find = (val, node = root) => {
    if (node !== null) {
      if (node.data === val) return node;
      if (node.data > val) return find(val, node.left);
      if (node.data < val) return find(val, node.right);
    }
    return null;
  };

  const _findLeafIfNotFound = (val, node = root) => {
    if (node.data === val) return [node, true];
    if (node.data > val && node.left !== null)
      return _findLeafIfNotFound(val, node.left);
    if (node.data < val && node.right !== null)
      return _findLeafIfNotFound(val, node.right);
    return [node, false];
  };

  const insert = (val) => {
    const [node, flag] = _findLeafIfNotFound(val);
    if (!flag) {
      if (node.data > val) node.left = _nodeFactory(val);
      if (node.data < val) node.right = _nodeFactory(val);
    }
  };

  const _minValue = (node) => {
    let minv = node.val;
    while (node.left !== null) {
      minv = node.left.data;
      node = node.left;
    }
    return minv;
  };

  const deleteVal = (val, node = root) => {
    if (node === null) return node;
    if (val < node.data) node.left = deleteVal(val, node.left);
    else if (val > node.data) node.right = deleteVal(val, node.right);
    else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      node.data = _minValue(node.right);
      node.right = deleteVal(node.data, node.right);
    }
    return node;
  };

  const levelOrder = (cb = false) => {
    const nodeArr = [];
    nodeArr.push(root);
    if (cb) {
      const dataArr = [];
      dataArr.push(cb(nodeArr[0]));
      let i = 0;
      while (nodeArr.length > i) {
        if (nodeArr[i].left !== null) {
          nodeArr.push(nodeArr[i].left);
          dataArr.push(cb(nodeArr[i].left));
        }
        if (nodeArr[i].right !== null) {
          nodeArr.push(nodeArr[i].right);
          dataArr.push(cb(nodeArr[i].right));
        }
        i++;
      }
      return dataArr;
    }

    let i = 0;
    while (nodeArr.length > i) {
      if (nodeArr[i].left !== null) nodeArr.push(nodeArr[i].left);
      if (nodeArr[i].right !== null) nodeArr.push(nodeArr[i].right);
      i++;
    }
    for (let j = 0; j < nodeArr.length; j++) {
      nodeArr[j] = nodeArr[j].data;
    }

    return nodeArr;
  };

  const inorder = (node = root, cb = false) => {
    const dataArr = [];
    let leftArr = [];
    let rightArr = [];
    if (cb) {
      if (node !== null) dataArr.push(cb(node));
      if (node.left !== null) leftArr = inorder(node.left, cb);
      if (node.right !== null) rightArr = inorder(node.right, cb);
    } else {
      if (node !== null) dataArr.push(node.data);
      if (node.left !== null) leftArr = inorder(node.left);
      if (node.right !== null) rightArr = inorder(node.right);
    }

    return leftArr.concat(dataArr, rightArr);
  };

  const preorder = (node = root, cb = false) => {
    const dataArr = [];
    let leftArr = [];
    let rightArr = [];
    if (cb) {
      if (node !== null) dataArr.push(cb(node));
      if (node.left !== null) leftArr = preorder(node.left, cb);
      if (node.right !== null) rightArr = preorder(node.right, cb);
    } else {
      if (node !== null) dataArr.push(node.data);
      if (node.left !== null) leftArr = preorder(node.left);
      if (node.right !== null) rightArr = preorder(node.right);
    }

    return dataArr.concat(leftArr, rightArr);
  };

  const postorder = (node = root, cb = false) => {
    const dataArr = [];
    let leftArr = [];
    let rightArr = [];
    if (cb) {
      if (node !== null) dataArr.push(cb(node));
      if (node.left !== null) leftArr = postorder(node.left, cb);
      if (node.right !== null) rightArr = postorder(node.right, cb);
    } else {
      if (node !== null) dataArr.push(node.data);
      if (node.left !== null) leftArr = postorder(node.left);
      if (node.right !== null) rightArr = postorder(node.right);
    }

    return leftArr.concat(rightArr, dataArr);
  };

  const height = (node = root) => {
    let leftCount = 0;
    let rightCount = 0;
    if (node.left !== null) {
      leftCount++;
      leftCount += height(node.left);
    }
    if (node.right !== null) {
      rightCount++;
      rightCount += height(node.right);
    }

    if (leftCount > rightCount) return leftCount;
    return rightCount;
  };

  const depth = (nodeVal = root, node = root) => {
    if (node !== null) {
      if (node.data === nodeVal.data) return 0;
      if (node.data > nodeVal.data) {
        let result = depth(nodeVal, node.left);
        if (result !== null) result++;
        return result;
      }
      if (node.data < nodeVal.data) {
        let result = depth(nodeVal, node.right);
        if (result !== null) result++;
        return result;
      }
    }
    return null;
  };

  const _checkIfBalanced = (node) => {
    let leftCount = 0;
    let rightCount = 0;
    if (node.left !== null) {
      leftCount = _checkIfBalanced(node.left);
      leftCount++;
    }
    if (node.right !== null) {
      rightCount = _checkIfBalanced(node.right);
      rightCount++;
    }

    if (Math.abs(leftCount - rightCount) > 0) {
      if (rightCount > leftCount) return rightCount;
      return leftCount;
    }

    return 0;
  };

  const isBalanced = (node = root) => {
    const result = _checkIfBalanced(node);
    return !result;
  };

  const rebalance = () => {
    buildTree(inorder());
  };

  return {
    root,
    buildTree,
    prettyPrint,
    insert,
    deleteVal,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};
module.exports = treeFactory;
