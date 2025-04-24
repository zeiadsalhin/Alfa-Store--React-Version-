import { notification } from 'antd';

const useNotify = () => {
    const [api, contextHolder] = notification.useNotification();  // Get notification API and contextHolder

    // Function to show notification with customizable duration
    const notify = (type, message, description, duration = 2.5) => {
        api[type]({
            message,
            description,
            duration, // Control the duration of the notification
        });
    };

    return { notify, contextHolder };
};

export default useNotify;
