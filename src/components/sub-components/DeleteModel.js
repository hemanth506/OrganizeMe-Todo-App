import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;

export const DeleteModel = (title, content = "" , deleteFunction) => {
  const tempContent = content !== "" ? content : "";
  confirm({
    title: title,
    icon: <ExclamationCircleFilled />,
    content: tempContent,
    onOk() {
      console.log('OK');
      deleteFunction();
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};