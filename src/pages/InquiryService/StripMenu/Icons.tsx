import { Tools20, Document20 } from "@carbon/icons-react";

interface Icon {
  [key: string]: JSX.Element;
}

const Icons: Icon = {
  repair: <Tools20 />,
  document: <Document20 />,
};

export default Icons;
