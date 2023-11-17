export const renderList = (componentName, propName, container) => {
  return (data) => {
    const componentList = document.querySelector(container);
    componentList.innerHTML = '';
    data.forEach((element) => {
      const component = document.createElement(componentName);
      componentList.appendChild(component);
      component[propName] = element;
    });
  };
};
