import React, { createContext } from 'react';

import { type IModalContext } from './types';

const initialModalContext: IModalContext = {
  data: '',
  detailEmployee: '',
  handleSetEmployeeDetail: (data: any) => {},
  detailContract: '',
  handleSetContractDetail: (data: any) => {},
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalContext = createContext(initialModalContext);

interface IModalProviderProps {
  children: React.ReactNode;
}
interface IStateModalContext {
  data: any;
}
const initialStateModalContext: IStateModalContext = {
  data: '',
};
function ModalProvider(props: IModalProviderProps) {
  const [state, setState] = React.useState<IStateModalContext>(initialStateModalContext);
  const [detailEmployee, setDetailEmployee] = React.useState<any>('');

  const handleSetEmployeeDetail = (employeeDetail: any) => {
    // eslint-disable-next-line no-debugger
    setDetailEmployee(employeeDetail);
  };

  const [detailContract, setDetailContract] = React.useState<any>('');

  const handleSetContractDetail = (contractDetail: any) => {
    // eslint-disable-next-line no-debugger
    setDetailContract(contractDetail);
  };

  const value: IModalContext = React.useMemo(
    () => ({
      data: state.data,
      detailEmployee,
      handleSetEmployeeDetail,
      detailContract,
      handleSetContractDetail,
    }),
    [state, detailEmployee, detailContract],
  );
  return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
}

export default ModalProvider;
