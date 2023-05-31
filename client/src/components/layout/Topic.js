import React from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Topic = () => {
  return (
    <List animated selection>
      <List.Item as={Link} to={'/'}>
        共享文件
      </List.Item>
      <List.Item as={Link} to={'/department'}>
        部門文件
      </List.Item>
      <List.Item as={Link} to={'/user'}>
        使用者文件
      </List.Item>
    </List>
  );
};

export default Topic;
