import React, { useEffect } from "react";

const withLogger = (WrappedComponent) => {
  const WithLogger = (props) => {
    useEffect(() => {
      console.log(`компонент  ${WrappedComponent.name} смонтирован`);
      return () => {
        console.log(`компонент  ${WrappedComponent.name} размонтирован`);
      };
    }, []);

    useEffect(() => {
      console.log(`копонент  ${WrappedComponent.name} обновлен`);
    });

    const logAction = (action, task) => {
      console.log(`действия в  ${WrappedComponent.name}: ${action}`);
      if (task) {
        console.log(`задача: ${task.text} с ключом: ${task.id}`);
      }
    };

    return <WrappedComponent logAction={logAction} {...props} />;
  };

  return WithLogger;
};

export default withLogger;
