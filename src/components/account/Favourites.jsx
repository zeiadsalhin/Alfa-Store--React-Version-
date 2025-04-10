// components/account/Favourites.jsx
import { List, Typography } from 'antd';

const { Text } = Typography;

const Favourites = () => {
  const favourites = []; // Replace with state or context logic

  return favourites.length === 0 ? (
    <Text type="secondary">You haven’t added any favourites.</Text>
  ) : (
    <List
      dataSource={favourites}
      renderItem={(item) => (
        <List.Item>
          <Text>{item.title}</Text>
        </List.Item>
      )}
    />
  );
};

export default Favourites;
