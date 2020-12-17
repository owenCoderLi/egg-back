function buildMenuTree(trees) { // 生成菜单树(管理中心)
  const TOP_NODE_ID = 0; // 最顶层树节点id
  if(trees == null) {
    return null;
  }
  let topTrees = [];
  trees.forEach(children => {
    const pid = children.parent_id;
    if(pid == null || TOP_NODE_ID == pid) {
      topTrees.push(children);
      return
    }
    for(let parent of trees) {
      const id = parent.id;
      if(id != null && id == pid) {
        parent.children.push(children)
        children.hasParent = true;
        parent.hasChild = true;
        return;
      }
    }
  });
  return topTrees;
};

function buildRouteMenuTree(trees) {
  const TOP_NODE_ID = 0; // 最顶层树节点id
  if(trees == null) {
    return null;
  }
  let topTrees = [];
  trees.forEach(children => {
    const pid = children.parent_id;
    if(pid == null || TOP_NODE_ID == pid) {
      topTrees.push(children);
      return
    }
    for(let parent of trees) {
      const id = parent.id;
      if(id != null && id == pid) {
        parent.routes.push(children)
        return;
      }
    }
  });
  return topTrees; 
}

module.exports = {
  convertTree(nodes, type) {
    let treesArr = [];
    nodes.forEach(node => {
      let treeObj = {};
      treeObj.id = node[`${type}_id`]; // 可优化掉
      treeObj.value = node[`${type}_id`]; // 可优化掉
      treeObj.parent_id = node.parent_id;
      treeObj.title = node[`${type}_name`];
      treeObj.data = node
      treeObj.children = []
      treesArr.push(treeObj)
    });
    const treeResult = buildMenuTree(treesArr)
    return treeResult;
  },

  convertRoute(nodes, type) {
    let treesArr = [];
    nodes.forEach(node => {
      let treeObj = {};
      treeObj.id = node[`${type}_id`]; // 可优化掉
      treeObj.parent_id = node.parent_id;
      treeObj.path = node.path;
      treeObj.icon = node.icon;
      treeObj.name = node.menu_name;
      treeObj.component = node.component;
      treeObj.routes = [];
      treesArr.push(treeObj)
    });
    const treeResult = buildRouteMenuTree(treesArr)
    return treeResult;
  }
}