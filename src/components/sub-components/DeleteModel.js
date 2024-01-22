import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;

export const DeleteModel = (title, content = "", customFunction) => {
  const tempContent = content !== "" ? content : "";
  confirm({
    title: title,
    icon: <ExclamationCircleFilled />,
    content: tempContent,
    onOk() {
      console.log('OK');
      customFunction();
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};