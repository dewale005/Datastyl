import React from "react";
import { IFormType, IProfile } from "../../api/interface";

export type IForm = React.FC<{
  handleSubmitData: (value: IProfile, next: any) => Promise<void>;
  handleDrawer?: () => void,
  type?: IFormType,
  initialValue?: any,
}>;
